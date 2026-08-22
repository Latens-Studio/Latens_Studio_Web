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
                'llaverocompleto3.jpg',
                'llaverocompleto2.jpg',
                'llaverocompleto1.jpg',
                'imagen llaveros pareja ambos(tarjeta en caja).jpg'
            ],
            specs: [
                'Imanes de neodimio N52 de máxima atracción perfectamente integrados.',
                'Personalización de 2 nombres en relieve 3D de alta definición.',
                'Incluye tarjeta con título y dedicatoria personalizables + soporte expositor.',
                'Fabricado en PLA+ ecológico de máxima resistencia y ligereza.',
                'Incluye 2 anillas de acero reforzadas + Chapita de regalo gratis.',
                'Entrega física rápida en Alicante el mismo día o 24h.'
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
                'llavero3iniciales.jpg',
                'llavero2iniciales.jpg',
                'llavero1iniciales.jpg',
                'imagen llaveros pareja ambos(tarjeta en caja).jpg'
            ],
            specs: [
                'Imanes de neodimio N52 de máxima atracción perfectamente integrados.',
                '2 Iniciales personalizadas en 3D de alta definición.',
                'Cruz opcional según tu preferencia.',
                'Incluye tarjeta con título y dedicatoria personalizables + soporte expositor.',
                'Fabricado en PLA+ ecológico de máxima resistencia y ligereza.',
                'Incluye 2 anillas de acero reforzadas + Chapita de regalo gratis.',
                'Entrega física rápida en Alicante el mismo día o 24h.'
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
                'llaverocompleto1.jpg',
                'chapita.png',
                'LOGO LTSweb.png'
            ],
            specs: [
                '1 Nombre personalizado en relieve 3D de alto contraste.',
                'Tipografía a elección (cualquier fuente libre de derechos/uso comercial).',
                'Colores a elegir: Negro (PLA+), Blanco (PLA+), Rojo (PLA+), Azul, Rosa, Rosa Melocotón, Violeta Interestelar o Verde Primavera.',
                'Fabricado en PLA o PLA+ ecológico de máxima resistencia y ligereza.',
                'Incluye anilla de acero reforzada + Chapita de regalo gratis.',
                'Entrega física rápida en Alicante el mismo día o 24h.'
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
        const cardInputsGroup = document.getElementById('cardInputsGroup');
        const addCardContainer = addCardCb ? addCardCb.closest('.form-field') : null;
        
        if (addCardCb && addCardContainer && cardInputsGroup) {
            if (val === 'corazon' || val === 'iniciales') {
                addCardContainer.style.display = 'block';
                addCardCb.checked = true;
                addCardCb.disabled = true;
                cardInputsGroup.style.display = 'block';
            } else {
                addCardContainer.style.display = 'none';
                addCardCb.checked = false;
                cardInputsGroup.style.display = 'none';
            }
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

        let namesFormatted = (type === 'individual') ? (name1 || 'Sin nombre') : `${name1 || 'Nombre 1'} + ${name2 || 'Nombre 2'}`;
        
        return {
            type,
            productName: productInfo.name,
            price: productInfo.price,
            names: namesFormatted,
            fecha: fecha || 'No grabada',
            hasCard: !!addCard,
            cardTitle: addCard ? (cardTitleVal || 'Sin título') : null,
            cardMessage: addCard ? (cardMessageVal || 'Sin mensaje') : null
        };
    }

    function updateOrderSummaryCard() {
        const specs = generateOrderSpecs();
        const container = document.getElementById('summaryDetailsList');
        if (!container) return;

        container.innerHTML = `
            <div class="summary-item">
                <span class="summary-item-label">Modelo & Precio</span>
                <span class="summary-item-val">🏷️ ${specs.productName} <strong>(${specs.price})</strong></span>
            </div>
            <div class="summary-item">
                <span class="summary-item-label">Nombres / Iniciales</span>
                <span class="summary-item-val">✍️ ${specs.names}</span>
            </div>
            ${specs.fecha !== 'No grabada' ? `
            <div class="summary-item">
                <span class="summary-item-label">Fecha Reverso</span>
                <span class="summary-item-val">📅 ${specs.fecha}</span>
            </div>` : ''}
            ${specs.hasCard ? `
            <div class="summary-item">
                <span class="summary-item-label">Tarjeta 3D Regalo</span>
                <span class="summary-item-val">💌 "${specs.cardTitle}": ${specs.cardMessage}</span>
            </div>` : ''}
        `;
    }

    // Botón de Copiar Resumen para Instagram DM
    const btnCopySummary = document.getElementById('btnCopySummary');
    if (btnCopySummary) {
        btnCopySummary.addEventListener('click', async () => {
            const specs = generateOrderSpecs();
            
            let textToCopy = `✨ ¡Hola Latens Studio! 👋 Quiero encargar este llavero personalizado:\n\n` +
                `📋 Modelo: ${specs.productName} (${specs.price})\n` +
                `✍️ Nombres/Iniciales: ${specs.names}\n`;
            
            if (specs.fecha !== 'No grabada') {
                textToCopy += `📅 Fecha Reverso: ${specs.fecha}\n`;
            }
            if (specs.hasCard) {
                textToCopy += `💌 Tarjeta 3D Regalo: "${specs.cardTitle}" - ${specs.cardMessage}\n`;
            }
            
            textToCopy += `🎁 Incluye: Chapita de Regalo Gratis\n` +
                `🎨 Acabado: Base Negro Sombra / Letras Blanco Nieve (PLA+)\n\n` +
                `¿Podríais confirmarme disponibilidad y plazo de entrega? ¡Muchas gracias!`;

            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    const tempTa = document.createElement('textarea');
                    tempTa.value = textToCopy;
                    tempTa.style.position = 'fixed';
                    tempTa.style.left = '-9999px';
                    document.body.appendChild(tempTa);
                    tempTa.select();
                    document.execCommand('copy');
                    tempTa.remove();
                }

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

            } catch (err) {
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
                if (input1 && n1) input1.value = decodeURIComponent(n1);
                if (input2 && n2) input2.value = decodeURIComponent(n2);
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
            titleCounter.textContent = `${cardTitle.value.length}/10`;
            updateOrderSummaryCard();
        });
    }

    if (cardMessage && messageCounter) {
        cardMessage.addEventListener('input', () => {
            messageCounter.textContent = `${cardMessage.value.length}/81`;
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

    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    let lightboxMode = '3d';
    let catalogLightboxImages = [];
    let catalogSlideIndex = 0;

    function applyZoomTransform() {
        if (!lightboxImg) return;
        lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
    }

    function resetZoom() {
        zoomLevel = 1;
        panX = 0;
        panY = 0;
        applyZoomTransform();
    }

    function setZoom(newZoom) {
        zoomLevel = Math.max(0.8, Math.min(4.0, newZoom));
        if (zoomLevel <= 1.05) {
            panX = 0;
            panY = 0;
        }
        applyZoomTransform();
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
        resetZoom();
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
            resetZoom();
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
        if (e.key === '+' || e.key === '=') setZoom(zoomLevel + 0.25);
        if (e.key === '-') setZoom(zoomLevel - 0.25);
        if (e.key === '0') resetZoom();
    });

    if (lightboxViewport) {
        lightboxViewport.addEventListener('dblclick', (e) => {
            e.preventDefault();
            if (zoomLevel > 1.1) {
                resetZoom();
            } else {
                setZoom(2.2);
            }
        });

        lightboxViewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = (e.deltaY < 0) ? 0.2 : -0.2;
            setZoom(zoomLevel + delta);
        }, { passive: false });

        lightboxViewport.addEventListener('mousedown', (e) => {
            if (e.target === lightboxPrev || e.target === lightboxNext || e.target.closest('.lightbox-nav-btn')) return;
            if (zoomLevel > 1) {
                isDragging = true;
                startX = e.clientX - panX;
                startY = e.clientY - panY;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            applyZoomTransform();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        let touchDistStart = 0;
        let initialZoom = 1;
        let lastTouchX = 0;
        let lastTouchY = 0;

        lightboxViewport.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                touchDistStart = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                initialZoom = zoomLevel;
            } else if (e.touches.length === 1) {
                isDragging = true;
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
            }
        }, { passive: true });

        lightboxViewport.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && touchDistStart > 0) {
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const factor = dist / touchDistStart;
                setZoom(initialZoom * factor);
            } else if (e.touches.length === 1 && isDragging) {
                const deltaX = e.touches[0].clientX - lastTouchX;
                const deltaY = e.touches[0].clientY - lastTouchY;
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                
                if (zoomLevel > 1) {
                    panX += deltaX;
                    panY += deltaY;
                    applyZoomTransform();
                }
            }
        }, { passive: false });
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
            
            const tarjeta = addCardEl ? addCardEl.checked : false;
            const tarjeta_titulo = cardTitleEl ? cardTitleEl.value.trim() : '';
            const tarjeta_mensaje = cardMessageEl ? cardMessageEl.value.trim() : '';

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

                Toast.success(`¡Muestra 3D de ${productInfo.shortName} generada con éxito!`);

            } catch (error) {
                Toast.error(error.message || 'Error al conectar con el servidor 3D. Por favor, inténtalo de nuevo.', 'Error de generación');
                if (viewerLoading) viewerLoading.classList.remove('active');
                if (viewerInitial) viewerInitial.classList.add('active');
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

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(emailVal)) {
                const errText = '❌ Por favor, introduce un correo electrónico válido (ej: tu_nombre@gmail.com).';
                formResult.textContent = errText;
                formResult.className = 'form-result error';
                Toast.warning('El correo introducido no tiene un formato válido.');
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
                        if (messageCounter) messageCounter.textContent = '0/500';
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

        // 2. Inyectar Especificaciones Estilo Amazon (con aviso de cuidado al final sin tick)
        if (modalSpecsList) {
            const specsHtml = (product.specs || []).map(spec => `<li><span>${spec}</span></li>`).join('');
            const careHtml = product.careNote ? `<li class="spec-care-note"><span><strong>Recomendación de cuidado:</strong> ${product.careNote}</span></li>` : '';
            modalSpecsList.innerHTML = specsHtml + careHtml;
        }

        // 3. Configurar Galería y Miniaturas Interactivas
        if (modalProductImg && product.images && product.images.length > 0) {
            modalProductImg.src = product.images[0];
            modalProductImg.alt = product.name;
        }

        if (modalMainImageWrap) {
            modalMainImageWrap.onclick = () => {
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
                        activeModalImageIdx = idx;
                        if (modalProductImg && product.images[idx]) {
                            modalProductImg.src = product.images[idx];
                        }
                        thumbBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
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
    // GOATCOUNTER EVENTOS PERSONALIZADOS
    // ==========================================
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-gc-event]');
        if (target && window.goatcounter && window.goatcounter.count) {
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
            
            window.goatcounter.count({
                path: eventName,
                title: eventName.replace(/_/g, ' '),
                event: true
            });
        }
    });
