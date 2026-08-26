// ─── LATENS STUDIO WEB ENGINE (VANILLA ES6) ───

// ─── TOAST NOTIFICATION SYSTEM (SINGLETON) ───
const Toast = {
    container: null,

    init() {
        this.container = document.getElementById('toastContainer');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toastContainer';
            this.container.className = 'toast-container';
            this.container.setAttribute('aria-live', 'polite');
            this.container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(this.container);
        }
    },

    show({ title = '', message = '', type = 'info', duration = 4000 }) {
        if (!this.container) this.init();

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-body">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-msg">${message}</div>
            </div>
            <button class="toast-close" aria-label="Cerrar notificacion">&times;</button>
            <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
        `;

        const closeBtn = toast.querySelector('.toast-close');
        const dismiss = () => {
            toast.classList.remove('show');
            toast.classList.add('hide');
            setTimeout(() => toast.remove(), 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', dismiss);
        this.container.appendChild(toast);

        // Trigger reflow for CSS smooth transition
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        const timer = setTimeout(dismiss, duration);
        toast.addEventListener('mouseenter', () => clearTimeout(timer));
    },

    success(message, title = '¡Éxito!') {
        this.show({ title, message, type: 'success', duration: 4500 });
    },

    error(message, title = 'Atención') {
        this.show({ title, message, type: 'error', duration: 6000 });
    },

    warning(message, title = 'Aviso') {
        this.show({ title, message, type: 'warning', duration: 5000 });
    },

    info(message, title = 'Información') {
        this.show({ title, message, type: 'info', duration: 4000 });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Toast.init();

    // ─── CATÁLOGO DE PRODUCTOS (Fuente única de verdad) ───
    const PRODUCT_CATALOG = {
        corazon: {
            id: 'corazon',
            name: 'Llaveros Magnéticos con Corazón y Nombres',
            shortName: 'Llaveros Magnéticos con Corazón y Nombres',
            badge: 'Más Vendido ⭐',
            price: '15€',
            priceNum: 15,
            priceQualifier: 'Pareja completa (2 llaveros)',
            desc: 'Dos llaveros independientes con nombres totalmente personalizados que encajan magnéticamente de forma perfecta gracias a sus imanes de neodimio integrados. Incluye tarjeta de presentación en caja (con título y dedicatoria personalizables) y soporte expositor.',
            images: [
                'pareja_nombre_portada.webp',
                'pareja_nombre_imanes.webp',
                'pareja_nombre_fecha.webp',
                'pareja_nombre_llaves.webp',
                'tarjeta_3d_comun.webp',
                'pareja_nombre_conjunto.webp'
            ],
            specs: [
                'Imanes de neodimio N52 de máxima atracción perfectamente integrados.',
                'Personalización de 2 nombres en relieve 3D de alta definición.',
                'Incluye tarjeta con título y dedicatoria personalizables + soporte expositor.',
                'Fabricado en PLA+ ecológico de máxima resistencia y ligereza.',
                'Incluye 2 anillas de acero reforzadas + Chapita de regalo gratis.',
                'Entrega en mano en Alicante (Luceros) GRATIS o Envío a domicilio 24/48h (+4,99€).'
            ],
            careNote: 'Evitar exposición solar prolongada o calor intenso (>55°C) para prevenir deformaciones.',
            instagramCta: 'Pídelo ya por MD'
        },
        iniciales: {
            id: 'iniciales',
            name: 'Llaveros Magnéticos con Corazón e Iniciales',
            shortName: 'Llaveros Magnéticos con Corazón e Iniciales',
            badge: 'Personalizable',
            price: '12€',
            priceNum: 12,
            priceQualifier: 'Pareja completa (2 llaveros)',
            desc: 'Dos llaveros magnéticos con la inicial de cada persona sobre un corazón central y cruz opcional. Incluye tarjeta de presentación en caja (con título y dedicatoria personalizables) y soporte expositor.',
            images: [
                'pareja_iniciales_portada.webp',
                'pareja_iniciales_imanes.webp',
                'pareja_iniciales_fecha.webp',
                'pareja_iniciales_cruz.webp',
                'pareja_iniciales_llaves.webp',
                'tarjeta_3d_comun.webp',
                'pareja_iniciales_conjunto.webp'
            ],
            specs: [
                'Imanes de neodimio N52 de máxima atracción perfectamente integrados.',
                '2 Iniciales personalizadas en 3D de alta definición.',
                'Cruz opcional según tu preferencia.',
                'Incluye tarjeta con título y dedicatoria personalizables + soporte expositor.',
                'Fabricado en PLA+ ecológico de máxima resistencia y ligereza.',
                'Incluye 2 anillas de acero reforzadas + Chapita de regalo gratis.',
                'Entrega en mano en Alicante (Luceros) GRATIS o Envío a domicilio 24/48h (+4,99€).'
            ],
            careNote: 'Evitar exposición solar prolongada o calor intenso (>55°C) para prevenir deformaciones.',
            instagramCta: 'Pídelo ya por MD'
        },
        individual: {
            id: 'individual',
            name: 'Llavero con Nombre',
            shortName: 'Llavero con Nombre',
            badge: 'Individual',
            price: '3€',
            priceNum: 3,
            priceQualifier: 'Por unidad (1 llavero)',
            desc: 'Tu nombre personalizado en relieve blanco sobre una base orgánica oscura y resistente. Compacto, duradero e ideal para llaves de coche, mochilas o regalo.',
            images: [
                'individual_portada.webp',
                'individual_llaves_1.webp',
                'individual_llaves_2.webp'
            ],
            specs: [
                '1 Nombre personalizado en relieve 3D de alto contraste.',
                'Tipografía a elección (cualquier fuente libre de derechos/uso comercial).',
                'Colores a elegir: Negro (PLA+), Blanco (PLA+), Rojo (PLA+), Azul, Rosa, Rosa Melocotón, Violeta Interestelar o Verde Primavera.',
                'Fabricado en PLA o PLA+ ecológico de máxima resistencia y ligereza.',
                'Incluye anilla de acero reforzada + Chapita de regalo gratis.',
                'Entrega en mano en Alicante (Luceros) GRATIS o Envío a domicilio 24/48h (+4,99€).'
            ],
            careNote: 'Evitar exposición solar prolongada o calor intenso (>55°C) para prevenir deformaciones.',
            instagramCta: 'Pídelo ya por MD'
        }
    };

    // ─── TABS & DEEP LINKING URL ROUTER (CON WAI-ARIA SYNC) ───
    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    const TAB_ALIASES = {
        'tab-profile': 'tab-profile',
        'perfil': 'tab-profile',
        'sobre-mi': 'tab-profile',
        'contacto': 'tab-profile',
        'redes': 'tab-profile',

        'tab-gallery': 'tab-gallery',
        'catalogo': 'tab-gallery',
        'galeria': 'tab-gallery',
        'modelos': 'tab-gallery',
        'productos': 'tab-gallery',

        'tab-preview': 'tab-preview',
        'personalizador': 'tab-preview',
        'configurador': 'tab-preview',
        'visor': 'tab-preview',
        '3d': 'tab-preview',
        'previsualizador': 'tab-preview',
        'generar': 'tab-preview',

        'tab-faq': 'tab-faq',
        'faq': 'tab-faq',
        'preguntas': 'tab-faq',
        'dudas': 'tab-faq',
        'ayuda': 'tab-faq'
    };

    function resolveTabId(alias) {
        if (!alias) return null;
        const clean = alias.toLowerCase().replace(/^[#?]/, '').trim();
        return TAB_ALIASES[clean] || (document.getElementById(clean) ? clean : null);
    }

    function switchTab(targetId, updateUrl = true) {
        const resolvedId = resolveTabId(targetId) || targetId;
        const activeBtn = document.querySelector(`[data-target="${resolvedId}"]`);
        const activePane = document.getElementById(resolvedId);

        if (!activePane) return;

        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            btn.setAttribute('tabindex', '-1');
        });
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            pane.setAttribute('aria-hidden', 'true');
        });
        
        if (activeBtn) {
            activeBtn.classList.add('active');
            activeBtn.setAttribute('aria-selected', 'true');
            activeBtn.setAttribute('tabindex', '0');
        }
        activePane.classList.add('active');
        activePane.setAttribute('aria-hidden', 'false');

        if (updateUrl && window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '#' + resolvedId);
        }

        // Guardar tab activa en sessionStorage
        try { sessionStorage.setItem('latens_active_tab', resolvedId); } catch(e) {}

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.getAttribute('data-target'));
        });
    });

    const headerContactBtn = document.getElementById('headerContactBtn');
    if (headerContactBtn) {
        headerContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('tab-profile');
            setTimeout(() => {
                const contactSec = document.getElementById('contacto');
                if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
    }

    // ─── GALLERY PREVIEW TRIGGERS ───
    const previewTriggers = document.querySelectorAll('.preview-trigger');
    const productSelect = document.getElementById('productSelect');

    previewTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            if (productSelect) productSelect.value = product;
            renderDynamicInputs();
            switchTab('tab-preview');
            updateOrderSummaryCard();
        });
    });

    // ─── DYNAMIC INPUTS FOR PREVIEWER (CON PRESERVACIÓN DE ESTADO) ───
    const dynamicInputsContainer = document.getElementById('dynamicInputs');
    
    function renderDynamicInputs() {
        if (!productSelect || !dynamicInputsContainer) return;
        const val = productSelect.value;

        // Preservar valores ingresados previamente por el usuario
        const oldName1 = (document.getElementById('name1')?.value || '');
        const oldName2 = (document.getElementById('name2')?.value || '');

        let html = '';

        const opcionesIniciales = document.getElementById('opcionesIniciales');
        if (opcionesIniciales) {
            opcionesIniciales.style.display = (val === 'iniciales') ? 'block' : 'none';
        }

        const fechaGroup = document.getElementById('fechaGroup');
        if (fechaGroup) {
            const productosSoportanFecha = ['corazon', 'iniciales'];
            fechaGroup.style.display = productosSoportanFecha.includes(val) ? 'block' : 'none';
        }

        const addCardCb = document.getElementById('addCard');
        const cardCol = document.querySelector('.config-card-col');
        const cardInputsGroup = document.getElementById('cardInputsGroup');
        const customizationLayout = document.querySelector('.config-customization-layout');
        
        const isPairProduct = (val === 'corazon' || val === 'iniciales');
        
        if (cardCol) {
            cardCol.style.display = isPairProduct ? 'block' : 'none';
        }
        if (customizationLayout && customizationLayout.classList) {
            customizationLayout.classList.toggle('no-card', !isPairProduct);
        }
        if (addCardCb) {
            addCardCb.checked = isPairProduct;
            addCardCb.disabled = true;
        }
        if (cardInputsGroup) {
            cardInputsGroup.style.display = isPairProduct ? 'block' : 'none';
        }

        if (val === 'individual') {
            html = `
                <div class="form-field">
                    <label for="name1">Nombre para el Llavero</label>
                    <input type="text" id="name1" placeholder="Ej: Carlos" maxlength="12" required autocomplete="off">
                </div>
            `;
        } else {
            const labelA = val === 'iniciales' ? 'Inicial Izquierda (A)' : 'Nombre Izquierda (Llavero A)';
            const labelB = val === 'iniciales' ? 'Inicial Derecha (B)' : 'Nombre Derecha (Llavero B)';
            const phA = val === 'iniciales' ? 'Ej: A' : 'Ej: Ana';
            const phB = val === 'iniciales' ? 'Ej: J' : 'Ej: Juan';
            const maxL = val === 'iniciales' ? '1' : '10';

            html = `
                <div class="form-field">
                    <label for="name1">${labelA}</label>
                    <input type="text" id="name1" placeholder="${phA}" maxlength="${maxL}" required autocomplete="off">
                </div>
                <div class="form-field">
                    <label for="name2">${labelB}</label>
                    <input type="text" id="name2" placeholder="${phB}" maxlength="${maxL}" required autocomplete="off">
                </div>
            `;
        }

        dynamicInputsContainer.innerHTML = html;

        // Restaurar valores previos
        const newInp1 = document.getElementById('name1');
        const newInp2 = document.getElementById('name2');
        if (newInp1 && oldName1) {
            newInp1.value = (val === 'iniciales') ? oldName1.charAt(0).toUpperCase() : oldName1;
        }
        if (newInp2 && oldName2) {
            newInp2.value = (val === 'iniciales') ? oldName2.charAt(0).toUpperCase() : oldName2;
        }

        // Listeners de actualización de resumen en vivo
        if (newInp1) newInp1.addEventListener('input', updateOrderSummaryCard);
        if (newInp2) newInp2.addEventListener('input', updateOrderSummaryCard);
    }

    if (productSelect) {
        productSelect.addEventListener('change', () => {
            renderDynamicInputs();
            updateOrderSummaryCard();
        });
        renderDynamicInputs();
    }

    // ─── CONTROLADOR DE FECHA INTERACTIVA RE-DISEÑADA (SIN TECLADO) ───
    const fechaNativeInput = document.getElementById('fechaNative');
    const fechaHiddenInput = document.getElementById('fecha');
    const btnDateClear = document.getElementById('btnDateClear');
    const datePreviewBadge = document.getElementById('datePreviewBadge');
    const datePreviewFormatted = document.getElementById('datePreviewFormatted');
    const datePresetPills = document.querySelectorAll('.date-preset-pill');

    function formatCompactDate(isoDateStr) {
        if (!isoDateStr) return '';
        const parts = isoDateStr.split('-');
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1];
            const day = parts[2];
            const shortYear = year.slice(-2);
            return `${day}.${month}.${shortYear}`;
        }
        return isoDateStr;
    }

    function setDateValue(isoDateStr) {
        if (fechaNativeInput) fechaNativeInput.value = isoDateStr || '';
        const compact = formatCompactDate(isoDateStr);
        if (fechaHiddenInput) {
            fechaHiddenInput.value = compact;
        }

        if (compact) {
            if (datePreviewFormatted) datePreviewFormatted.textContent = compact;
            if (datePreviewBadge) datePreviewBadge.style.display = 'flex';
            if (btnDateClear) btnDateClear.style.display = 'grid';
        } else {
            if (datePreviewBadge) datePreviewBadge.style.display = 'none';
            if (btnDateClear) btnDateClear.style.display = 'none';
        }

        // Marcar pill activo si coincide
        datePresetPills.forEach(pill => {
            const preset = pill.getAttribute('data-preset');
            if (preset === 'today') {
                const now = new Date();
                const year = now.getFullYear();
                const m = String(now.getMonth() + 1).padStart(2, '0');
                const d = String(now.getDate()).padStart(2, '0');
                pill.classList.toggle('active', isoDateStr === `${year}-${m}-${d}`);
            } else if (preset === 'valentine') {
                const currentYear = new Date().getFullYear();
                pill.classList.toggle('active', isoDateStr === `${currentYear}-02-14` || (isoDateStr && isoDateStr.endsWith('-02-14')));
            } else {
                pill.classList.remove('active');
            }
        });

        updateOrderSummaryCard();
    }

    if (fechaNativeInput) {
        // Al hacer clic en cualquier parte del campo, abre inmediatamente el desplegable del calendario
        fechaNativeInput.addEventListener('click', () => {
            try {
                if (typeof fechaNativeInput.showPicker === 'function') {
                    fechaNativeInput.showPicker();
                }
            } catch (err) {}
        });

        fechaNativeInput.addEventListener('change', () => {
            setDateValue(fechaNativeInput.value);
        });
        fechaNativeInput.addEventListener('input', () => {
            setDateValue(fechaNativeInput.value);
        });
    }

    if (btnDateClear) {
        btnDateClear.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDateValue('');
            Toast.info('Fecha en el reverso eliminada.');
        });
    }

    datePresetPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.preventDefault();
            const preset = pill.getAttribute('data-preset');
            const now = new Date();
            const year = now.getFullYear();

            if (preset === 'today') {
                const m = String(now.getMonth() + 1).padStart(2, '0');
                const d = String(now.getDate()).padStart(2, '0');
                setDateValue(`${year}-${m}-${d}`);
                Toast.success(`Fecha establecida: ${d}.${m}.${String(year).slice(-2)}`);
            } else if (preset === 'valentine') {
                setDateValue(`${year}-02-14`);
                Toast.success(`Fecha establecida: 14.02.${String(year).slice(-2)} (San Valentín)`);
            }
        });
    });

    const checkCruz = document.getElementById('checkCruz');
    if (checkCruz) checkCruz.addEventListener('change', updateOrderSummaryCard);

    // Control del Selector de Entrega / Envío y Formulario Desplegable
    const deliverySelectEl = document.getElementById('deliverySelect');
    const shippingFieldsGroup = document.getElementById('shippingFieldsGroup');

    if (deliverySelectEl) {
        deliverySelectEl.addEventListener('change', () => {
            const isEnvio = deliverySelectEl.value === 'envio';
            if (shippingFieldsGroup) {
                shippingFieldsGroup.style.display = isEnvio ? 'block' : 'none';
            }
            updateOrderSummaryCard();
        });
    }

    // ─── POSTAL CODE & PROVINCE DETECTION (GENEI STYLE) ───
    const ES_PROVINCES = {
        '01': { name: 'Álava', region: 'País Vasco' },
        '02': { name: 'Albacete', region: 'Castilla-La Mancha' },
        '03': { name: 'Alicante', region: 'Com. Valenciana' },
        '04': { name: 'Almería', region: 'Andalucía' },
        '05': { name: 'Ávila', region: 'Castilla y León' },
        '06': { name: 'Badajoz', region: 'Extremadura' },
        '07': { name: 'Baleares', region: 'Islas Baleares' },
        '08': { name: 'Barcelona', region: 'Cataluña' },
        '09': { name: 'Burgos', region: 'Castilla y León' },
        '10': { name: 'Cáceres', region: 'Extremadura' },
        '11': { name: 'Cádiz', region: 'Andalucía' },
        '12': { name: 'Castellón', region: 'Com. Valenciana' },
        '13': { name: 'Ciudad Real', region: 'Castilla-La Mancha' },
        '14': { name: 'Córdoba', region: 'Andalucía' },
        '15': { name: 'A Coruña', region: 'Galicia' },
        '16': { name: 'Cuenca', region: 'Castilla-La Mancha' },
        '17': { name: 'Girona', region: 'Cataluña' },
        '18': { name: 'Granada', region: 'Andalucía' },
        '19': { name: 'Guadalajara', region: 'Castilla-La Mancha' },
        '20': { name: 'Guipúzcoa', region: 'País Vasco' },
        '21': { name: 'Huelva', region: 'Andalucía' },
        '22': { name: 'Huesca', region: 'Aragón' },
        '23': { name: 'Jaén', region: 'Andalucía' },
        '24': { name: 'León', region: 'Castilla y León' },
        '25': { name: 'Lleida', region: 'Cataluña' },
        '26': { name: 'La Rioja', region: 'La Rioja' },
        '27': { name: 'Lugo', region: 'Galicia' },
        '28': { name: 'Madrid', region: 'Com. de Madrid' },
        '29': { name: 'Málaga', region: 'Andalucía' },
        '30': { name: 'Murcia', region: 'Región de Murcia' },
        '31': { name: 'Navarra', region: 'Navarra' },
        '32': { name: 'Ourense', region: 'Galicia' },
        '33': { name: 'Asturias', region: 'Asturias' },
        '34': { name: 'Palencia', region: 'Castilla y León' },
        '35': { name: 'Las Palmas', region: 'Canarias' },
        '36': { name: 'Pontevedra', region: 'Galicia' },
        '37': { name: 'Salamanca', region: 'Castilla y León' },
        '38': { name: 'Santa Cruz de Tenerife', region: 'Canarias' },
        '39': { name: 'Cantabria', region: 'Cantabria' },
        '40': { name: 'Segovia', region: 'Castilla y León' },
        '41': { name: 'Sevilla', region: 'Andalucía' },
        '42': { name: 'Soria', region: 'Castilla y León' },
        '43': { name: 'Tarragona', region: 'Cataluña' },
        '44': { name: 'Teruel', region: 'Aragón' },
        '45': { name: 'Toledo', region: 'Castilla-La Mancha' },
        '46': { name: 'Valencia', region: 'Com. Valenciana' },
        '47': { name: 'Valladolid', region: 'Castilla y León' },
        '48': { name: 'Vizcaya', region: 'País Vasco' },
        '49': { name: 'Zamora', region: 'Castilla y León' },
        '50': { name: 'Zaragoza', region: 'Aragón' },
        '51': { name: 'Ceuta', region: 'Ceuta' },
        '52': { name: 'Melilla', region: 'Melilla' }
    };

    const ES_KNOWN_LOCALITIES = {
        // Alicante
        '03001': 'Alicante', '03002': 'Alicante', '03003': 'Alicante', '03004': 'Alicante',
        '03005': 'Alicante', '03006': 'Alicante', '03007': 'Alicante', '03008': 'Alicante',
        '03009': 'Alicante', '03010': 'Alicante', '03011': 'Alicante', '03012': 'Alicante',
        '03013': 'Alicante', '03014': 'Alicante', '03015': 'Alicante', '03016': 'Alicante',
        '03201': 'Elche', '03202': 'Elche', '03203': 'Elche', '03204': 'Elche', '03205': 'Elche',
        '03501': 'Benidorm', '03502': 'Benidorm', '03503': 'Benidorm',
        '03690': 'San Vicente del Raspeig', '03550': 'Sant Joan d\'Alacant', '03560': 'El Campello',
        '03600': 'Elda', '03610': 'Petrer', '03801': 'Alcoy', '03802': 'Alcoy', '03803': 'Alcoy',
        '03181': 'Torrevieja', '03182': 'Torrevieja', '03183': 'Torrevieja',
        '03700': 'Dénia', '03710': 'Calp', '03730': 'Jávea', '03570': 'Villajoyosa',
        '03130': 'Santa Pola', '03590': 'Altea', '03660': 'Novelda', '03400': 'Villena',
        '03300': 'Orihuela', '03540': 'Playa San Juan (Alicante)',

        // Madrid
        '28001': 'Madrid', '28002': 'Madrid', '28003': 'Madrid', '28004': 'Madrid', '28005': 'Madrid',
        '28006': 'Madrid', '28007': 'Madrid', '28008': 'Madrid', '28009': 'Madrid', '28010': 'Madrid',
        '28011': 'Madrid', '28012': 'Madrid', '28013': 'Madrid', '28014': 'Madrid', '28015': 'Madrid',
        '28016': 'Madrid', '28017': 'Madrid', '28018': 'Madrid', '28019': 'Madrid', '28020': 'Madrid',
        '28021': 'Madrid', '28022': 'Madrid', '28023': 'Madrid', '28024': 'Madrid', '28025': 'Madrid',
        '28026': 'Madrid', '28027': 'Madrid', '28028': 'Madrid', '28029': 'Madrid', '28030': 'Madrid',
        '28031': 'Madrid', '28032': 'Madrid', '28033': 'Madrid', '28034': 'Madrid', '28035': 'Madrid',
        '28036': 'Madrid', '28037': 'Madrid', '28038': 'Madrid', '28039': 'Madrid', '28040': 'Madrid',
        '28045': 'Madrid', '28050': 'Madrid', '28053': 'Madrid', '28054': 'Madrid', '28055': 'Madrid',
        '28901': 'Getafe', '28902': 'Getafe', '28903': 'Getafe', '28904': 'Getafe', '28905': 'Getafe',
        '28911': 'Leganés', '28912': 'Leganés', '28913': 'Leganés', '28914': 'Leganés',
        '28921': 'Alcorcón', '28922': 'Alcorcón', '28923': 'Alcorcón', '28924': 'Alcorcón',
        '28931': 'Móstoles', '28932': 'Móstoles', '28933': 'Móstoles', '28934': 'Móstoles',
        '28941': 'Fuenlabrada', '28942': 'Fuenlabrada', '28943': 'Fuenlabrada',
        '28801': 'Alcalá de Henares', '28802': 'Alcalá de Henares', '28803': 'Alcalá de Henares',
        '28100': 'Alcobendas', '28108': 'Alcobendas', '28109': 'Alcobendas',
        '28701': 'San Sebastián de los Reyes', '28220': 'Majadahonda', '28223': 'Pozuelo de Alarcón',
        '28230': 'Las Rozas', '28820': 'Coslada', '28850': 'Torrejón de Ardoz',
        '28980': 'Parla', '28300': 'Aranjuez', '28320': 'Pinto', '28340': 'Valdemoro',
        '28400': 'Collado Villalba', '28660': 'Boadilla del Monte', '28760': 'Tres Cantos',

        // Barcelona
        '08001': 'Barcelona', '08002': 'Barcelona', '08003': 'Barcelona', '08004': 'Barcelona',
        '08005': 'Barcelona', '08006': 'Barcelona', '08007': 'Barcelona', '08008': 'Barcelona',
        '08009': 'Barcelona', '08010': 'Barcelona', '08011': 'Barcelona', '08012': 'Barcelona',
        '08013': 'Barcelona', '08014': 'Barcelona', '08015': 'Barcelona', '08016': 'Barcelona',
        '08017': 'Barcelona', '08018': 'Barcelona', '08019': 'Barcelona', '08020': 'Barcelona',
        '08021': 'Barcelona', '08022': 'Barcelona', '08023': 'Barcelona', '08024': 'Barcelona',
        '08025': 'Barcelona', '08026': 'Barcelona', '08027': 'Barcelona', '08028': 'Barcelona',
        '08029': 'Barcelona', '08030': 'Barcelona', '08031': 'Barcelona', '08032': 'Barcelona',
        '08033': 'Barcelona', '08034': 'Barcelona', '08035': 'Barcelona', '08036': 'Barcelona',
        '08037': 'Barcelona', '08038': 'Barcelona', '08039': 'Barcelona', '08040': 'Barcelona',
        '08041': 'Barcelona', '08042': 'Barcelona',
        '08901': 'L\'Hospitalet de Llobregat', '08902': 'L\'Hospitalet de Llobregat',
        '08911': 'Badalona', '08912': 'Badalona',
        '08201': 'Sabadell', '08202': 'Sabadell', '08221': 'Terrassa', '08222': 'Terrassa',
        '08921': 'Santa Coloma de Gramenet', '08940': 'Cornellà de Llobregat',
        '08820': 'El Prat de Llobregat', '08830': 'Sant Boi de Llobregat', '08860': 'Castelldefels',
        '08172': 'Sant Cugat del Vallès', '08301': 'Mataró',

        // Valencia
        '46001': 'Valencia', '46002': 'Valencia', '46003': 'Valencia', '46004': 'Valencia',
        '46005': 'Valencia', '46006': 'Valencia', '46007': 'Valencia', '46008': 'Valencia',
        '46009': 'Valencia', '46010': 'Valencia', '46011': 'Valencia', '46012': 'Valencia',
        '46013': 'Valencia', '46014': 'Valencia', '46015': 'Valencia', '46016': 'Valencia',
        '46017': 'Valencia', '46018': 'Valencia', '46019': 'Valencia', '46020': 'Valencia',
        '46021': 'Valencia', '46022': 'Valencia', '46023': 'Valencia', '46024': 'Valencia',
        '46025': 'Valencia', '46026': 'Valencia',
        '46900': 'Torrent', '46700': 'Gandía', '46600': 'Alzira', '46470': 'Catarroja',
        '46920': 'Mislata', '46100': 'Burjassot', '46980': 'Paterna', '46500': 'Sagunto',
        '46800': 'Xàtiva', '46870': 'Ontinyent',

        // Sevilla, Málaga, Zaragoza, Murcia, Bilbao, Baleares, Canarias, etc.
        '41001': 'Sevilla', '41002': 'Sevilla', '41003': 'Sevilla', '41004': 'Sevilla', '41700': 'Dos Hermanas',
        '29001': 'Málaga', '29002': 'Málaga', '29003': 'Málaga', '29600': 'Marbella', '29620': 'Torremolinos',
        '50001': 'Zaragoza', '50002': 'Zaragoza', '50003': 'Zaragoza',
        '30001': 'Murcia', '30002': 'Murcia', '30201': 'Cartagena', '30800': 'Lorca',
        '48001': 'Bilbao', '48002': 'Bilbao', '48901': 'Barakaldo', '48990': 'Getxo',
        '07001': 'Palma de Mallorca', '07002': 'Palma de Mallorca', '07800': 'Ibiza', '07701': 'Mahón',
        '35001': 'Las Palmas de Gran Canaria', '35002': 'Las Palmas de Gran Canaria',
        '38001': 'Santa Cruz de Tenerife', '38002': 'Santa Cruz de Tenerife',
        '33001': 'Oviedo', '33201': 'Gijón', '33401': 'Avilés',
        '15001': 'A Coruña', '15701': 'Santiago de Compostela', '36201': 'Vigo', '36001': 'Pontevedra',
        '01001': 'Vitoria-Gasteiz', '02001': 'Albacete', '04001': 'Almería', '05001': 'Ávila',
        '06001': 'Badajoz', '09001': 'Burgos', '10001': 'Cáceres', '11001': 'Cádiz',
        '12001': 'Castellón de la Plana', '13001': 'Ciudad Real', '14001': 'Córdoba',
        '16001': 'Cuenca', '17001': 'Girona', '18001': 'Granada', '19001': 'Guadalajara',
        '20001': 'San Sebastián', '21001': 'Huelva', '22001': 'Huesca', '23001': 'Jaén',
        '24001': 'León', '25001': 'Lleida', '26001': 'Logroño', '27001': 'Lugo',
        '31001': 'Pamplona', '32001': 'Ourense', '34001': 'Palencia', '37001': 'Salamanca',
        '39001': 'Santander', '40001': 'Segovia', '42001': 'Soria', '43001': 'Tarragona',
        '44001': 'Teruel', '45001': 'Toledo', '47001': 'Valladolid', '49001': 'Zamora',
        '51001': 'Ceuta', '52001': 'Melilla'
    };

    const CP_CACHE = {};

    function detectPostalCodeLocality(rawCP) {
        if (!rawCP || typeof rawCP !== 'string') {
            return { valid: false, empty: true, partial: false, message: '' };
        }
        
        const cp = rawCP.trim().replace(/\D/g, '').slice(0, 5);
        if (cp.length === 0) {
            return { valid: false, empty: true, partial: false, message: '' };
        }
        
        if (cp.length < 5) {
            const prefix = cp.slice(0, 2);
            if (cp.length >= 2 && ES_PROVINCES[prefix]) {
                const prov = ES_PROVINCES[prefix];
                return {
                    valid: false,
                    empty: false,
                    partial: true,
                    cp,
                    message: `📍 ${prov.name} (completa los 5 dígitos)...`
                };
            }
            return {
                valid: false,
                empty: false,
                partial: true,
                cp,
                message: 'Introduce 5 dígitos...'
            };
        }
        
        const prefix = cp.slice(0, 2);
        const provInfo = ES_PROVINCES[prefix];
        
        if (!provInfo) {
            return {
                valid: false,
                empty: false,
                partial: false,
                cp,
                message: 'Código postal no reconocido en España'
            };
        }
        
        const province = provInfo.name;
        const region = provInfo.region;

        // Check if verified in runtime cache
        if (CP_CACHE[cp]) {
            if (CP_CACHE[cp].notFound) {
                return {
                    valid: false,
                    empty: false,
                    partial: false,
                    cp,
                    message: `Código postal no reconocido en ${province}`
                };
            } else if (CP_CACHE[cp].valid) {
                const cached = CP_CACHE[cp];
                const displayText = (cached.locality && cached.locality !== cached.region)
                    ? `${cached.locality}, ${cached.region}`
                    : (cached.locality || province);
                return {
                    valid: true,
                    empty: false,
                    cp,
                    locality: cached.locality,
                    province,
                    region: cached.region,
                    displayText,
                    badgeText: `📍 ${displayText} ✓`,
                    summaryText: (cached.locality && cached.locality !== province) ? `${cached.locality} (${province})` : `${province}, ${region}`
                };
            }
        }
        
        let locality = ES_KNOWN_LOCALITIES[cp];
        if (!locality) {
            locality = province;
        }
        
        let displayText = '';
        if (locality === province) {
            if (province === 'Madrid') {
                displayText = 'Madrid';
            } else {
                displayText = `${province}, ${region}`;
            }
        } else {
            if (province === 'Madrid') {
                displayText = `${locality}, Madrid`;
            } else {
                displayText = `${locality}, ${region}`;
            }
        }

        const summaryText = (locality && locality !== province) ? `${locality} (${province})` : (province === 'Madrid' ? 'Madrid' : `${province}, ${region}`);
        
        return {
            valid: true,
            empty: false,
            cp,
            locality,
            province,
            region,
            displayText,
            badgeText: `📍 ${displayText} ✓`,
            summaryText
        };
    }

    // ─── SMART PHONE VALIDATION & FORMATTING ───
    function formatPhoneNumber(rawPhone) {
        if (!rawPhone) return '';
        let val = String(rawPhone).trim();
        if (val.startsWith('00')) {
            val = '+' + val.slice(2);
        }
        const hasPlus = val.startsWith('+');
        const digitsOnly = val.replace(/\D/g, '');
        
        if (hasPlus) {
            if (digitsOnly.startsWith('34')) {
                const nationalDigits = digitsOnly.slice(2, 11);
                if (nationalDigits.length === 0) return '+34 ';
                if (nationalDigits.length <= 3) return `+34 ${nationalDigits}`;
                if (nationalDigits.length <= 6) return `+34 ${nationalDigits.slice(0, 3)} ${nationalDigits.slice(3)}`;
                return `+34 ${nationalDigits.slice(0, 3)} ${nationalDigits.slice(3, 6)} ${nationalDigits.slice(6, 9)}`;
            }
            if (digitsOnly.length <= 3) return `+${digitsOnly}`;
            if (digitsOnly.length <= 6) return `+${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2)}`;
            if (digitsOnly.length <= 9) return `+${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5)}`;
            if (digitsOnly.length <= 12) return `+${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 8)} ${digitsOnly.slice(8)}`;
            return `+${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 8)} ${digitsOnly.slice(8, 11)} ${digitsOnly.slice(11, 14)}`;
        }
        
        const digits = digitsOnly.slice(0, 9);
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
    }

    function validatePhoneNumber(rawPhone) {
        if (!rawPhone || !rawPhone.trim()) return { valid: false, empty: true, message: '' };
        let val = rawPhone.trim();
        if (val.startsWith('00')) {
            val = '+' + val.slice(2);
        }
        const hasPlus = val.startsWith('+');
        const digitsOnly = val.replace(/\D/g, '');
        
        if (hasPlus) {
            if (digitsOnly.startsWith('34')) {
                const nationalDigits = digitsOnly.slice(2);
                if (nationalDigits.length === 9 && /^[6789]/.test(nationalDigits)) {
                    return { valid: true, formatted: formatPhoneNumber(val), isSpanish: true, message: '✓ Teléfono nacional válido (+34)' };
                }
                return { valid: false, message: 'Teléfono incompleto (+34 y 9 dígitos empezando por 6, 7, 8 o 9)' };
            }
            if (digitsOnly.length >= 8 && digitsOnly.length <= 15) {
                return { valid: true, formatted: formatPhoneNumber(val), isSpanish: false, message: '✓ Teléfono internacional válido' };
            }
            return { valid: false, message: 'Teléfono internacional no válido' };
        }
        
        if (digitsOnly.length === 9) {
            if (/^[6789]/.test(digitsOnly)) {
                return { valid: true, formatted: formatPhoneNumber(val), isSpanish: true, message: '✓ Teléfono válido' };
            }
            return { valid: false, message: 'Debe empezar por 6, 7, 8 o 9' };
        }
        
        return { valid: false, message: 'Introduce 9 dígitos (ej: 612 345 678)' };
    }

    // ─── EMAIL VALIDATION & TYPO SUGGESTIONS ───
    const EMAIL_DOMAIN_TYPOS = {
        'gmil.com': 'gmail.com', 'gmaill.com': 'gmail.com', 'gmai.com': 'gmail.com',
        'gamil.com': 'gmail.com', 'gmail.es': 'gmail.com', 'gma.com': 'gmail.com',
        'gmial.com': 'gmail.com', 'gmeil.com': 'gmail.com', 'gmai.es': 'gmail.com',
        'hotmial.com': 'hotmail.com', 'hotmale.com': 'hotmail.com', 'hotmai.com': 'hotmail.com',
        'hotmaill.com': 'hotmail.com', 'hotm.com': 'hotmail.com', 'hormail.com': 'hotmail.com',
        'hotmal.com': 'hotmail.com', 'hotmial.es': 'hotmail.es', 'hotmai.es': 'hotmail.es',
        'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com', 'outlock.com': 'outlook.com',
        'outllok.com': 'outlook.com', 'outlok.es': 'outlook.es',
        'yaho.com': 'yahoo.es', 'yahooo.com': 'yahoo.es', 'yaho.es': 'yahoo.es', 'yahooo.es': 'yahoo.es',
        'iclud.com': 'icloud.com', 'iclou.com': 'icloud.com', 'iclaud.com': 'icloud.com',
        'protonmai.com': 'protonmail.com', 'protonmaill.com': 'protonmail.com'
    };

    function checkEmailValidation(emailRaw) {
        if (!emailRaw || !emailRaw.trim()) return { valid: false, empty: true, hasTypo: false, message: '' };
        const email = emailRaw.trim().toLowerCase();
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidFormat = emailRegex.test(email);
        
        const parts = email.split('@');
        if (parts.length === 2 && parts[0].length > 0) {
            const user = parts[0];
            const domain = parts[1];
            if (EMAIL_DOMAIN_TYPOS[domain]) {
                const correctedDomain = EMAIL_DOMAIN_TYPOS[domain];
                const suggested = `${user}@${correctedDomain}`;
                return {
                    valid: isValidFormat,
                    hasTypo: true,
                    suggested,
                    original: email,
                    message: `¿Quisiste decir ${suggested}?`
                };
            }
        }
        
        return {
            valid: isValidFormat,
            hasTypo: false,
            email,
            message: isValidFormat ? '✓ Correo válido' : 'Formato de correo no válido (ej: tu_nombre@gmail.com)'
        };
    }

    function renderEmailSuggestion(inputId, suggestionBoxId, validationResult, isBlur = false) {
        const box = document.getElementById(suggestionBoxId);
        if (!box) return;
        
        if (!validationResult || validationResult.empty) {
            box.style.display = 'none';
            box.className = 'email-suggestion-box';
            box.innerHTML = '';
            return;
        }
        
        if (validationResult.hasTypo && validationResult.suggested) {
            const escSuggested = String(validationResult.suggested).replace(/"/g, '&quot;');
            box.className = 'email-suggestion-box';
            box.innerHTML = `
                <div class="typo-suggestion-content">
                    <span class="typo-suggestion-text">💡 ¿Quisiste decir <strong>${escSuggested}</strong>?</span>
                    <button type="button" class="btn-apply-suggestion" data-target="${inputId}" data-suggestion="${escSuggested}">Corregir</button>
                </div>
            `;
            box.style.display = 'flex';
            
            const btn = box.querySelector('.btn-apply-suggestion');
            if (btn) {
                btn.onclick = () => {
                    const targetEl = document.getElementById(inputId);
                    if (targetEl) {
                        targetEl.value = validationResult.suggested;
                        box.style.display = 'none';
                        targetEl.dispatchEvent(new Event('input', { bubbles: true }));
                        if (typeof Toast !== 'undefined' && Toast.success) {
                            Toast.success('Correo corregido automáticamente a ' + validationResult.suggested);
                        }
                    }
                };
            }
        } else if (validationResult.valid) {
            box.className = 'field-feedback-badge valid';
            box.textContent = '✓ Correo válido';
            box.style.display = 'inline-flex';
        } else {
            const inputEl = document.getElementById(inputId);
            const val = inputEl ? inputEl.value.trim() : '';
            if (isBlur || val.length >= 3) {
                box.className = 'field-feedback-badge invalid';
                box.textContent = '⚠️ Formato de correo no válido (ej: tu@email.com)';
                box.style.display = 'inline-flex';
            } else {
                box.style.display = 'none';
                box.className = 'email-suggestion-box';
                box.innerHTML = '';
            }
        }
    }

    // Expose helpers globally for testing & runtime modularity
    if (typeof window !== 'undefined') {
        window.ES_PROVINCES = ES_PROVINCES;
        window.ES_KNOWN_LOCALITIES = ES_KNOWN_LOCALITIES;
        window.detectPostalCodeLocality = detectPostalCodeLocality;
        window.formatPhoneNumber = formatPhoneNumber;
        window.validatePhoneNumber = validatePhoneNumber;
        window.EMAIL_DOMAIN_TYPOS = EMAIL_DOMAIN_TYPOS;
        window.checkEmailValidation = checkEmailValidation;
    }

    // Postal Code (CP) event handling
    const shipCPEl = document.getElementById('shipCP');
    const shipCPBadgeEl = document.getElementById('shipCPBadge');
    let currentCpAbortCtrl = null;

    async function updateShipCPLookup() {
        if (!shipCPEl) return;
        const raw = shipCPEl.value;
        const cleaned = raw.replace(/\D/g, '').slice(0, 5);
        if (raw !== cleaned) {
            shipCPEl.value = cleaned;
        }
        
        const result = detectPostalCodeLocality(cleaned);
        if (shipCPBadgeEl) {
            if (result.empty) {
                shipCPBadgeEl.style.display = 'none';
                shipCPBadgeEl.className = 'cp-locality-badge';
                shipCPBadgeEl.textContent = '';
            } else if (result.valid) {
                shipCPBadgeEl.style.display = 'inline-flex';
                shipCPBadgeEl.className = 'cp-locality-badge valid';
                shipCPBadgeEl.textContent = result.badgeText;
            } else if (result.partial) {
                shipCPBadgeEl.style.display = 'inline-flex';
                shipCPBadgeEl.className = 'cp-locality-badge hint';
                shipCPBadgeEl.textContent = result.message;
            } else {
                shipCPBadgeEl.style.display = 'inline-flex';
                shipCPBadgeEl.className = 'cp-locality-badge invalid';
                shipCPBadgeEl.textContent = `⚠️ ${result.message}`;
            }
        }

        // Live verification for 5-digit codes against open postal dataset
        if (cleaned.length === 5 && !CP_CACHE[cleaned] && !ES_KNOWN_LOCALITIES[cleaned]) {
            const prefix = cleaned.slice(0, 2);
            if (ES_PROVINCES[prefix]) {
                if (currentCpAbortCtrl) {
                    currentCpAbortCtrl.abort();
                }
                currentCpAbortCtrl = new AbortController();
                const signal = currentCpAbortCtrl.signal;

                try {
                    const fetchPromise = fetch(`https://api.zippopotam.us/es/${cleaned}`, { signal });
                    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2500));
                    const resp = await Promise.race([fetchPromise, timeoutPromise]);
                    
                    if (resp.status === 200) {
                        const data = await resp.json();
                        if (data && data.places && data.places.length > 0) {
                            const place = data.places[0];
                            const placeName = place['place name'] || ES_PROVINCES[prefix].name;
                            const state = place['state'] || ES_PROVINCES[prefix].region;
                            CP_CACHE[cleaned] = {
                                valid: true,
                                locality: placeName,
                                region: state
                            };
                        }
                    } else if (resp.status === 404) {
                        CP_CACHE[cleaned] = {
                            valid: false,
                            notFound: true,
                            message: `Código postal no reconocido en ${ES_PROVINCES[prefix].name}`
                        };
                    }
                } catch (e) {
                    // Fallback to province gracefully
                }

                if (shipCPEl && shipCPEl.value === cleaned) {
                    const verifiedResult = detectPostalCodeLocality(cleaned);
                    if (shipCPBadgeEl) {
                        if (verifiedResult.valid) {
                            shipCPBadgeEl.style.display = 'inline-flex';
                            shipCPBadgeEl.className = 'cp-locality-badge valid';
                            shipCPBadgeEl.textContent = verifiedResult.badgeText;
                        } else {
                            shipCPBadgeEl.style.display = 'inline-flex';
                            shipCPBadgeEl.className = 'cp-locality-badge invalid';
                            shipCPBadgeEl.textContent = `⚠️ ${verifiedResult.message}`;
                        }
                    }
                    updateOrderSummaryCard();
                }
            }
        }
    }

    if (shipCPEl) {
        shipCPEl.addEventListener('input', () => {
            updateShipCPLookup();
            updateOrderSummaryCard();
        });
    }

    // Phone formatting & validation event handling
    const shipPhoneEl = document.getElementById('shipPhone');
    const shipPhoneBadgeEl = document.getElementById('shipPhoneBadge');

    function updateShipPhoneLookup() {
        if (!shipPhoneEl) return;
        const raw = shipPhoneEl.value;
        const filtered = raw.replace(/[^\d\s\+\-]/g, '');
        const formatted = formatPhoneNumber(filtered);
        if (formatted !== raw && raw !== filtered) {
            shipPhoneEl.value = formatted;
        } else if (formatted !== raw && !raw.endsWith(' ')) {
            shipPhoneEl.value = formatted;
        }
        
        const validation = validatePhoneNumber(shipPhoneEl.value);
        if (shipPhoneBadgeEl) {
            if (validation.empty) {
                shipPhoneBadgeEl.style.display = 'none';
                shipPhoneBadgeEl.className = 'field-feedback-badge';
                shipPhoneBadgeEl.textContent = '';
            } else if (validation.valid) {
                shipPhoneBadgeEl.style.display = 'inline-flex';
                shipPhoneBadgeEl.className = 'field-feedback-badge valid';
                shipPhoneBadgeEl.textContent = validation.message;
            } else {
                const digitsCount = shipPhoneEl.value.replace(/\D/g, '').length;
                if (digitsCount >= 3) {
                    shipPhoneBadgeEl.style.display = 'inline-flex';
                    shipPhoneBadgeEl.className = 'field-feedback-badge hint';
                    shipPhoneBadgeEl.textContent = validation.message;
                } else {
                    shipPhoneBadgeEl.style.display = 'none';
                }
            }
        }
    }

    if (shipPhoneEl) {
        shipPhoneEl.addEventListener('input', () => {
            updateShipPhoneLookup();
            updateOrderSummaryCard();
        });
        shipPhoneEl.addEventListener('blur', () => {
            const validation = validatePhoneNumber(shipPhoneEl.value);
            if (shipPhoneBadgeEl && !validation.empty && !validation.valid) {
                shipPhoneBadgeEl.style.display = 'inline-flex';
                shipPhoneBadgeEl.className = 'field-feedback-badge invalid';
                shipPhoneBadgeEl.textContent = `⚠️ ${validation.message}`;
            }
        });
    }

    // Email typo & validation handling for shipEmail & contactEmail
    const shipEmailEl = document.getElementById('shipEmail');
    if (shipEmailEl) {
        shipEmailEl.addEventListener('input', () => {
            const res = checkEmailValidation(shipEmailEl.value);
            renderEmailSuggestion('shipEmail', 'shipEmailSuggestion', res, false);
            updateOrderSummaryCard();
        });
        shipEmailEl.addEventListener('blur', () => {
            const res = checkEmailValidation(shipEmailEl.value);
            renderEmailSuggestion('shipEmail', 'shipEmailSuggestion', res, true);
        });
    }

    const contactEmailEl = document.getElementById('contactEmail');
    if (contactEmailEl) {
        contactEmailEl.addEventListener('input', () => {
            const res = checkEmailValidation(contactEmailEl.value);
            renderEmailSuggestion('contactEmail', 'contactEmailSuggestion', res, false);
        });
        contactEmailEl.addEventListener('blur', () => {
            const res = checkEmailValidation(contactEmailEl.value);
            renderEmailSuggestion('contactEmail', 'contactEmailSuggestion', res, true);
        });
    }

    ['shipName', 'shipAddress'].forEach(id => {
        const inputEl = document.getElementById(id);
        if (inputEl) {
            inputEl.addEventListener('input', updateOrderSummaryCard);
        }
    });

    // ─── ORDER SUMMARY & INSTAGRAM DM BRIDGE ───
    function generateOrderSpecs() {
        const type = productSelect ? productSelect.value : 'corazon';
        const productInfo = PRODUCT_CATALOG[type] || PRODUCT_CATALOG.corazon;
        const name1 = (document.getElementById('name1')?.value || '').trim();
        const name2 = (document.getElementById('name2')?.value || '').trim();
        const fecha = (document.getElementById('fecha')?.value || '').trim();
        const addCard = document.getElementById('addCard')?.checked;
        const cardTitleVal = (document.getElementById('cardTitle')?.value || '').trim();
        const cardMessageVal = (document.getElementById('cardMessage')?.value || '').trim();

        const deliverySelectEl = document.getElementById('deliverySelect');
        const deliveryChoice = deliverySelectEl ? deliverySelectEl.value : 'recogida';
        const isEnvio = deliveryChoice === 'envio';
        const basePrice = productInfo.priceNum || 15;
        const finalPriceNum = isEnvio ? (basePrice + 4.99) : basePrice;
        const finalPriceFormatted = isEnvio ? `${finalPriceNum.toFixed(2).replace('.', ',')}€` : `${finalPriceNum}€`;
        const deliveryText = isEnvio ? 'Envío a domicilio 24/48h (+4,99€)' : 'Recogida Gratis en Alicante (Luceros)';

        const shipName = (document.getElementById('shipName')?.value || '').trim();
        const shipAddress = (document.getElementById('shipAddress')?.value || '').trim();
        const shipCP = (document.getElementById('shipCP')?.value || '').trim();
        const shipPhone = (document.getElementById('shipPhone')?.value || '').trim();
        const shipEmail = (document.getElementById('shipEmail')?.value || '').trim();

        const cpDetection = detectPostalCodeLocality(shipCP);
        const localityInfo = cpDetection.valid ? cpDetection.summaryText : '';

        let namesFormatted = (type === 'individual') ? (name1 || 'Sin nombre') : `${name1 || 'Nombre 1'} + ${name2 || 'Nombre 2'}`;
        
        return {
            type,
            productName: productInfo.name,
            basePrice: productInfo.price,
            totalPrice: finalPriceFormatted,
            deliveryChoice,
            deliveryMethod: deliveryText,
            isEnvio,
            shipName,
            shipAddress,
            shipCP,
            shipPhone,
            shipEmail,
            localityInfo,
            cpDetection,
            hasShippingData: !!(shipName || shipAddress || shipCP || shipPhone || shipEmail),
            names: namesFormatted,
            fecha: fecha || 'No grabada',
            hasCard: (type !== 'individual') && !!addCard,
            cardTitle: (type !== 'individual' && addCard) ? (cardTitleVal || 'Sin título') : null,
            cardMessage: (type !== 'individual' && addCard) ? (cardMessageVal || 'Sin mensaje') : null
        };
    }

    function updateOrderSummaryCard() {
        const esc = (s) => (s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;') : '');
        const specs = generateOrderSpecs();
        const container = document.getElementById('summaryDetailsList');
        if (!container) return;

        container.innerHTML = `
            <div class="summary-item">
                <span class="summary-item-label">Modelo</span>
                <span class="summary-item-val">🏷️ ${esc(specs.productName)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-item-label">Entrega</span>
                <span class="summary-item-val">🚚 ${esc(specs.deliveryMethod)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-item-label">Total Final</span>
                <span class="summary-item-val">💳 <strong>${esc(specs.totalPrice)}</strong></span>
            </div>
            <div class="summary-item">
                <span class="summary-item-label">Nombres / Iniciales</span>
                <span class="summary-item-val">✍️ ${esc(specs.names)}</span>
            </div>
            ${specs.fecha !== 'No grabada' ? `
            <div class="summary-item">
                <span class="summary-item-label">Fecha Reverso</span>
                <span class="summary-item-val">📅 ${esc(specs.fecha)}</span>
            </div>` : ''}
            ${specs.hasCard ? `
            <div class="summary-item">
                <span class="summary-item-label">Tarjeta 3D Regalo</span>
                <span class="summary-item-val">💌 "${esc(specs.cardTitle)}": ${esc(specs.cardMessage)}</span>
            </div>` : ''}
            ${specs.isEnvio && specs.hasShippingData ? `
            <div class="summary-item" style="grid-column: 1 / -1; background: var(--bg-subtle); padding: 0.65rem 0.8rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-medium);">
                <span class="summary-item-label">Datos de Envío a Domicilio</span>
                <span class="summary-item-val" style="font-size: 0.82rem; font-weight: 500; line-height: 1.45;">
                    📦 <strong>${esc(specs.shipName || 'Nombre por confirmar')}</strong><br>
                    🏠 ${esc(specs.shipAddress || 'Dirección por confirmar')}<br>
                    📍 CP ${esc(specs.shipCP || '-----')}${specs.localityInfo ? ` <span class="summary-locality-tag">📍 ${esc(specs.localityInfo)}</span>` : ''}<br>
                    📞 Tel: ${esc(specs.shipPhone || 'Por confirmar')} · ✉️ ${esc(specs.shipEmail || 'Por confirmar')}
                </span>
            </div>` : ''}
        `;
    }

    // Botón de Copiar Resumen para Instagram DM
    const btnCopySummary = document.getElementById('btnCopySummary');
    if (btnCopySummary) {
        btnCopySummary.addEventListener('click', async () => {
            const specs = generateOrderSpecs();
            
            let textToCopy = `✨ ¡Hola Latens Studio! 👋 Quiero encargar este llavero personalizado:\n\n` +
                `📋 Modelo: ${specs.productName} (${specs.basePrice})\n` +
                `✍️ Nombres/Iniciales: ${specs.names}\n`;
            
            if (specs.fecha !== 'No grabada') {
                textToCopy += `📅 Fecha Reverso: ${specs.fecha}\n`;
            }
            if (specs.hasCard) {
                textToCopy += `💌 Tarjeta 3D Regalo: "${specs.cardTitle}" - ${specs.cardMessage}\n`;
            }
            
            textToCopy += `🚚 Entrega: ${specs.deliveryMethod}\n` +
                `💳 Total Pedido: ${specs.totalPrice}\n` +
                `🎁 Incluye: Chapita de Regalo Gratis\n` +
                `🎨 Acabado: Base Negro Sombra / Letras Blanco Nieve (PLA+)\n\n`;

            if (specs.isEnvio) {
                const cpLine = specs.shipCP 
                    ? (specs.localityInfo ? `${specs.shipCP} (${specs.localityInfo})` : specs.shipCP) 
                    : '(a confirmar por chat)';
                textToCopy += `📦 Datos para el Envío a Domicilio:\n` +
                    `• Nombre: ${specs.shipName || '(a confirmar por chat)'}\n` +
                    `• Dirección: ${specs.shipAddress || '(a confirmar por chat)'}\n` +
                    `• Código Postal: ${cpLine}\n` +
                    `• Teléfono: ${specs.shipPhone || '(a confirmar por chat)'}\n` +
                    `• Email: ${specs.shipEmail || '(a confirmar por chat)'}\n\n`;
            } else {
                textToCopy += `📍 Punto de Entrega: Recogida en mano en Alicante (Plaza de los Luceros)\n\n`;
            }
            
            textToCopy += `¿Podríais confirmarme disponibilidad y plazo de entrega? ¡Muchas gracias!`;

            let copied = false;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    copied = true;
                } catch (clipErr) {
                    console.warn('navigator.clipboard writeText failed, attempting execCommand fallback:', clipErr);
                }
            }

            if (!copied) {
                try {
                    const tempTa = document.createElement('textarea');
                    tempTa.value = textToCopy;
                    tempTa.setAttribute('readonly', '');
                    tempTa.style.position = 'fixed';
                    tempTa.style.left = '-9999px';
                    tempTa.style.top = '0';
                    document.body.appendChild(tempTa);
                    tempTa.select();
                    tempTa.setSelectionRange(0, 99999);
                    copied = document.execCommand('copy');
                    tempTa.remove();
                } catch (execErr) {
                    console.warn('execCommand copy fallback failed:', execErr);
                }
            }

            if (copied) {
                // Feedback visual en el botón
                const originalContent = btnCopySummary.innerHTML;
                btnCopySummary.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>¡Resumen copiado!</span>
                `;
                btnCopySummary.classList.add('copied');
                
                Toast.success('¡Resumen copiado! Listo para pegar en el chat de Instagram (@latens.studio)', 'Copiado al portapapeles');
                
                setTimeout(() => {
                    btnCopySummary.innerHTML = originalContent;
                    btnCopySummary.classList.remove('copied');
                }, 2500);
            } else {
                Toast.info('Resumen preparado para copiar.', 'Aviso');
            }
        });
    }

    // Botón directo a Instagram
    const btnOpenInstagram = document.getElementById('btnOpenInstagram');
    if (btnOpenInstagram) {
        btnOpenInstagram.addEventListener('click', () => {
            Toast.info('Abriendo perfil de Instagram (@latens.studio). Pega tu resumen copiado en el mensaje directo.', 'Instagram DM');
        });
    }

    // ─── URL ROUTING ───
    function handleUrlRouting() {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;

        // Soporte para abrir modal de detalles directamente (ej: ?detalle=corazon o #detalle-iniciales)
        const paramDetalle = urlParams.get('detalle') || urlParams.get('detalles') || urlParams.get('modal') || urlParams.get('ver');
        let modalProductId = null;
        if (paramDetalle) {
            const dVal = paramDetalle.toLowerCase();
            if (dVal.includes('inicial')) {
                modalProductId = 'iniciales';
            } else if (dVal.includes('individual') || dVal.includes('solo') || dVal.includes('unico')) {
                modalProductId = 'individual';
            } else {
                modalProductId = 'corazon';
            }
        } else if (hash && hash.toLowerCase().startsWith('#detalle-')) {
            const hVal = hash.toLowerCase().replace('#detalle-', '').trim();
            if (hVal.includes('inicial')) {
                modalProductId = 'iniciales';
            } else if (hVal.includes('individual')) {
                modalProductId = 'individual';
            } else {
                modalProductId = 'corazon';
            }
        }

        if (modalProductId) {
            switchTab('tab-gallery', false);
            setTimeout(() => {
                if (typeof openProductDetailsModal === 'function') {
                    openProductDetailsModal(modalProductId);
                }
            }, 120);
            return;
        }
        
        const paramTab = urlParams.get('tab') || urlParams.get('seccion');
        let targetTab = resolveTabId(paramTab);

        if (!targetTab && hash) {
            targetTab = resolveTabId(hash);
        }

        const paramProduct = urlParams.get('producto') || urlParams.get('product') || urlParams.get('modelo');
        if (paramProduct && productSelect) {
            const productVal = paramProduct.toLowerCase();
            if (productVal.includes('inicial')) {
                productSelect.value = 'iniciales';
            } else if (productVal.includes('individual') || productVal.includes('solo') || productVal.includes('unico')) {
                productSelect.value = 'individual';
            } else if (productVal.includes('corazon') || productVal.includes('nombre')) {
                productSelect.value = 'corazon';
            }
            renderDynamicInputs();
            if (!targetTab) targetTab = 'tab-preview';
        }

        const n1 = urlParams.get('nombre1') || urlParams.get('n1') || urlParams.get('nombre_izq');
        const n2 = urlParams.get('nombre2') || urlParams.get('n2') || urlParams.get('nombre_der');
        if (n1 || n2) {
            setTimeout(() => {
                const input1 = document.getElementById('name1');
                const input2 = document.getElementById('name2');
                if (input1 && n1) input1.value = n1;
                if (input2 && n2) input2.value = n2;
                updateOrderSummaryCard();
            }, 80);
            if (!targetTab) targetTab = 'tab-preview';
        }

        if (!targetTab) {
            try {
                const saved = sessionStorage.getItem('latens_active_tab');
                if (saved && document.getElementById(saved)) {
                    targetTab = saved;
                }
            } catch(e) {}
        }

        if (targetTab) {
            switchTab(targetTab, false);
        }
    }

    window.addEventListener('hashchange', () => {
        if (window.location.hash) {
            const hash = window.location.hash;
            if (hash.toLowerCase().startsWith('#detalle-')) {
                const hVal = hash.toLowerCase().replace('#detalle-', '').trim();
                let modalProductId = 'corazon';
                if (hVal.includes('inicial')) modalProductId = 'iniciales';
                else if (hVal.includes('individual')) modalProductId = 'individual';
                switchTab('tab-gallery', false);
                setTimeout(() => {
                    if (typeof openProductDetailsModal === 'function') {
                        openProductDetailsModal(modalProductId);
                    }
                }, 100);
                return;
            }
            const target = resolveTabId(window.location.hash);
            if (target) switchTab(target, false);
        }
    });

    // Enlaces de navegación rápida del footer con soporte para switchTab y scroll suave
    document.querySelectorAll('.footer-links a[href^="#tab-"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = resolveTabId(href);
            if (target) {
                e.preventDefault();
                switchTab(target);
            }
        });
    });

    handleUrlRouting();

    // ─── API CALL & VIEWER STATE ───
    const generateBtn = document.getElementById('generateBtn');
    const viewerInitial = document.getElementById('viewerInitial');
    const viewerLoading = document.getElementById('viewerLoading');
    const viewerResults = document.getElementById('viewerResults');
    
    const carouselTrack = document.getElementById('carouselTrack');
    const perspectiveLabel = document.getElementById('perspectiveLabel');
    
    const modeJuntosBtn = document.getElementById('modeJuntosBtn');
    const modeSeparadosBtn = document.getElementById('modeSeparadosBtn');
    const modeTarjetaBtn = document.getElementById('modeTarjetaBtn');

    let currentApiData = null;
    let activeMode = 'juntos';
    let currentSlide = 0;

    const perspectivesLlavero = [
        "Vista Frontal (Frente)", 
        "Vista Trasera (Posterior)", 
        "Vista Lateral Izquierda", 
        "Vista Lateral Derecha", 
        "Vista Isométrica (Relieve 3D)"
    ];

    const perspectivesTarjeta = [
        "Vista Frontal (Regalo)", 
        "Vista Lateral (Borde/Grosor)", 
        "Vista Trasera (Redes Sociales)"
    ];

    function getActiveImages() {
        if (!currentApiData) return [];
        if (activeMode === 'tarjeta') {
            return currentApiData.images_tarjeta || [];
        }
        return (activeMode === 'juntos') 
            ? (currentApiData.images_juntos || currentApiData.images || [])
            : (currentApiData.images_separados || currentApiData.images || []);
    }

    function renderCarouselImages() {
        if (!currentApiData || !carouselTrack) return;
        
        const imgList = getActiveImages();
        const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;

        carouselTrack.innerHTML = '';
        const thumbsContainer = document.getElementById('perspectiveThumbs');
        if (thumbsContainer) thumbsContainer.innerHTML = '';

        imgList.forEach((imgBase64, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide-item';
            slide.title = 'Haz clic para ampliar la imagen';
            const label = currentPerspectives[index] || `Vista ${index}`;
            slide.innerHTML = `<img src="data:image/png;base64,${imgBase64}" alt="${label}">`;
            
            slide.addEventListener('click', () => {
                openLightbox(index);
            });

            carouselTrack.appendChild(slide);

            if (thumbsContainer) {
                const thumbBtn = document.createElement('button');
                thumbBtn.className = 'thumb-btn';
                if (index === currentSlide) thumbBtn.classList.add('active');
                
                let shortName = label.split(' ')[1] || `V${index}`;
                if (activeMode === 'tarjeta') {
                    if (index === 0) shortName = 'Frontal';
                    if (index === 1) shortName = 'Lateral';
                    if (index === 2) shortName = 'Trasera';
                }
                
                thumbBtn.textContent = shortName;
                thumbBtn.addEventListener('click', () => {
                    currentSlide = index;
                    updateCarousel();
                });
                thumbsContainer.appendChild(thumbBtn);
            }
        });

        if (currentSlide >= imgList.length) {
            currentSlide = 0;
        }

        updateCarousel();
    }

    function updateCarousel() {
        if (!carouselTrack) return;
        const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
        
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        if (perspectiveLabel) perspectiveLabel.textContent = currentPerspectives[currentSlide] || `Perspectiva ${currentSlide + 1}`;
        
        const thumbs = document.querySelectorAll('#perspectiveThumbs .thumb-btn');
        thumbs.forEach((thumb, idx) => {
            thumb.classList.toggle('active', idx === currentSlide);
        });

        if (lightboxModal && lightboxModal.classList.contains('active')) {
            updateLightboxContent();
        }
    }

    function setActiveModeBtn(mode) {
        if (modeJuntosBtn) modeJuntosBtn.classList.toggle('active', mode === 'juntos');
        if (modeSeparadosBtn) modeSeparadosBtn.classList.toggle('active', mode === 'separados');
        if (modeTarjetaBtn) modeTarjetaBtn.classList.toggle('active', mode === 'tarjeta');
    }

    if (modeJuntosBtn && modeSeparadosBtn) {
        modeJuntosBtn.addEventListener('click', () => {
            activeMode = 'juntos';
            setActiveModeBtn('juntos');
            renderCarouselImages();
        });

        modeSeparadosBtn.addEventListener('click', () => {
            activeMode = 'separados';
            setActiveModeBtn('separados');
            renderCarouselImages();
        });
        
        if (modeTarjetaBtn) {
            modeTarjetaBtn.addEventListener('click', () => {
                activeMode = 'tarjeta';
                setActiveModeBtn('tarjeta');
                renderCarouselImages();
            });
        }
    }

    const addCardCb = document.getElementById('addCard');
    const cardInputsGroup = document.getElementById('cardInputsGroup');
    const cardTitle = document.getElementById('cardTitle');
    const cardMessage = document.getElementById('cardMessage');
    const titleCounter = document.getElementById('titleCounter');
    const messageCounter = document.getElementById('messageCounter');

    if (addCardCb && cardInputsGroup) {
        addCardCb.addEventListener('change', () => {
            cardInputsGroup.style.display = addCardCb.checked ? 'block' : 'none';
            updateOrderSummaryCard();
        });
    }

    if (cardTitle && titleCounter) {
        cardTitle.addEventListener('input', () => {
            titleCounter.textContent = `${cardTitle.value.length}/20`;
            updateOrderSummaryCard();
        });
    }

    if (cardMessage && messageCounter) {
        cardMessage.addEventListener('input', () => {
            messageCounter.textContent = `${cardMessage.value.length}/60`;
            updateOrderSummaryCard();
        });
    }

    const carPrevBtn = document.getElementById('carouselPrev');
    const carNextBtn = document.getElementById('carouselNext');

    if (carPrevBtn) {
        carPrevBtn.addEventListener('click', () => {
            const totalSlides = carouselTrack ? carouselTrack.children.length : 1;
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
            updateCarousel();
        });
    }

    if (carNextBtn) {
        carNextBtn.addEventListener('click', () => {
            const totalSlides = carouselTrack ? carouselTrack.children.length : 1;
            currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
            updateCarousel();
        });
    }

    // ─── LIGHTBOX MODAL WITH ZOOM & PAN (ESTILO AMAZON CLEAN) ───
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxViewport = document.getElementById('lightboxViewport');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxBottomControls = document.getElementById('lightboxBottomControls');

    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    let lightboxMode = '3d';
    let catalogLightboxImages = [];
    let catalogSlideIndex = 0;

    function applyZoomTransform(animate = false) {
        if (!lightboxImg) return;
        if (animate) {
            lightboxImg.style.transition = 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)';
        } else {
            lightboxImg.style.transition = 'none';
        }
        lightboxImg.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${zoomLevel})`;
    }

    function clampPan() {
        if (zoomLevel <= 1.02) {
            panX = 0;
            panY = 0;
            return;
        }
        if (!lightboxImg) return;
        const rect = lightboxImg.getBoundingClientRect();
        const maxPanX = Math.max(0, (rect.width * (zoomLevel - 1)) / (2 * zoomLevel) + 60);
        const maxPanY = Math.max(0, (rect.height * (zoomLevel - 1)) / (2 * zoomLevel) + 60);
        panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
        panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
    }

    function resetZoom(animate = true) {
        zoomLevel = 1;
        panX = 0;
        panY = 0;
        applyZoomTransform(animate);
    }

    function setZoom(newZoom, centerX = null, centerY = null, animate = false) {
        const oldZoom = zoomLevel;
        zoomLevel = Math.max(1.0, Math.min(4.0, newZoom));
        
        if (centerX !== null && centerY !== null && lightboxViewport && oldZoom !== zoomLevel) {
            const rect = lightboxViewport.getBoundingClientRect();
            const midX = centerX - (rect.left + rect.width / 2);
            const midY = centerY - (rect.top + rect.height / 2);
            const ratio = zoomLevel / oldZoom;
            panX = panX * ratio + midX * (1 - ratio);
            panY = panY * ratio + midY * (1 - ratio);
        }
        
        if (zoomLevel <= 1.02) {
            panX = 0;
            panY = 0;
        } else {
            clampPan();
        }
        applyZoomTransform(animate);
    }

    function updateLightboxContent() {
        if (!lightboxImg) return;
        
        if (lightboxMode === '3d') {
            const imgList = getActiveImages();
            const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
            if (imgList[currentSlide]) {
                lightboxImg.src = `data:image/png;base64,${imgList[currentSlide]}`;
                const pLabel = currentPerspectives[currentSlide] || `Perspectiva ${currentSlide + 1}`;
                lightboxImg.alt = `Vista 3D: ${pLabel}`;
            }
            const hasMultiple = imgList.length > 1;
            if (lightboxBottomControls) lightboxBottomControls.style.display = hasMultiple ? 'flex' : 'none';
            if (lightboxPrev) lightboxPrev.style.display = hasMultiple ? 'grid' : 'none';
            if (lightboxNext) lightboxNext.style.display = hasMultiple ? 'grid' : 'none';
            if (lightboxCounter) {
                if (hasMultiple) {
                    const pLabel = currentPerspectives[currentSlide] || `Vista ${currentSlide + 1}`;
                    lightboxCounter.textContent = `${pLabel} · ${currentSlide + 1} / ${imgList.length}`;
                    lightboxCounter.style.display = 'block';
                } else {
                    lightboxCounter.style.display = 'none';
                }
            }
        } else if (lightboxMode === 'catalog') {
            if (catalogLightboxImages[catalogSlideIndex]) {
                lightboxImg.src = catalogLightboxImages[catalogSlideIndex];
                lightboxImg.alt = `Foto de producto ${catalogSlideIndex + 1}`;
            }
            const hasMultiple = catalogLightboxImages.length > 1;
            if (lightboxBottomControls) lightboxBottomControls.style.display = hasMultiple ? 'flex' : 'none';
            if (lightboxPrev) lightboxPrev.style.display = hasMultiple ? 'grid' : 'none';
            if (lightboxNext) lightboxNext.style.display = hasMultiple ? 'grid' : 'none';
            if (lightboxCounter) {
                if (hasMultiple) {
                    lightboxCounter.textContent = `${catalogSlideIndex + 1} / ${catalogLightboxImages.length}`;
                    lightboxCounter.style.display = 'block';
                } else {
                    lightboxCounter.style.display = 'none';
                }
            }
        }
        resetZoom(false);
    }

    function openLightbox(slideIndex = 0) {
        lightboxMode = '3d';
        currentSlide = slideIndex;
        if (lightboxModal) {
            lightboxModal.classList.add('active');
            updateLightboxContent();
            document.body.style.overflow = 'hidden';
        }
    }

    function openCatalogLightbox(images, startIndex = 0) {
        if (!images || images.length === 0) return;
        lightboxMode = 'catalog';
        catalogLightboxImages = images;
        catalogSlideIndex = startIndex;
        if (lightboxModal) {
            lightboxModal.classList.add('active');
            updateLightboxContent();
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            // Si el modal de detalles sigue abierto, mantener overflow hidden en body
            if (productModal && productModal.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            resetZoom(false);
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (lightboxMode === '3d') {
                const imgList = getActiveImages();
                currentSlide = (currentSlide > 0) ? currentSlide - 1 : imgList.length - 1;
                updateCarousel();
            } else if (lightboxMode === 'catalog') {
                catalogSlideIndex = (catalogSlideIndex > 0) ? catalogSlideIndex - 1 : catalogLightboxImages.length - 1;
                updateLightboxContent();
            }
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (lightboxMode === '3d') {
                const imgList = getActiveImages();
                currentSlide = (currentSlide < imgList.length - 1) ? currentSlide + 1 : 0;
                updateCarousel();
            } else if (lightboxMode === 'catalog') {
                catalogSlideIndex = (catalogSlideIndex < catalogLightboxImages.length - 1) ? catalogSlideIndex + 1 : 0;
                updateLightboxContent();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightboxModal && lightboxModal.classList.contains('active')) {
                closeLightbox();
                return;
            }
            if (productModal && productModal.classList.contains('active')) {
                closeProductDetailsModal();
                return;
            }
        }
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') {
            if (lightboxMode === '3d') {
                const imgList = getActiveImages();
                currentSlide = (currentSlide > 0) ? currentSlide - 1 : imgList.length - 1;
                updateCarousel();
            } else {
                catalogSlideIndex = (catalogSlideIndex > 0) ? catalogSlideIndex - 1 : catalogLightboxImages.length - 1;
                updateLightboxContent();
            }
        }
        if (e.key === 'ArrowRight') {
            if (lightboxMode === '3d') {
                const imgList = getActiveImages();
                currentSlide = (currentSlide < imgList.length - 1) ? currentSlide + 1 : 0;
                updateCarousel();
            } else {
                catalogSlideIndex = (catalogSlideIndex < catalogLightboxImages.length - 1) ? catalogSlideIndex + 1 : 0;
                updateLightboxContent();
            }
        }
        if (e.key === '+' || e.key === '=') setZoom(zoomLevel + 0.25, null, null, true);
        if (e.key === '-') setZoom(zoomLevel - 0.25, null, null, true);
        if (e.key === '0') resetZoom(true);
    });

    if (lightboxViewport) {
        // Doble click en PC (zoom centrado en el puntero)
        lightboxViewport.addEventListener('dblclick', (e) => {
            e.preventDefault();
            if (zoomLevel > 1.2) {
                resetZoom(true);
            } else {
                setZoom(2.5, e.clientX, e.clientY, true);
            }
        });

        // Rueda de rat?n en PC
        lightboxViewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = (e.deltaY < 0) ? 0.25 : -0.25;
            setZoom(zoomLevel + delta, e.clientX, e.clientY, false);
        }, { passive: false });

        // Arrastre con rat?n en PC
        lightboxViewport.addEventListener('mousedown', (e) => {
            if (e.target === lightboxPrev || e.target === lightboxNext || e.target.closest('.lightbox-nav-btn')) return;
            if (zoomLevel > 1.02) {
                isDragging = true;
                startX = e.clientX - panX;
                startY = e.clientY - panY;
                applyZoomTransform(false);
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            clampPan();
            applyZoomTransform(false);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // ??? T?CTIL M?VIL AVANZADO (Pinch Zoom + Arrastre + Doble Toque Preciso) ???
        let touchDistStart = 0;
        let initialZoom = 1;
        let lastTouchX = 0;
        let lastTouchY = 0;
        let lastTapTime = 0;
        let lastTapX = 0;
        let lastTapY = 0;
        let isPinching = false;

        lightboxViewport.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault(); // Impide el zoom nativo del navegador sobre la p?gina
                isPinching = true;
                isDragging = false;
                touchDistStart = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                initialZoom = zoomLevel;
                applyZoomTransform(false);
            } else if (e.touches.length === 1) {
                isPinching = false;
                isDragging = (zoomLevel > 1.02);
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                applyZoomTransform(false);
            }
        }, { passive: false });

        lightboxViewport.addEventListener('touchmove', (e) => {
            // Detener el scroll y el zoom de la p?gina entera en todo momento
            e.preventDefault();

            if (e.touches.length === 2 && touchDistStart > 0) {
                const currentDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                if (touchDistStart > 0) {
                    const factor = currentDist / touchDistStart;
                    const targetZoom = initialZoom * factor;
                    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                    setZoom(targetZoom, midX, midY, false);
                }
            } else if (e.touches.length === 1 && isDragging && zoomLevel > 1.02) {
                const deltaX = e.touches[0].clientX - lastTouchX;
                const deltaY = e.touches[0].clientY - lastTouchY;
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                
                panX += deltaX;
                panY += deltaY;
                clampPan();
                applyZoomTransform(false);
            }
        }, { passive: false });

        lightboxViewport.addEventListener('touchend', (e) => {
            if (e.touches.length === 0) {
                isPinching = false;
                isDragging = false;
                
                // Detecci?n de doble toque (Double-Tap) nativo t?ctil
                if (e.changedTouches.length === 1) {
                    const touch = e.changedTouches[0];
                    const now = Date.now();
                    const timeDiff = now - lastTapTime;
                    const dist = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY);
                    
                    if (timeDiff > 0 && timeDiff < 320 && dist < 30) {
                        e.preventDefault();
                        if (zoomLevel > 1.2) {
                            resetZoom(true);
                        } else {
                            // Hace zoom exactamente al punto donde el usuario ha tocado la pantalla
                            setZoom(2.5, touch.clientX, touch.clientY, true);
                        }
                        lastTapTime = 0;
                    } else {
                        lastTapTime = now;
                        lastTapX = touch.clientX;
                        lastTapY = touch.clientY;
                    }
                }
            } else if (e.touches.length === 1) {
                isPinching = false;
                isDragging = (zoomLevel > 1.02);
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
            }
        });
    }

    // ─── GENERATE BUTTON CLICK (CON INTEGRACIÓN DE TOASTS & OPTIMIZACIÓN) ───
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const type = productSelect ? productSelect.value : 'corazon';
            const name1El = document.getElementById('name1');
            const name2El = document.getElementById('name2');
            const fechaEl = document.getElementById('fecha');
            const cruzEl = document.getElementById('checkCruz');
            

            const addCardEl = document.getElementById('addCard');
            const cardTitleEl = document.getElementById('cardTitle');
            const cardMessageEl = document.getElementById('cardMessage');

            const name1 = name1El ? name1El.value.trim() : '';
            const name2 = name2El ? name2El.value.trim() : '';
            const fecha = fechaEl ? fechaEl.value.trim() : '';
            const cruz = cruzEl ? cruzEl.checked : false;
            
            const tarjeta = (type !== 'individual') && (addCardEl ? addCardEl.checked : false);
            const tarjeta_titulo = tarjeta ? (cardTitleEl ? cardTitleEl.value.trim() : '') : '';
            const tarjeta_mensaje = tarjeta ? (cardMessageEl ? cardMessageEl.value.trim() : '') : '';

            if ((type === 'corazon' || type === 'iniciales') && (!name1 || !name2)) {
                Toast.warning('Por favor, introduce los dos nombres o iniciales para formar el corazón.', 'Datos incompletos');
                if (!name1 && name1El) name1El.focus();
                else if (!name2 && name2El) name2El.focus();
                return;
            } else if (type === 'individual' && !name1) {
                Toast.warning('Por favor, introduce el nombre para el llavero.', 'Nombre requerido');
                if (name1El) name1El.focus();
                return;
            }

            if (type === 'corazon' || type === 'iniciales') {
                if (!tarjeta_titulo) {
                    Toast.warning('Por favor, escribe un título para la tarjeta (ej: Para nosotros, Feliz Aniversario...). ¡Es el toque especial!', 'Título requerido');
                    if (cardTitleEl) cardTitleEl.focus();
                    return;
                }
                if (!tarjeta_mensaje) {
                    Toast.warning('Por favor, escribe una bonita dedicatoria para la tarjeta.', 'Mensaje requerido');
                    if (cardMessageEl) cardMessageEl.focus();
                    return;
                }
            }

            const deliverySelectEl = document.getElementById('deliverySelect');
            const isEnvio = deliverySelectEl ? (deliverySelectEl.value === 'envio') : false;
            if (isEnvio) {
                const shipNameEl = document.getElementById('shipName');
                const shipAddressEl = document.getElementById('shipAddress');
                const shipCPEl = document.getElementById('shipCP');
                const shipPhoneEl = document.getElementById('shipPhone');
                const shipEmailEl = document.getElementById('shipEmail');

                const shipName = shipNameEl ? shipNameEl.value.trim() : '';
                const shipAddress = shipAddressEl ? shipAddressEl.value.trim() : '';
                const shipCP = shipCPEl ? shipCPEl.value.trim() : '';
                const shipPhone = shipPhoneEl ? shipPhoneEl.value.trim() : '';
                const shipEmail = shipEmailEl ? shipEmailEl.value.trim() : '';

                if (!shipName) {
                    Toast.warning('Por favor, indica tu nombre completo para el envío a domicilio.', 'Nombre requerido');
                    if (shipNameEl) shipNameEl.focus();
                    return;
                }

                if (!shipAddress) {
                    Toast.warning('Por favor, indica tu dirección completa (calle, número, piso...) para el envío.', 'Dirección requerida');
                    if (shipAddressEl) shipAddressEl.focus();
                    return;
                }

                const cpResult = detectPostalCodeLocality(shipCP);
                if (!cpResult.valid) {
                    Toast.warning('Por favor, introduce un código postal válido de España (5 dígitos).', 'Código postal inválido');
                    if (shipCPEl) shipCPEl.focus();
                    return;
                }

                const phoneValidation = validatePhoneNumber(shipPhone);
                if (!phoneValidation.valid) {
                    Toast.warning('Por favor, introduce un teléfono de contacto válido (9 dígitos o prefijo internacional).', 'Teléfono inválido');
                    if (shipPhoneEl) shipPhoneEl.focus();
                    return;
                }

                if (!shipEmail) {
                    Toast.warning('Por favor, introduce tu correo electrónico de contacto.', 'Email requerido');
                    if (shipEmailEl) shipEmailEl.focus();
                    return;
                }

                const emailValidation = checkEmailValidation(shipEmail);
                if (emailValidation.hasTypo) {
                    Toast.warning(`Parece que hay un error en tu correo (${shipEmail}). Haz clic en "Corregir" o revísalo.`, 'Email con errata');
                    if (shipEmailEl) shipEmailEl.focus();
                    return;
                }

                if (!emailValidation.valid) {
                    Toast.warning('Por favor, introduce un correo electrónico con formato válido (ej: tu_nombre@gmail.com).', 'Email no válido');
                    if (shipEmailEl) shipEmailEl.focus();
                    return;
                }
            }

            const configPlaceholder = document.getElementById('configPlaceholderContainer');

            if (viewerInitial) viewerInitial.classList.remove('active');
            if (viewerResults) viewerResults.classList.remove('active');
            if (viewerLoading) viewerLoading.classList.add('active');
            generateBtn.disabled = true;

            const loadingPercent = document.getElementById('loadingPercent');
            const loadingProgressBar = document.getElementById('loadingProgressBar');
            const progressTrack = document.querySelector('.progress-bar-track');
            const loadingStatusDesc = document.getElementById('loadingStatusDesc');
            const loadingStatusTitle = document.getElementById('loadingStatusTitle');
            const loadingTimeText = document.getElementById('loadingTimeText');

            const productInfo = PRODUCT_CATALOG[type] || PRODUCT_CATALOG.corazon;

            let currentProgress = 8;
            const startTime = Date.now();

            if (loadingStatusTitle) loadingStatusTitle.textContent = `Generando ${productInfo.name}...`;
            if (loadingProgressBar) loadingProgressBar.style.width = '8%';
            if (progressTrack) progressTrack.setAttribute('aria-valuenow', '8');
            if (loadingPercent) loadingPercent.textContent = '8%';
            if (loadingStatusDesc) loadingStatusDesc.textContent = `📐 Preparando generación de ${productInfo.shortName}...`;
            
            let sseStarted = false;
            // Optimización de intervalo a 500ms para menor consumo de CPU en móviles
            const timeTrackerInterval = setInterval(() => {
                const elapsedSec = (Date.now() - startTime) / 1000;
                
                if (!sseStarted) {
                    if (elapsedSec > 3) {
                        currentProgress = Math.min(15, 8 + elapsedSec * 0.15);
                        if (loadingStatusDesc) loadingStatusDesc.textContent = '🌐 Despertando servidor en la nube tras reposo (~50s)... ¡Ya casi está!';
                        if (loadingPercent) loadingPercent.textContent = `${Math.round(currentProgress)}%`;
                        if (loadingProgressBar) loadingProgressBar.style.width = `${currentProgress}%`;
                        if (progressTrack) progressTrack.setAttribute('aria-valuenow', Math.round(currentProgress).toString());
                    }
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(0)}s transcurridos — Conectando...`;
                } else {
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(1)}s transcurridos`;
                }
            }, 500);

            try {
                const API_URL = 'https://latens-studio-web-backend.onrender.com/api/preview';
                const payload = { type, name1, name2, fecha, cruz, tarjeta, tarjeta_titulo, tarjeta_mensaje };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({ detail: 'Error en el servidor de renderizado 3D' }));
                    throw new Error(errData.detail || 'Error al conectar con el servidor 3D');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let buffer = '';
                let sseError = null;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        // Flush obligatorio de buffer para no perder el último chunk
                        buffer += decoder.decode();
                    } else {
                        sseStarted = true;
                        buffer += decoder.decode(value, { stream: true });
                    }

                    const lines = buffer.split('\n');
                    buffer = lines.pop(); // Mantener fragmento incompleto

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.slice(6).trim();
                            if (!dataStr) continue;
                            
                            try {
                                const data = JSON.parse(dataStr);
                                
                                if (data.type === 'progress') {
                                    currentProgress = (typeof data.progress === 'number') ? data.progress : currentProgress;
                                    if (loadingPercent) loadingPercent.textContent = `${Math.round(currentProgress)}%`;
                                    if (loadingProgressBar) loadingProgressBar.style.width = `${currentProgress}%`;
                                    if (progressTrack) progressTrack.setAttribute('aria-valuenow', Math.round(currentProgress).toString());
                                    if (data.message && loadingStatusDesc) loadingStatusDesc.textContent = data.message;
                                    
                                } else if (data.type === 'done') {
                                    currentApiData = data.result;
                                } else if (data.type === 'error') {
                                    sseError = new Error(data.detail || 'Error durante la generación del modelo');
                                }
                            } catch (parseErr) {
                                console.warn('SSE parse warning:', parseErr.message, dataStr.substring(0, 100));
                            }
                        }
                    }

                    if (done) break;
                }

                if (sseError) throw sseError;

                if (!currentApiData) {
                    throw new Error("No se recibieron resultados válidos del servidor.");
                }

                clearInterval(timeTrackerInterval);
                if (loadingProgressBar) loadingProgressBar.style.width = '100%';
                if (progressTrack) progressTrack.setAttribute('aria-valuenow', '100');
                if (loadingPercent) loadingPercent.textContent = '100%';
                if (loadingStatusDesc) loadingStatusDesc.textContent = `✨ ¡${productInfo.name} generado con éxito!`;
                if (loadingStatusTitle) loadingStatusTitle.textContent = '¡Completado!';
                await new Promise(r => setTimeout(r, 350));

                activeMode = 'juntos';
                setActiveModeBtn('juntos');

                if (type === 'individual') {
                    if (modeJuntosBtn) modeJuntosBtn.style.display = 'none';
                    if (modeSeparadosBtn) modeSeparadosBtn.style.display = 'none';
                } else {
                    if (modeJuntosBtn) modeJuntosBtn.style.display = 'inline-block';
                    if (modeSeparadosBtn) modeSeparadosBtn.style.display = 'inline-block';
                }
                
                if (modeTarjetaBtn) {
                    modeTarjetaBtn.style.display = (currentApiData.images_tarjeta && currentApiData.images_tarjeta.length > 0) ? 'inline-block' : 'none';
                }

                currentSlide = 0;
                renderCarouselImages();

                const dimContent = document.getElementById('dimensionsContent');
                if (dimContent && currentApiData.dimensions) {
                    dimContent.innerHTML = '';
                    currentApiData.dimensions.forEach(dim => {
                        dimContent.innerHTML += `
                            <div class="dim-row">
                                <span class="dim-name">Pieza (${dim.label}):</span>
                                <span class="dim-value">${dim.w.toFixed(1)} x ${dim.d.toFixed(1)} x ${dim.h.toFixed(1)} mm</span>
                            </div>
                        `;
                    });
                }

                // Actualizar tarjeta de resumen de pedido
                updateOrderSummaryCard();

                if (viewerLoading) viewerLoading.classList.remove('active');
                if (viewerResults) viewerResults.classList.add('active');
                if (configPlaceholder) configPlaceholder.style.display = 'none';

                Toast.success(`¡Muestra 3D de ${productInfo.shortName} generada con éxito!`);

            } catch (error) {
                Toast.error(error.message || 'Error al conectar con el servidor 3D. Por favor, inténtalo de nuevo.', 'Error de generación');
                if (viewerLoading) viewerLoading.classList.remove('active');
                if (viewerInitial) viewerInitial.classList.add('active');
                if (configPlaceholder) configPlaceholder.style.display = 'flex';
            } finally {
                clearInterval(timeTrackerInterval);
                generateBtn.disabled = false;
            }
        });
    }

    // ─── FAQ ACCORDION (CON ACCESIBILIDAD ARIA) ───
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((btn, idx) => {
        const item = btn.parentElement;
        const answer = item ? item.querySelector('.faq-answer') : null;
        const ansId = `faq-ans-${idx + 1}`;

        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', ansId);
        if (answer) {
            answer.setAttribute('id', ansId);
            answer.setAttribute('role', 'region');
        }

        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                const b = i.querySelector('.faq-question');
                if (b) b.setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ─── FORMULARIO DE CONTACTO & ENCARGOS ───
    const contactForm = document.getElementById('contactForm');
    const fileInput = document.getElementById('attachment');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const formResult = document.getElementById('formResult');
    const fileLabel = document.querySelector('.file-label');

    const messageTextarea = document.getElementById('contactMessage');
    const contactMsgCounter = document.getElementById('contactMessageCounter');
    const formSubject = document.getElementById('formSubject');

    if (formSubject && messageTextarea) {
        formSubject.addEventListener('change', () => {
            if (formSubject.value === 'feedback') {
                messageTextarea.placeholder = "¿Qué crees que podría mejorar en la web o en los productos? Te leo con atención...";
            } else {
                messageTextarea.placeholder = "Explícame tu idea, detalles del llavero o comenta el archivo que adjuntas...";
            }
        });
    }

    if (messageTextarea) {
        function updateTextareaUX() {
            messageTextarea.style.height = 'auto';
            const newHeight = Math.max(95, messageTextarea.scrollHeight);
            messageTextarea.style.height = newHeight + 'px';
            messageTextarea.style.overflowY = (newHeight > 300) ? 'auto' : 'hidden';

            if (contactMsgCounter) {
                contactMsgCounter.textContent = `${messageTextarea.value.length}/500`;
            }
        }
        messageTextarea.addEventListener('input', updateTextareaUX);
        window.addEventListener('resize', updateTextareaUX);
    }

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'Adjuntar archivo 3D o foto (Opcional)';
            if (fileNameDisplay) fileNameDisplay.textContent = fileName;
            if (fileLabel) {
                fileLabel.classList.toggle('has-file', !!e.target.files[0]);
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const emailInput = document.getElementById('contactEmail');
            const emailVal = emailInput ? emailInput.value.trim().toLowerCase() : '';
            const hpInput = contactForm.querySelector('input[name="website_hp"]');

            if (formResult) {
                formResult.textContent = '';
                formResult.className = 'form-result';
            }

            if (hpInput && hpInput.value) {
                console.warn('Bot submission blocked');
                return;
            }

            const emailCheck = checkEmailValidation(emailVal);
            if (!emailCheck.valid || emailCheck.hasTypo) {
                if (emailCheck.hasTypo && emailCheck.suggested) {
                    const errText = '⚠️ El correo parece contener una errata tipográfica. ¿Quisiste decir <strong>' + emailCheck.suggested + '</strong>?';
                    formResult.innerHTML = errText;
                    formResult.className = 'form-result error';
                    renderEmailSuggestion('contactEmail', 'contactEmailSuggestion', emailCheck);
                    Toast.warning('¿Quisiste decir ' + emailCheck.suggested + '?');
                } else {
                    const errText = '❌ Por favor, introduce un correo electrónico válido (ej: tu_nombre@gmail.com).';
                    formResult.textContent = errText;
                    formResult.className = 'form-result error';
                    Toast.warning('El correo introducido no tiene un formato válido.');
                }
                if (emailInput) emailInput.focus();
                return;
            }

            formResult.textContent = 'Enviando...';
            formResult.className = 'form-result loading';
            if (submitBtn) submitBtn.disabled = true;

            const sendStartTime = Date.now();
            const sendTimerInterval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - sendStartTime) / 1000);
                if (elapsed < 3) {
                    formResult.textContent = 'Enviando...';
                } else if (elapsed < 12) {
                    formResult.textContent = `⏳ Conectando con el servidor (${elapsed}s)...`;
                } else {
                    formResult.textContent = `🌐 Despertando servidor en la nube (${elapsed}s / ~50s si estaba en reposo)...`;
                }
            }, 1000);

            // Preparar FormData directamente con los datos limpios del formulario
            const formData = new FormData(contactForm);
            const userRawMessage = (formData.get('message') || '').toString().trim();
            formData.set('message', userRawMessage);

            try {
                const response = await fetch('https://latens-studio-web-backend.onrender.com/api/contact', {
                    method: 'POST',
                    body: formData
                });

                // Parseo seguro de respuesta para evitar SyntaxError en errores no JSON (ej: 502/504)
                let json = null;
                try {
                    json = await response.json();
                } catch (jsonErr) {
                    console.warn('Respuesta no JSON del servidor:', jsonErr);
                }
                
                clearInterval(sendTimerInterval);

                if (response.ok && response.status === 200) {
                    formResult.innerHTML = '✅ <strong>¡Mensaje entregado con éxito!</strong><br>He recibido tu solicitud y te contestaré lo antes posible a <strong>' + emailVal + '</strong>.';
                    formResult.className = 'form-result success';
                    contactForm.reset();
                    
                    if (messageTextarea) {
                        messageTextarea.style.height = 'auto';
                        if (contactMsgCounter) contactMsgCounter.textContent = '0/500';
                    }
                    if (fileNameDisplay) fileNameDisplay.textContent = 'Adjuntar archivo 3D o foto (Opcional)';
                    if (fileLabel) fileLabel.classList.remove('has-file');
                    
                    Toast.success('¡Mensaje enviado con éxito! Te contactaremos pronto.');

                    setTimeout(() => {
                        if (formResult) {
                            formResult.textContent = '';
                            formResult.className = 'form-result';
                        }
                    }, 6000);
                } else {
                    console.error('Error en respuesta de formulario:', response);
                    const errorDetail = (json && json.detail) ? json.detail : `Error en el servidor (${response.status || 'desconocido'}). Por favor, reintenta en unos momentos.`;
                    formResult.textContent = errorDetail;
                    formResult.className = 'form-result error';
                    Toast.error(errorDetail, 'Error al enviar');
                }
            } catch (error) {
                clearInterval(sendTimerInterval);
                console.error(error);
                formResult.textContent = 'Error de conexión. Si el servidor está arrancando, por favor reintenta en unos segundos.';
                formResult.className = 'form-result error';
                Toast.error('No se pudo conectar con el servidor. Revisa tu conexión o reintenta.', 'Error de red');
            } finally {
                clearInterval(sendTimerInterval);
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // ─── CARD MINI-GALLERY SLIDER CONTROLLER ───
    const galleryBoxes = document.querySelectorAll('.product-preview-box.has-gallery');
    galleryBoxes.forEach(box => {
        const slides = box.querySelectorAll('.gallery-slide');
        const dots = box.querySelectorAll('.gallery-dot');
        const gPrevBtn = box.querySelector('.gallery-prev');
        const gNextBtn = box.querySelector('.gallery-next');
        let currentIdx = 0;

        function showSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentIdx = index;
            slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
        }

        let lastBoxSwipeTime = 0;

        if (gPrevBtn) {
            gPrevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentIdx - 1);
            });
        }

        if (gNextBtn) {
            gNextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentIdx + 1);
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(idx);
            });
        });

        let touchStartX = 0;
        let touchStartY = 0;
        box.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        box.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                lastBoxSwipeTime = Date.now();
                if (diffX > 0) showSlide(currentIdx - 1);
                else showSlide(currentIdx + 1);
            }
        }, { passive: true });
    });

    // ─── CONTROLADOR DEL MODAL DE DETALLES DE PRODUCTO (ESTILO AMAZON - R3) ───
    const productModal = document.getElementById('productDetailsModal');
    const productModalBackdrop = document.getElementById('productModalBackdrop');
    const productModalClose = document.getElementById('productModalClose');
    const modalMainImageWrap = document.getElementById('modalMainImageWrap');
    const modalProductImg = document.getElementById('modalProductImg');
    const modalProductBadge = document.getElementById('modalProductBadge');
    const modalThumbnailsTrack = document.getElementById('modalThumbnailsTrack');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductQualifier = document.getElementById('modalProductQualifier');
    const modalProductDesc = document.getElementById('modalProductDesc');
    const modalSpecsList = document.getElementById('modalSpecsList');
    const modalInstagramCta = document.getElementById('modalInstagramCta');
    const modalPreviewActionBtn = document.getElementById('modalPreviewActionBtn');
    // Listener para desplegable de especificaciones en el modal
    const modalSpecsToggleBtn = document.getElementById('modalSpecsToggle');
    const modalSpecsAccordionEl = document.getElementById('modalSpecsAccordion');
    if (modalSpecsToggleBtn && modalSpecsAccordionEl) {
        modalSpecsToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = modalSpecsAccordionEl.classList.toggle('open');
            modalSpecsToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    let lastFocusedElementBeforeModal = null;
    let activeModalImageIdx = 0;

    function openProductDetailsModal(productId) {
        const product = PRODUCT_CATALOG[productId];
        if (!product || !productModal) return;

        lastFocusedElementBeforeModal = document.activeElement;
        activeModalImageIdx = 0;

        // 1. Inyectar Textos y Metadatos
        if (modalProductTitle) modalProductTitle.textContent = product.name;
        if (modalProductBadge) modalProductBadge.textContent = product.badge || 'Catálogo Oficial';
        if (modalProductPrice) modalProductPrice.textContent = product.price;
        if (modalProductQualifier) modalProductQualifier.textContent = product.priceQualifier || '';
        if (modalProductDesc) modalProductDesc.textContent = product.desc;

        // 2. Inyectar Especificaciones en Acordeón Desplegable (bajo la galería)
        const modalSpecsList = document.getElementById('modalSpecsList');
        const modalSpecsAccordion = document.getElementById('modalSpecsAccordion');
        const modalSpecsToggle = document.getElementById('modalSpecsToggle');

        if (modalSpecsList) {
            const specsHtml = (product.specs || []).map(spec => `<li><span>${spec}</span></li>`).join('');
            const careHtml = product.careNote ? `<li class="spec-care-note"><span><strong>Recomendación de cuidado:</strong> ${product.careNote}</span></li>` : '';
            modalSpecsList.innerHTML = specsHtml + careHtml;
        }

        // Resetear acordeón cerrado al abrir
        if (modalSpecsAccordion) modalSpecsAccordion.classList.remove('open');
        if (modalSpecsToggle) modalSpecsToggle.setAttribute('aria-expanded', 'false');

        // 3. Configurar Galería y Miniaturas Interactivas
        if (modalProductImg && product.images && product.images.length > 0) {
            modalProductImg.src = product.images[0];
            modalProductImg.alt = product.name;
        }

        function setModalImage(idx) {
            if (!product.images || !product.images[idx]) return;
            activeModalImageIdx = idx;
            if (modalProductImg) {
                modalProductImg.src = product.images[idx];
            }
            if (modalThumbnailsTrack) {
                const thumbBtns = modalThumbnailsTrack.querySelectorAll('.modal-thumb-btn');
                thumbBtns.forEach(b => {
                    const bIdx = parseInt(b.getAttribute('data-index'), 10);
                    const isActive = (bIdx === idx);
                    b.classList.toggle('active', isActive);
                    if (isActive) {
                        b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                });
            }
        }

        if (modalMainImageWrap) {
            let touchStartX = 0;
            let touchStartY = 0;
            let touchMoved = false;

            modalMainImageWrap.ontouchstart = (e) => {
                if (e.touches && e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    touchMoved = false;
                }
            };

            modalMainImageWrap.ontouchend = (e) => {
                if (e.changedTouches && e.changedTouches.length === 1) {
                    const diffX = e.changedTouches[0].clientX - touchStartX;
                    const diffY = e.changedTouches[0].clientY - touchStartY;
                    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                        touchMoved = true;
                        if (diffX < 0) {
                            // Swipe izquierda -> siguiente
                            const nextIdx = (activeModalImageIdx + 1) % product.images.length;
                            setModalImage(nextIdx);
                        } else {
                            // Swipe derecha -> anterior
                            const prevIdx = (activeModalImageIdx - 1 + product.images.length) % product.images.length;
                            setModalImage(prevIdx);
                        }
                    }
                }
            };

            modalMainImageWrap.onclick = () => {
                if (touchMoved) {
                    touchMoved = false;
                    return;
                }
                if (product.images && product.images.length > 0) {
                    openCatalogLightbox(product.images, activeModalImageIdx);
                }
            };
        }

        if (modalThumbnailsTrack) {
            if (product.images && product.images.length > 1) {
                modalThumbnailsTrack.style.display = 'flex';
                modalThumbnailsTrack.innerHTML = product.images.map((imgSrc, idx) => `
                    <button type="button" class="modal-thumb-btn ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Ver imagen ${idx + 1} de ${product.name}">
                        <img src="${imgSrc}" alt="${product.name} miniatura ${idx + 1}" loading="lazy">
                    </button>
                `).join('');

                const thumbBtns = modalThumbnailsTrack.querySelectorAll('.modal-thumb-btn');
                thumbBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const idx = parseInt(btn.getAttribute('data-index'), 10);
                        setModalImage(idx);
                    });
                });
            } else {
                modalThumbnailsTrack.style.display = 'none';
                modalThumbnailsTrack.innerHTML = '';
            }
        }

        // 4. Configurar Enlace Directo CTA a Instagram
        if (modalInstagramCta) {
            modalInstagramCta.href = 'https://www.instagram.com/latens.studio?igsh=ZmIwaXVvYmJta2lt';
            modalInstagramCta.onclick = () => {
                Toast.info('Abriendo Instagram (@latens.studio). ¡Escríbenos por MD para encargar tu ' + product.shortName + '!', 'Instagram DM');
            };
        }

        // 5. Configurar Botón Secundario de Previsualización 3D
        if (modalPreviewActionBtn) {
            modalPreviewActionBtn.onclick = () => {
                closeProductDetailsModal();
                const pSelect = document.getElementById('productSelect');
                if (pSelect) {
                    pSelect.value = productId;
                    renderDynamicInputs();
                    switchTab('tab-preview');
                    updateOrderSummaryCard();
                    const previewTab = document.getElementById('tab-preview');
                    if (previewTab) previewTab.scrollIntoView({ behavior: 'smooth' });
                }
            };
        }

        // 6. Activar Modal y Bloquear Scroll del Fondo
        productModal.classList.add('active');
        productModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (productModalClose) productModalClose.focus();
    }

    function closeProductDetailsModal() {
        if (!productModal || !productModal.classList.contains('active')) return;
        productModal.classList.remove('active');
        productModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (lastFocusedElementBeforeModal && typeof lastFocusedElementBeforeModal.focus === 'function') {
            lastFocusedElementBeforeModal.focus();
        }
    }

    if (productModalClose) productModalClose.addEventListener('click', closeProductDetailsModal);
    if (productModalBackdrop) productModalBackdrop.addEventListener('click', closeProductDetailsModal);

    // Conectar botones "Ver más detalles" de las tarjetas del catálogo
    document.querySelectorAll('.btn-view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const prodId = btn.getAttribute('data-product') || btn.getAttribute('data-product-id');
            if (prodId) openProductDetailsModal(prodId);
        });
    });

}); // ─── FIN de DOMContentLoaded ───

    // ==========================================
    // GOATCOUNTER EVENTOS PERSONALIZADOS (CON BUFFER ANTIPÉRDIDAS)
    // ==========================================
    const gcQueue = [];
    function flushGcQueue() {
        if (window.goatcounter && typeof window.goatcounter.count === 'function') {
            while (gcQueue.length > 0) {
                const item = gcQueue.shift();
                window.goatcounter.count(item);
            }
        }
    }

    // Intervalo de reintento automático por si count.js tarda en cargar
    const gcCheckInterval = setInterval(() => {
        if (window.goatcounter && typeof window.goatcounter.count === 'function') {
            flushGcQueue();
            if (gcQueue.length === 0) clearInterval(gcCheckInterval);
        }
    }, 300);

    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-gc-event]');
        if (target) {
            let eventName = target.getAttribute('data-gc-event');
            let product = target.getAttribute('data-product');
            
            // Inteligencia: detectar producto activo en el Visor 3D
            if (['Generar_3D', 'Pedir_IG_Visor', 'Copiar_Texto_IG'].includes(eventName)) {
                const pSelect = document.getElementById('productSelect');
                if (pSelect) product = pSelect.value;
            }
            
            // Inteligencia: detectar producto activo en el Modal de Detalles
            if (['Pedir_IG_Detalles', 'Personalizar_Desde_Detalles'].includes(eventName)) {
                const title = document.getElementById('modalProductTitle');
                if (title && title.textContent) {
                    const t = title.textContent.toLowerCase();
                    if (t.includes('coraz')) product = 'corazon';
                    else if (t.includes('inicial')) product = 'iniciales';
                    else product = 'individual';
                }
            }

            if (product) {
                eventName += '_' + product.charAt(0).toUpperCase() + product.slice(1);
            }
            
            const eventPayload = {
                path: eventName,
                title: eventName.replace(/_/g, ' '),
                event: true
            };

            if (window.goatcounter && typeof window.goatcounter.count === 'function') {
                window.goatcounter.count(eventPayload);
            } else {
                // Si el script de GoatCounter aún no ha terminado de descargarse, encolar el evento
                gcQueue.push(eventPayload);
            }
        }
    });
