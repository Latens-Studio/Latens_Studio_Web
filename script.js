document.addEventListener('DOMContentLoaded', () => {
    // ─── TABS & DEEP LINKING URL ROUTER ───
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

        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        if (activeBtn) activeBtn.classList.add('active');
        activePane.classList.add('active');

        if (updateUrl && window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '#' + resolvedId);
        }

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

    function handleUrlRouting() {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;
        
        // 1. Prioridad: Parámetro ?tab= o ?seccion=
        const paramTab = urlParams.get('tab') || urlParams.get('seccion') || urlParams.get('pestaña');
        let targetTab = resolveTabId(paramTab);

        // 2. Comprobar Hash de la URL (#catalogo, #tab-preview, #faq, etc.)
        if (!targetTab && hash) {
            targetTab = resolveTabId(hash);
        }

        // 3. Comprobar si hay producto seleccionado por URL (?producto=iniciales, ?producto=corazon, ?producto=individual)
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

        // 4. Parámetros opcionales de nombres (?nombre1=Ana&nombre2=Juan o ?n1=A&n2=J)
        const n1 = urlParams.get('nombre1') || urlParams.get('n1') || urlParams.get('nombre_izq');
        const n2 = urlParams.get('nombre2') || urlParams.get('n2') || urlParams.get('nombre_der');
        if (n1 || n2) {
            setTimeout(() => {
                const input1 = document.getElementById('name1');
                const input2 = document.getElementById('name2');
                if (input1 && n1) input1.value = decodeURIComponent(n1);
                if (input2 && n2) input2.value = decodeURIComponent(n2);
            }, 80);
            if (!targetTab) targetTab = 'tab-preview';
        }

        // Si se resolvió una pestaña específica, cambiar a ella
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

    // ─── GALLERY PREVIEW TRIGGERS ───
    const previewTriggers = document.querySelectorAll('.preview-trigger');
    const productSelect = document.getElementById('productSelect');

    previewTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const product = btn.getAttribute('data-product');
            if (productSelect) productSelect.value = product;
            renderDynamicInputs();
            switchTab('tab-preview');
        });
    });

    // ─── DYNAMIC INPUTS FOR PREVIEWER ───
    const dynamicInputsContainer = document.getElementById('dynamicInputs');
    
    function renderDynamicInputs() {
        if (!productSelect || !dynamicInputsContainer) return;
        const val = productSelect.value;
        let html = '';

        // Mostrar/ocultar opciones específicas de iniciales
        const opcionesIniciales = document.getElementById('opcionesIniciales');
        if (opcionesIniciales) {
            opcionesIniciales.style.display = (val === 'iniciales') ? 'block' : 'none';
        }

        // Mostrar/ocultar campo de fecha (solo para productos de pareja: corazon e iniciales)
        const fechaGroup = document.getElementById('fechaGroup');
        if (fechaGroup) {
            const productosSoportanFecha = ['corazon', 'iniciales'];
            fechaGroup.style.display = productosSoportanFecha.includes(val) ? 'block' : 'none';
        }

        if (val === 'individual') {
            html = `
                <div class="form-field">
                    <label for="name1">Nombre para el Llavero</label>
                    <input type="text" id="name1" placeholder="Ej: Carlos" maxlength="12" required>
                </div>
            `;
        } else {
            // Productos de pareja (2 inputs)
            const labelA = val === 'iniciales' ? 'Inicial Izquierda (A)' : 'Nombre Izquierda (Llavero A)';
            const labelB = val === 'iniciales' ? 'Inicial Derecha (B)' : 'Nombre Derecha (Llavero B)';
            const phA = val === 'iniciales' ? 'Ej: A' : 'Ej: Ana';
            const phB = val === 'iniciales' ? 'Ej: J' : 'Ej: Juan';
            const maxL = val === 'iniciales' ? '1' : '10';

            html = `
                <div class="form-field">
                    <label for="name1">${labelA}</label>
                    <input type="text" id="name1" placeholder="${phA}" maxlength="${maxL}" required>
                </div>
                <div class="form-field">
                    <label for="name2">${labelB}</label>
                    <input type="text" id="name2" placeholder="${phB}" maxlength="${maxL}" required>
                </div>
            `;
        }

        dynamicInputsContainer.innerHTML = html;
    }

    if (productSelect) {
        productSelect.addEventListener('change', renderDynamicInputs);
        renderDynamicInputs();
    }

    // Inicializar navegación por URL / Parámetros
    handleUrlRouting();

    // ─── API CALL & VIEWER STATE ───
    const generateBtn = document.getElementById('generateBtn');
    const viewerInitial = document.getElementById('viewerInitial');
    const viewerLoading = document.getElementById('viewerLoading');
    const viewerResults = document.getElementById('viewerResults');
    
    const carouselTrack = document.getElementById('carouselTrack');
    const perspectiveLabel = document.getElementById('perspectiveLabel');
    const perspectiveThumbs = document.querySelectorAll('.thumb-btn');
    
    const modeJuntosBtn = document.getElementById('modeJuntosBtn');
    const modeSeparadosBtn = document.getElementById('modeSeparadosBtn');
    const modeTarjetaBtn = document.getElementById('modeTarjetaBtn');

    let currentApiData = null;
    let activeMode = 'juntos'; // 'juntos' | 'separados' | 'tarjeta'
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
            
            // Open Lightbox on click
            slide.addEventListener('click', () => {
                openLightbox(index);
            });

            carouselTrack.appendChild(slide);

            // Generate thumbnail button
            if (thumbsContainer) {
                const thumbBtn = document.createElement('button');
                thumbBtn.className = 'thumb-btn';
                if (index === currentSlide) thumbBtn.classList.add('active');
                
                // Short names for thumbs
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

        // Ensure currentSlide is within bounds
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
            if (idx === currentSlide) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });

        // Show/hide social note removed per user request

        // Sync Lightbox if open
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            updateLightboxContent();
        }
    }

    // Mode switching (Juntos / Separados / Tarjeta)
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

    // Lógica para la UI de Tarjeta 3D
    const addCardCb = document.getElementById('addCard');
    const cardInputsGroup = document.getElementById('cardInputsGroup');
    const cardTitle = document.getElementById('cardTitle');
    const cardMessage = document.getElementById('cardMessage');
    const titleCounter = document.getElementById('titleCounter');
    const messageCounter = document.getElementById('messageCounter');

    if (addCardCb && cardInputsGroup) {
        addCardCb.addEventListener('change', () => {
            if (addCardCb.checked) {
                cardInputsGroup.style.display = 'block';
            } else {
                cardInputsGroup.style.display = 'none';
            }
        });
    }

    if (cardTitle && titleCounter) {
        cardTitle.addEventListener('input', () => {
            titleCounter.textContent = `${cardTitle.value.length}/10`;
        });
    }

    if (cardMessage && messageCounter) {
        cardMessage.addEventListener('input', () => {
            messageCounter.textContent = `${cardMessage.value.length}/81`;
        });
    }

    // Thumbnail navigation
    perspectiveThumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', () => {
            currentSlide = idx;
            updateCarousel();
        });
    });

    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const totalSlides = carouselTrack ? carouselTrack.children.length : 1;
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = totalSlides - 1;
            }
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalSlides = carouselTrack ? carouselTrack.children.length : 1;
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateCarousel();
        });
    }

    // ─── LIGHTBOX MODAL WITH ZOOM & PAN ───
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxViewport = document.getElementById('lightboxViewport');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const zoomResetBtn = document.getElementById('zoomResetBtn');
    const zoomLevelEl = document.getElementById('zoomLevel');

    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    function applyZoomTransform() {
        if (!lightboxImg) return;
        lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
        if (zoomLevelEl) zoomLevelEl.textContent = `${Math.round(zoomLevel * 100)}%`;
    }

    function resetZoom() {
        zoomLevel = 1;
        panX = 0;
        panY = 0;
        applyZoomTransform();
    }

    function setZoom(newZoom) {
        zoomLevel = Math.max(0.8, Math.min(4.0, newZoom));
        if (zoomLevel === 1) {
            panX = 0;
            panY = 0;
        }
        applyZoomTransform();
    }

    function openLightbox(index) {
        if (index !== undefined) currentSlide = index;
        resetZoom();
        updateLightboxContent();
        if (lightboxModal) lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightboxModal) lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    }

    function updateLightboxContent() {
        const imgList = getActiveImages();
        if (!imgList || !imgList[currentSlide]) return;

        let modeText = '';
        if (activeMode === 'tarjeta') {
            modeText = ' - [Tarjeta 3D]';
        } else if (productSelect && productSelect.value === 'individual') {
            modeText = ' - [Individual]';
        } else {
            modeText = activeMode === 'juntos' ? ' - [Juntos]' : ' - [Separados]';
        }
        const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
        if (lightboxTitle) lightboxTitle.textContent = `${currentPerspectives[currentSlide] || 'Perspectiva'}${modeText}`;
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : currentPerspectives.length - 1;
            resetZoom();
            updateCarousel();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
            currentSlide = (currentSlide < currentPerspectives.length - 1) ? currentSlide + 1 : 0;
            resetZoom();
            updateCarousel();
        });
    }

    if (zoomInBtn) zoomInBtn.addEventListener('click', () => setZoom(zoomLevel + 0.3));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setZoom(zoomLevel - 0.3));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

    // Mouse Wheel Zooming in Lightbox
    if (lightboxViewport) {
        lightboxViewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.2 : -0.2;
            setZoom(zoomLevel + delta);
        }, { passive: false });

        // Pan/Drag when zoomed
        lightboxViewport.addEventListener('mousedown', (e) => {
            if (zoomLevel > 1) {
                isDragging = true;
                startX = e.clientX - panX;
                startY = e.clientY - panY;
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging && zoomLevel > 1) {
                panX = e.clientX - startX;
                panY = e.clientY - startY;
                applyZoomTransform();
            }
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Keyboard support (Escape to close, Left/Right arrows to navigate)
    window.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : currentPerspectives.length - 1;
            resetZoom();
            updateCarousel();
        } else if (e.key === 'ArrowRight') {
            const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
            currentSlide = (currentSlide < currentPerspectives.length - 1) ? currentSlide + 1 : 0;
            resetZoom();
            updateCarousel();
        }
    });

    // Touch / Swipe support for Lightbox in mobile
    if (lightboxViewport) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        lightboxViewport.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        lightboxViewport.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            // Si hay zoom activo, no hacemos swipe para cambiar de foto (para permitir panning)
            if (zoomLevel > 1.05) return;
            
            const swipeThreshold = 50;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > swipeThreshold) {
                const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
                
                if (diff > 0) {
                    // Swipe right (Previous)
                    currentSlide = (currentSlide > 0) ? currentSlide - 1 : currentPerspectives.length - 1;
                } else {
                    // Swipe left (Next)
                    currentSlide = (currentSlide < currentPerspectives.length - 1) ? currentSlide + 1 : 0;
                }
                resetZoom();
                updateCarousel();
            }
        }
    }

    // ─── GENERATE BUTTON CLICK ───
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const type = productSelect ? productSelect.value : 'corazon';
            const name1El = document.getElementById('name1');
            const name2El = document.getElementById('name2');
            const fechaEl = document.getElementById('fecha');
            const cruzEl = document.getElementById('checkCruz');
            const relieveEl = document.getElementById('checkRelieve');

            const addCardEl = document.getElementById('addCard');
            const cardTitleEl = document.getElementById('cardTitle');
            const cardMessageEl = document.getElementById('cardMessage');

            const name1 = name1El ? name1El.value.trim() : '';
            const name2 = name2El ? name2El.value.trim() : '';
            const fecha = fechaEl ? fechaEl.value.trim() : '';
            const cruz = cruzEl ? cruzEl.checked : false;
            const relieve = relieveEl ? relieveEl.checked : true;
            const tarjeta = addCardEl ? addCardEl.checked : false;
            const tarjeta_titulo = cardTitleEl ? cardTitleEl.value.trim() : '';
            const tarjeta_mensaje = cardMessageEl ? cardMessageEl.value.trim() : '';

            if ((type === 'corazon' || type === 'iniciales') && (!name1 || !name2)) {
                alert('Por favor, introduce los dos nombres o iniciales para formar el corazón.');
                return;
            } else if (type === 'individual' && !name1) {
                alert('Por favor, introduce el nombre para el llavero.');
                return;
            }

            if (viewerInitial) viewerInitial.classList.remove('active');
            if (viewerResults) viewerResults.classList.remove('active');
            if (viewerLoading) viewerLoading.classList.add('active');
            generateBtn.disabled = true;

            // ─── PROGRESS BAR & STEP CONTROLLER ───
            const loadingPercent = document.getElementById('loadingPercent');
            const loadingProgressBar = document.getElementById('loadingProgressBar');
            const loadingStatusDesc = document.getElementById('loadingStatusDesc');
            const loadingTimeText = document.getElementById('loadingTimeText');
            const step1 = document.getElementById('step1');
            const step2 = document.getElementById('step2');
            const step3 = document.getElementById('step3');
            const step4 = document.getElementById('step4');

            let currentProgress = 5;
            const startTime = Date.now();

            function setStepState(activeStep) {
                const steps = [step1, step2, step3, step4];
                steps.forEach((el, index) => {
                    if (!el) return;
                    if (index + 1 < activeStep) {
                        el.className = 'step-badge done';
                    } else if (index + 1 === activeStep) {
                        el.className = 'step-badge active';
                    } else {
                        el.className = 'step-badge';
                    }
                });
            }

            setStepState(1);
            if (loadingProgressBar) loadingProgressBar.style.width = '8%';
            if (loadingPercent) loadingPercent.textContent = '8%';
            if (loadingTimeText) loadingTimeText.textContent = '⏱️ Iniciando conexión con el servidor 3D...';

            const progressInterval = setInterval(() => {
                const elapsedSec = (Date.now() - startTime) / 1000;
                
                if (elapsedSec < 2.5) {
                    currentProgress = Math.min(30, 8 + elapsedSec * 9);
                    setStepState(1);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '📐 1/4: Calculando geometría tipográfica y curvas vectoriales...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(1)}s — Generando mallas STL...`;
                } else if (elapsedSec < 5.5) {
                    currentProgress = Math.min(60, 30 + (elapsedSec - 2.5) * 10);
                    setStepState(2);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '❤️ 2/4: Ensamblando corazón magnético y anillas...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(1)}s — Fusionando piezas...`;
                } else if (elapsedSec < 9.0) {
                    currentProgress = Math.min(85, 60 + (elapsedSec - 5.5) * 7);
                    setStepState(3);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '📸 3/4: Renderizando 5 perspectivas en alta definición (OpenSCAD)...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(1)}s — Capturando ángulos HD...`;
                } else if (elapsedSec < 13.0) {
                    currentProgress = Math.min(96, 85 + (elapsedSec - 9.0) * 2.8);
                    setStepState(4);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '⚡ 4/4: Optimizando imágenes y calculando medidas de impresión...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(1)}s — Empaquetando resultado...`;
                } else {
                    // Servidor en frío (despertando tras inactividad en Render)
                    currentProgress = Math.min(99, 96 + (elapsedSec - 13.0) * 0.15);
                    setStepState(4);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '🌐 Despertando servidor en la nube tras inactividad... ¡Ya casi está!';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(0)}s transcurridos — Preparando render...`;
                }

                if (loadingPercent) loadingPercent.textContent = `${Math.round(currentProgress)}%`;
                if (loadingProgressBar) loadingProgressBar.style.width = `${currentProgress}%`;
            }, 80);

            try {
                const API_URL = 'https://latens-studio-web-backend.onrender.com/api/preview';
                
                const payload = {
                    type,
                    name1,
                    name2,
                    fecha,
                    cruz,
                    relieve,
                    tarjeta,
                    tarjeta_titulo,
                    tarjeta_mensaje
                };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({ detail: 'Error en el servidor' }));
                    throw new Error(errData.detail || 'Error al conectar con el servidor 3D');
                }

                currentApiData = await response.json();

                // Animación de éxito 100%
                clearInterval(progressInterval);
                if (loadingProgressBar) loadingProgressBar.style.width = '100%';
                if (loadingPercent) loadingPercent.textContent = '100%';
                if (loadingStatusDesc) loadingStatusDesc.textContent = '✨ ¡Modelo 3D y renders completados con éxito!';
                setStepState(5);
                await new Promise(r => setTimeout(r, 400));

                activeMode = 'juntos';
                setActiveModeBtn('juntos');

                // En modelo individual ocultamos el selector Juntos/Separados porque es 1 sola pieza
                if (type === 'individual') {
                    if (modeJuntosBtn) modeJuntosBtn.style.display = 'none';
                    if (modeSeparadosBtn) modeSeparadosBtn.style.display = 'none';
                } else {
                    if (modeJuntosBtn) modeJuntosBtn.style.display = 'inline-block';
                    if (modeSeparadosBtn) modeSeparadosBtn.style.display = 'inline-block';
                }
                
                // Mostrar botón de tarjeta solo si se ha generado tarjeta
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

                if (viewerLoading) viewerLoading.classList.remove('active');
                if (viewerResults) viewerResults.classList.add('active');

            } catch (error) {
                clearInterval(progressInterval);
                alert('Atención: ' + error.message + '\n\nPor favor, inténtalo de nuevo en unos segundos.');
                if (viewerLoading) viewerLoading.classList.remove('active');
                if (viewerInitial) viewerInitial.classList.add('active');
            } finally {
                clearInterval(progressInterval);
                generateBtn.disabled = false;
            }
        });
    }

});


    // --- FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // --- FORMULARIO DE CONTACTO (RENDER BACKEND) ---
    const contactForm = document.getElementById('contactForm');
    const fileInput = document.getElementById('attachment');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const formResult = document.getElementById('formResult');
    const fileLabel = document.querySelector('.file-label');

    // Auto-expansión dinámica del recuadro de mensaje hacia abajo
    const messageTextarea = document.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        function autoResize() {
            messageTextarea.style.height = 'auto';
            messageTextarea.style.height = Math.max(95, messageTextarea.scrollHeight) + 'px';
        }
        messageTextarea.addEventListener('input', autoResize);
        window.addEventListener('resize', autoResize);
    }

    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'Adjuntar archivo 3D o foto (Opcional)';
            if (fileNameDisplay) fileNameDisplay.textContent = fileName;
            if (fileLabel) {
                if (e.target.files[0]) {
                    fileLabel.classList.add('has-file');
                } else {
                    fileLabel.classList.remove('has-file');
                }
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const emailVal = emailInput ? emailInput.value.trim().toLowerCase() : '';
            const hpInput = contactForm.querySelector('input[name="website_hp"]');

            // 1. Anti-bot honeypot check (solo bloquea bots automáticos)
            if (hpInput && hpInput.value) {
                console.warn('Bot submission blocked');
                return;
            }

            // 2. Validación de formato de correo estándar y extensión real
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(emailVal)) {
                formResult.textContent = '❌ Por favor, introduce un correo electrónico válido (ej: tu_nombre@gmail.com).';
                formResult.className = 'form-result error';
                if (emailInput) emailInput.focus();
                return;
            }

            formResult.textContent = 'Enviando...';
            formResult.className = 'form-result';
            if (submitBtn) submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://latens-studio-web-backend.onrender.com/api/contact', {
                    method: 'POST',
                    body: formData
                });
                const json = await response.json();
                
                if (response.status == 200) {
                    formResult.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
                    formResult.classList.add('success');
                    contactForm.reset();
                    if (messageTextarea) messageTextarea.style.height = 'auto';
                    if (fileNameDisplay) fileNameDisplay.textContent = 'Adjuntar archivo 3D o foto (Opcional)';
                    if (fileLabel) fileLabel.classList.remove('has-file');
                } else {
                    console.error(response);
                    formResult.textContent = json.detail || 'Error al enviar. Asegúrate de tener el servidor encendido.';
                    formResult.classList.add('error');
                }
            } catch (error) {
                console.error(error);
                formResult.textContent = 'Error de conexión. Verifica tu internet y reintenta.';
                formResult.classList.add('error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    // ─── CARD MINI-GALLERY SLIDER CONTROLLER ───
    const galleryBoxes = document.querySelectorAll('.product-preview-box.has-gallery');
    galleryBoxes.forEach(box => {
        const slides = box.querySelectorAll('.gallery-slide');
        const dots = box.querySelectorAll('.gallery-dot');
        const prevBtn = box.querySelector('.gallery-prev');
        const nextBtn = box.querySelector('.gallery-next');
        let currentIdx = 0;

        function showSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentIdx = index;

            slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(currentIdx - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
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

        // Soporte táctil / swipe para móvil
        let touchStartX = 0;
        box.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        box.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 35) {
                if (diff > 0) {
                    showSlide(currentIdx - 1);
                } else {
                    showSlide(currentIdx + 1);
                }
            }
        }, { passive: true });
    });
