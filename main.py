from fastapi import FastAPI, HTTPException, Form, File, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import os
import subprocess
import uuid
import math
import trimesh
import json
from email_template import render_contact_email, render_auto_reply_email

app = FastAPI(title="Llaveros 3D Preview API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PreviewRequest(BaseModel):
    type: str
    name1: str = ""
    name2: str = ""
    fecha: str = ""
    cruz: bool = False
    relieve: bool = True
    tarjeta: bool = False
    tarjeta_titulo: str = ""
    tarjeta_mensaje: str = ""

def get_openscad_path():
    paths = [
        r"C:\Program Files\OpenSCAD (Nightly)\openscad.exe",
        r"C:\Program Files\OpenSCAD\openscad.exe",
        "openscad" # Linux / HuggingFace Spaces
    ]
    for p in paths:
        if os.path.exists(p) or p == "openscad":
            if p == "openscad":
                import shutil
                if shutil.which("openscad"): 
                    # En Render (Linux) envolvemos SOLO a OpenSCAD con el emulador gráfico
                    if shutil.which("xvfb-run"):
                        return "xvfb-run -a openscad"
                    return "openscad"
            else:
                return f'"{p}"'
    return "openscad"

OPENSCAD_CMD = get_openscad_path()

def render_mesh_set(session_id, prefix, base_m, corazon_m, texto_m, fecha_meshes=None):
    scad_content = ""
    
    if base_m is not None:
        base_path = f"{session_id}/{prefix}_base.stl"
        base_m.export(base_path)
        scad_content += f'color("#1E1E1E") import("{prefix}_base.stl");\n'

    if corazon_m is not None:
        corazon_path = f"{session_id}/{prefix}_corazon.stl"
        corazon_m.export(corazon_path)
        scad_content += f'color("#E11D48") import("{prefix}_corazon.stl");\n'

    if texto_m is not None:
        texto_path = f"{session_id}/{prefix}_texto.stl"
        texto_m.export(texto_path)
        scad_content += f'color("#FFFFFF") import("{prefix}_texto.stl");\n'

    # Exportar y añadir meshes de fecha si existen
    if fecha_meshes:
        for fi, fm in enumerate(fecha_meshes):
            fecha_stl = f"{session_id}/{prefix}_fecha_{fi}.stl"
            fm.export(fecha_stl)
            scad_content += f'color("#FFFFFF") import("{prefix}_fecha_{fi}.stl");\n'

    scad_path = f"{session_id}/{prefix}_render.scad"
    with open(scad_path, "w") as f:
        f.write(scad_content)

    bounds = base_m.bounds
    if bounds is not None and len(bounds) == 2:
        b_min, b_max = bounds
    else:
        b_min, b_max = [-50.0, -20.0, 0.0], [50.0, 20.0, 5.0]

    cx = (b_min[0] + b_max[0]) / 2.0
    cy = (b_min[1] + b_max[1]) / 2.0
    cz = (b_min[2] + b_max[2]) / 2.0

    dx = b_max[0] - b_min[0]
    dy = b_max[1] - b_min[1]
    dz = b_max[2] - b_min[2]
    diag = math.sqrt(dx*dx + dy*dy + dz*dz)

    distance = max(180.0, diag * 1.8)

    cameras = [
        f"{cx:.1f},{cy:.1f},{cz:.1f},0,0,0,{distance:.1f}",         # Frontal HD
        f"{cx:.1f},{cy:.1f},{cz:.1f},0,180,0,{distance:.1f}",       # Trasera HD (Enseña el llavero por detrás)
        f"{cx:.1f},{cy:.1f},{cz:.1f},35,0,30,{distance:.1f}",       # Izquierda 3D HD
        f"{cx:.1f},{cy:.1f},{cz:.1f},35,0,-30,{distance:.1f}",      # Derecha 3D HD
        f"{cx:.1f},{cy:.1f},{cz:.1f},55,0,25,{distance:.1f}",       # Isométrica Relieve HD
    ]

    images = []
    for i, cam in enumerate(cameras):
        yield {"type": "progress", "message": f"Renderizando vista {i+1}/{len(cameras)} ({prefix.title()})..."}
        img_path = f"{session_id}/{prefix}_img_{i}.png"
        cmd = f'{OPENSCAD_CMD} -o "{img_path}" --camera={cam} --imgsize=1920,1080 --colorscheme=Tomorrow "{scad_path}"'
        subprocess.run(cmd, shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)

        with open(img_path, "rb") as img_f:
            b64 = base64.b64encode(img_f.read()).decode("utf-8")
            images.append(b64)

    yield {"type": "result", "images": images}

def render_tarjeta(session_id, prefix, scene):
    blancas = []
    negras = []
    rojas = []
    for k, v in scene.geometry.items():
        if 'Blanca' in k: blancas.append(v)
        elif 'Negro' in k: negras.append(v)
        elif 'Rojo' in k: rojas.append(v)
        
    m_blanca = trimesh.util.concatenate(blancas) if blancas else None
    m_negra = trimesh.util.concatenate(negras) if negras else None
    m_roja = trimesh.util.concatenate(rojas) if rojas else None

    scad_path = f"{session_id}/{prefix}_render.scad"
    scad_content = ""
    
    if m_blanca:
        p = f"{session_id}/{prefix}_blanca.stl"
        m_blanca.export(p)
        scad_content += f'color("#FFFFFF") import("{prefix}_blanca.stl");\n'
    if m_negra:
        p = f"{session_id}/{prefix}_negra.stl"
        m_negra.export(p)
        scad_content += f'color("#1E1E1E") import("{prefix}_negra.stl");\n'
    if m_roja:
        p = f"{session_id}/{prefix}_roja.stl"
        m_roja.export(p)
        scad_content += f'color("#E11D48") import("{prefix}_roja.stl");\n'
        
    with open(scad_path, "w") as f:
        f.write(scad_content)
        
    # Calculamos centro desde la malla blanca principal (o negra si no hay blanca)
    m_base = m_blanca if m_blanca else m_negra
    b_min, b_max = m_base.bounds
    cx = (b_min[0] + b_max[0]) / 2.0
    cy = (b_min[1] + b_max[1]) / 2.0
    cz = (b_min[2] + b_max[2]) / 2.0

    dx = b_max[0] - b_min[0]
    dy = b_max[1] - b_min[1]
    dz = b_max[2] - b_min[2]
    diag = math.sqrt(dx*dx + dy*dy + dz*dz)
    distance = max(220.0, diag * 2.4)

    cameras = [
        f"{cx:.1f},{cy:.1f},{cz:.1f},0,180,0,{distance:.1f}",       # Frontal HD (girada 180 para impresión)
        f"{cx:.1f},{cy:.1f},{cz:.1f},85,0,0,{distance*0.75:.1f}",   # Lateral (Borde) HD
        f"{cx:.1f},{cy:.1f},{cz:.1f},0,0,0,{distance:.1f}",         # Trasera HD
    ]

    images = []
    for i, cam in enumerate(cameras):
        yield {"type": "progress", "message": f"Renderizando vista {i+1}/{len(cameras)} (Tarjeta)..."}
        img_path = f"{session_id}/{prefix}_img_{i}.png"
        cmd = f'{OPENSCAD_CMD} -o "{img_path}" --camera={cam} --imgsize=1920,1080 --colorscheme=Tomorrow "{scad_path}"'
        subprocess.run(cmd, shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=120)

        with open(img_path, "rb") as img_f:
            b64 = base64.b64encode(img_f.read()).decode("utf-8")
            images.append(b64)

    yield {"type": "result", "images": images}

@app.post("/api/preview")
def generate_preview(req: PreviewRequest):
    if req.type not in ["corazon", "iniciales", "individual"]:
        raise HTTPException(status_code=400, detail="Tipo no soportado")

    if req.type in ["corazon", "iniciales"] and (not req.name1 or not req.name2):
        raise HTTPException(status_code=400, detail="Faltan los nombres/iniciales")

    if req.type == "individual" and not req.name1:
        raise HTTPException(status_code=400, detail="Falta el nombre para el llavero")

    def generate():
        session_id = str(uuid.uuid4())
        os.makedirs(session_id, exist_ok=True)
        
        total_steps = 10 if req.type != "individual" else 5
        if req.tarjeta:
            total_steps += 3
        current_step = 0
        
        # Nombres de producto (deben coincidir con PRODUCT_CATALOG del frontend)
        PRODUCT_NAMES = {
            "corazon": "Llavero Corazón Conectado",
            "iniciales": "Llavero Iniciales con Corazón",
            "individual": "Llavero Individual con Nombre"
        }
        model_name = PRODUCT_NAMES.get(req.type, "Llavero")
        
        def emit_progress(msg):
            nonlocal current_step
            current_step += 1
            msg["progress"] = int(10 + (current_step / total_steps) * 85)
            msg["message"] = msg["message"].replace("(Juntos)", f"({model_name})")
            msg["message"] = msg["message"].replace("(Separados)", f"({model_name} Separados)")
            msg["message"] = msg["message"].replace("(Individual)", f"({model_name})")
            msg["message"] = msg["message"].replace("(Tarjeta)", "(Tarjeta 3D)")
            return f"data: {json.dumps(msg)}\n\n"

        try:
            from engine_api import generar_llavero_inicial, generar_llavero, generar_llavero_individual, FUENTE_PATH, TAMANO_LETRA, ENGROSE_TEXTO, obtener_poligonos_texto

            fecha = req.fecha if req.fecha else None

            yield f"data: {json.dumps({'type': 'progress', 'progress': 5, 'message': 'Iniciando generación de mallas...'})}\n\n"

            # ---------------- CASO LLAVERO INDIVIDUAL ----------------
            if req.type == "individual":
                def calcular_ancho(nombre, fuente_p):
                    nom = nombre.title()
                    tam = TAMANO_LETRA
                    eng = ENGROSE_TEXTO
                    if "ArchivoBlack" in fuente_p:
                        tam = int(TAMANO_LETRA * 0.7)
                        eng = 0.0
                    txt = obtener_poligonos_texto(nom, fuente_p, tam).buffer(eng, join_style=1)
                    if txt.is_empty: return 0.0
                    return txt.bounds[2] - txt.bounds[0]

                ancho = calcular_ancho(req.name1, FUENTE_PATH)
                LIMITE_ANCHO_TEXTO = 50.0  
                factor_comp = 1.0
                if ancho > LIMITE_ANCHO_TEXTO:
                    factor_comp = LIMITE_ANCHO_TEXTO / ancho

                res_ind = generar_llavero_individual(req.name1, fuente_path=FUENTE_PATH, factor_compresion_x=factor_comp)
                base_ind, texto_ind = res_ind[0], res_ind[1]

                images_ind = []
                for msg in render_mesh_set(session_id, "individual", base_ind, None, texto_ind):
                    if msg["type"] == "progress":
                        yield emit_progress(msg)
                    elif msg["type"] == "result":
                        images_ind = msg["images"]

                # Tarjeta 3D
                images_tarjeta = []
                if req.tarjeta:
                    try:
                        from tarjeta_3d import generar_tarjeta_3d
                        scene_tarjeta = generar_tarjeta_3d(req.tarjeta_titulo, req.tarjeta_mensaje, FUENTE_PATH)
                        for msg in render_tarjeta(session_id, "tarjeta", scene_tarjeta):
                            if msg["type"] == "progress":
                                yield emit_progress(msg)
                            elif msg["type"] == "result":
                                images_tarjeta = msg["images"]
                    except Exception as e:
                        print(f"Error generando tarjeta: {e}")

                if base_ind.bounds is not None:
                    b_min, b_max = base_ind.bounds
                    w = b_max[0] - b_min[0]
                    d = b_max[1] - b_min[1]
                    h = b_max[2] - b_min[2]
                else:
                    w, d, h = 50.0, 20.0, 4.0

                dims = [{"label": f"Llavero: {req.name1.title()}", "w": float(w), "d": float(d), "h": float(h + 0.8)}]

                final_res = {
                    "images_juntos": images_ind,
                    "images_separados": images_ind,
                    "images_tarjeta": images_tarjeta,
                    "images": images_ind,
                    "dimensions": dims
                }
                yield f"data: {json.dumps({'type': 'done', 'result': final_res})}\n\n"
                return

            # ---------------- CASO CORAZÓN O INICIALES ----------------
            # 1. Generar Llaveros JUNTOS (offset_y = 0)
            if req.type == "iniciales":
                res1_j = generar_llavero_inicial(req.name1, "izquierdo", req.cruz, req.relieve, 0, fecha=fecha)
                res2_j = generar_llavero_inicial(req.name2, "derecho", req.cruz, req.relieve, 0, fecha=fecha)
            else:
                res1_j = generar_llavero(req.name1, "izquierdo", 0, fecha=fecha)
                res2_j = generar_llavero(req.name2, "derecho", 0, fecha=fecha)

            base1_j, corazon1_j, texto1_j = res1_j[0], res1_j[1], res1_j[2]
            base2_j, corazon2_j, texto2_j = res2_j[0], res2_j[1], res2_j[2]
            # Recoger meshes extra de fecha (posición 3+)
            fecha_meshes_1j = res1_j[3:]
            fecha_meshes_2j = res2_j[3:]
            fecha_meshes_j = fecha_meshes_1j + fecha_meshes_2j

            base_j = trimesh.util.concatenate([base1_j, base2_j])
            corazon_j = trimesh.util.concatenate([corazon1_j, corazon2_j])
            texto_j = trimesh.util.concatenate([texto1_j, texto2_j])

            images_juntos = []
            for msg in render_mesh_set(session_id, "juntos", base_j, corazon_j, texto_j, fecha_meshes_j if fecha_meshes_j else None):
                if msg["type"] == "progress":
                    yield emit_progress(msg)
                elif msg["type"] == "result":
                    images_juntos = msg["images"]

            # 2. Generar Llaveros SEPARADOS
            if req.type == "iniciales":
                res1_s = generar_llavero_inicial(req.name1, "izquierdo", req.cruz, req.relieve, 16, fecha=fecha)
                res2_s = generar_llavero_inicial(req.name2, "derecho", req.cruz, req.relieve, -16, fecha=fecha)
            else:
                res1_s = generar_llavero(req.name1, "izquierdo", 16, fecha=fecha)
                res2_s = generar_llavero(req.name2, "derecho", -16, fecha=fecha)

            base1_s, corazon1_s, texto1_s = res1_s[0], res1_s[1], res1_s[2]
            base2_s, corazon2_s, texto2_s = res2_s[0], res2_s[1], res2_s[2]
            fecha_meshes_1s = res1_s[3:]
            fecha_meshes_2s = res2_s[3:]

            cx1 = ((base1_s.bounds[0][0] + base1_s.bounds[1][0]) / 2.0) if base1_s.bounds is not None else 0
            base1_s.apply_translation([-cx1, 0, 0])
            corazon1_s.apply_translation([-cx1, 0, 0])
            texto1_s.apply_translation([-cx1, 0, 0])
            for fm in fecha_meshes_1s:
                fm.apply_translation([-cx1, 0, 0])

            cx2 = ((base2_s.bounds[0][0] + base2_s.bounds[1][0]) / 2.0) if base2_s.bounds is not None else 0
            base2_s.apply_translation([-cx2, 0, 0])
            corazon2_s.apply_translation([-cx2, 0, 0])
            texto2_s.apply_translation([-cx2, 0, 0])
            for fm in fecha_meshes_2s:
                fm.apply_translation([-cx2, 0, 0])

            base_s = trimesh.util.concatenate([base1_s, base2_s])
            corazon_s = trimesh.util.concatenate([corazon1_s, corazon2_s])
            texto_s = trimesh.util.concatenate([texto1_s, texto2_s])
            fecha_meshes_s = fecha_meshes_1s + fecha_meshes_2s

            images_separados = []
            for msg in render_mesh_set(session_id, "separados", base_s, corazon_s, texto_s, fecha_meshes_s if fecha_meshes_s else None):
                if msg["type"] == "progress":
                    yield emit_progress(msg)
                elif msg["type"] == "result":
                    images_separados = msg["images"]

            # 3. Generar Tarjeta 3D
            images_tarjeta = []
            if req.tarjeta:
                try:
                    from tarjeta_3d import generar_tarjeta_3d
                    scene_tarjeta = generar_tarjeta_3d(req.tarjeta_titulo, req.tarjeta_mensaje, FUENTE_PATH)
                    for msg in render_tarjeta(session_id, "tarjeta", scene_tarjeta):
                        if msg["type"] == "progress":
                            yield emit_progress(msg)
                        elif msg["type"] == "result":
                            images_tarjeta = msg["images"]
                except Exception as e:
                    print(f"Error generando tarjeta: {e}")
                    import traceback
                    traceback.print_exc()

            # Dimensiones estimadas
            dims = []
            for name, base_mesh in [("Izquierdo", base1_j), ("Derecho", base2_j)]:
                if base_mesh.bounds is not None:
                    b_min, b_max = base_mesh.bounds
                    w = b_max[0] - b_min[0]
                    d = b_max[1] - b_min[1]
                    h = b_max[2] - b_min[2]
                else:
                    w, d, h = 50.0, 20.0, 4.0
                dims.append({"label": name, "w": float(w), "d": float(d), "h": float(h + 0.8)})

            final_res = {
                "images_juntos": images_juntos,
                "images_separados": images_separados,
                "images_tarjeta": images_tarjeta,
                "images": images_juntos,
                "dimensions": dims
            }
            yield f"data: {json.dumps({'type': 'done', 'result': final_res})}\n\n"

        except Exception as e:
            import traceback
            print(f"Error generando 3D:")
            traceback.print_exc()
            yield f"data: {json.dumps({'type': 'error', 'detail': str(e)})}\n\n"
        finally:
            if os.path.exists(session_id):
                for f in os.listdir(session_id):
                    os.remove(os.path.join(session_id, f))
                os.rmdir(session_id)

    return StreamingResponse(generate(), media_type="text/event-stream")


@app.get("/")
def root():
    return {"status": "ok", "service": "Latens Studio Backend API"}

def validar_correo_veridico(email: str) -> tuple:
    email = email.strip().lower()
    if not email or "@" not in email:
        return False, "Por favor, introduce un correo electrónico válido."
    
    parts = email.split("@")
    if len(parts) != 2:
        return False, "Por favor, introduce un correo electrónico válido."
    
    user, domain = parts
    if len(user) < 1 or len(domain) < 3 or "." not in domain:
        return False, "El dominio del correo debe incluir una extensión válida (ej: .com, .es)."
    
    tld = domain.split(".")[-1]
    if len(tld) < 2 or not tld.isalpha():
        return False, "La extensión del correo (.com, .es, etc.) no es válida."

    # Bloqueo de servicios conocidos de correo basura desechable (10 minute mail)
    dominios_desechables = {
        "tempmail.com", "10minutemail.com", "guerrillamail.com", "trashmail.com",
        "yopmail.com", "mailinator.com", "dispostable.com", "sharklasers.com",
        "fakeinbox.com", "getairmail.com", "throwawaymail.com"
    }
    if domain in dominios_desechables:
        return False, "Por favor, utiliza una dirección de correo real (Gmail, Hotmail, Outlook, etc.) para poder responderte."

    # Comprobación estricta de Servidor de Correo Activo (Registros MX) vía DNS de Google
    try:
        import urllib.request
        import json
        url = f"https://dns.google/resolve?name={domain}&type=MX"
        req = urllib.request.Request(url, headers={"Accept": "application/dns-json", "User-Agent": "LatensStudio/1.0"})
        with urllib.request.urlopen(req, timeout=3.5) as res:
            dns_data = json.loads(res.read().decode("utf-8"))
            answers = dns_data.get("Answer", [])
            if not answers or len(answers) == 0:
                return False, f"El dominio '@{domain}' no tiene ningún servidor de correo activo para recibir mensajes. Revisa si está bien escrito."
    except Exception:
        # Fallback de respaldo en caso de micro-corte de DNS
        try:
            import socket
            socket.getaddrinfo(domain, None)
        except Exception:
            return False, f"El dominio '@{domain}' no existe en Internet. Por favor, revisa que esté bien escrito."

    return True, ""

@app.post("/api/contact")
def contact_form(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...),
    asunto: str = Form("idea"),
    attachment: UploadFile = File(None),
    website_hp: str = Form(None)
):
    # Detección de bots por campo trampa (Honeypot)
    if website_hp:
        return {"status": "success", "message": "¡Mensaje enviado con éxito!"}

    name = name.strip()
    email = email.strip()
    message = message.strip()

    if len(name) < 2:
        raise HTTPException(status_code=400, detail="Por favor, introduce un nombre válido.")
    
    if len(message) < 5:
        raise HTTPException(status_code=400, detail="El mensaje es demasiado corto. Cuéntame tu idea en unas pocas palabras.")

    es_valido, error_msg = validar_correo_veridico(email)
    if not es_valido:
        raise HTTPException(status_code=400, detail=error_msg)

    resend_api_key = os.getenv("RESEND_API_KEY")
    if not resend_api_key:
        raise HTTPException(status_code=500, detail="Servicio de correo no configurado (falta RESEND_API_KEY).")
    to_email = os.getenv("CONTACT_DESTINATION_EMAIL", "latens.studio@gmail.com")

    # Adaptar el título del correo según la opción elegida
    tipo_asunto = "Feedback/Queja" if asunto == "feedback" else "Idea Única"
    subject = f"{tipo_asunto} de {name} - Latens Studio"
    
    html_body, text_body = render_contact_email(
        name=name,
        email=email,
        asunto=asunto,
        message=message,
        attachment_filename=attachment.filename if (attachment and attachment.filename) else None
    )

    payload = {
        "from": "Latens Studio <onboarding@resend.dev>",
        "to": [to_email],
        "subject": subject,
        "text": text_body,
        "html": html_body,
        "reply_to": email
    }

    if attachment and attachment.filename:
        file_bytes = attachment.file.read()
        b64_content = base64.b64encode(file_bytes).decode("utf-8")
        payload["attachments"] = [
            {
                "filename": attachment.filename,
                "content": b64_content
            }
        ]

    try:
        import json
        import urllib.request
        import urllib.error

        req = urllib.request.Request(
            "https://api.resend.com/emails",
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {resend_api_key.strip()}",
                "Content-Type": "application/json",
                "User-Agent": "LatensStudio/1.0"
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=15) as response:
            pass

        return {"status": "success", "message": "¡Mensaje enviado con éxito!"}
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="ignore")
        print(f"Error Resend API ({e.code}): {error_body}")
        raise HTTPException(status_code=500, detail=f"Error enviando correo: {error_body}")
    except Exception as e:
        print(f"Error enviando correo: {e}")
        raise HTTPException(status_code=500, detail="Error interno al enviar el correo.")

