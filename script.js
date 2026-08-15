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
        });
    });

    // ─── DYNAMIC INPUTS FOR PREVIEWER ───
    const dynamicInputsContainer = document.getElementById('dynamicInputs');
    
    function renderDynamicInputs() {
        if (!productSelect || !dynamicInputsContainer) return;
        const val = productSelect.value;
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

        if (val === 'individual') {
            html = `
                <div class="form-field">
                    <label for="name1">Nombre para el Llavero</label>
                    <input type="text" id="name1" placeholder="Ej: Carlos" maxlength="12" required>
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
    let activeMode = 'juntos';
    let currentSlide = 0;

    const perspectivesLlavero = [
        "Vista Frontal (Frente)", 
        "Vista Trasera (Posterior)", 
        "Vista Lateral Izquierda", 
        "Vista Lateral Derecha", 
        "Vista Isom\u00e9trica (Relieve 3D)"
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

    perspectiveThumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', () => {
            currentSlide = idx;
            updateCarousel();
        });
    });

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

    // ─── LIGHTBOX MODAL WITH ZOOM & PAN ───
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxViewport = document.getElementById('lightboxViewport');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
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

    let lightboxMode = '3d';
    let catalogLightboxImages = [];
    let catalogLightboxTitles = [];
    let catalogSlideIndex = 0;

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
        if (zoomLevel === 1) { panX = 0; panY = 0; }
        applyZoomTransform();
    }

    function updateLightboxCounter() {
        if (!lightboxCounter) return;
        if (lightboxMode === 'catalog') {
            lightboxCounter.textContent = `${catalogSlideIndex + 1} / ${catalogLightboxImages.length}`;
            lightboxCounter.style.display = 'block';
        } else {
            const imgList = getActiveImages();
            if (imgList.length > 1) {
                lightboxCounter.textContent = `${currentSlide + 1} / ${imgList.length}`;
                lightboxCounter.style.display = 'block';
            } else {
                lightboxCounter.style.display = 'none';
            }
        }
    }

    function openLightbox(index) {
        lightboxMode = '3d';
        if (index !== undefined) currentSlide = index;
        resetZoom();
        updateLightboxContent();
        if (lightboxModal) lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function openCatalogLightbox(images, index, titles) {
        lightboxMode = 'catalog';
        catalogLightboxImages = images;
        catalogLightboxTitles = titles || [];
        catalogSlideIndex = index || 0;
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
        if (lightboxMode === 'catalog') {
            if (!catalogLightboxImages || !catalogLightboxImages[catalogSlideIndex]) return;
            if (lightboxImg) lightboxImg.src = catalogLightboxImages[catalogSlideIndex];
            const title = catalogLightboxTitles[catalogSlideIndex] || `Foto ${catalogSlideIndex + 1} de ${catalogLightboxImages.length}`;
            if (lightboxTitle) lightboxTitle.textContent = title;
            updateLightboxCounter();
            return;
        }

        const imgList = getActiveImages();
        if (!imgList || !imgList[currentSlide]) return;

        if (lightboxImg) lightboxImg.src = `data:image/png;base64,${imgList[currentSlide]}`;

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
        updateLightboxCounter();
    }

    function lightboxPrevSlide() {
        if (lightboxMode === 'catalog') {
            catalogSlideIndex = (catalogSlideIndex > 0) ? catalogSlideIndex - 1 : catalogLightboxImages.length - 1;
            resetZoom();
            updateLightboxContent();
        } else {
            const cp = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : cp.length - 1;
            resetZoom();
            updateCarousel();
        }
    }

    function lightboxNextSlide() {
        if (lightboxMode === 'catalog') {
            catalogSlideIndex = (catalogSlideIndex < catalogLightboxImages.length - 1) ? catalogSlideIndex + 1 : 0;
            resetZoom();
            updateLightboxContent();
        } else {
            const cp = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
            currentSlide = (currentSlide < cp.length - 1) ? currentSlide + 1 : 0;
            resetZoom();
            updateCarousel();
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', lightboxPrevSlide);
    if (lightboxNext) lightboxNext.addEventListener('click', lightboxNextSlide);
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => setZoom(zoomLevel + 0.3));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => setZoom(zoomLevel - 0.3));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

    if (lightboxViewport) {
        lightboxViewport.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY < 0 ? 0.2 : -0.2;
            setZoom(zoomLevel + delta);
        }, { passive: false });

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

    window.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') lightboxPrevSlide();
        else if (e.key === 'ArrowRight') lightboxNextSlide();
    });

    // Touch / Swipe / Pinch-to-Zoom for Lightbox
    if (lightboxViewport) {
        let lbTouchStartX = 0;
        let lbTouchStartY = 0;
        let initialDistance = null;
        let initialZoom = 1;
        let isPinching = false;
        
        lightboxViewport.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                lbTouchStartX = e.touches[0].screenX;
                lbTouchStartY = e.touches[0].screenY;
                isPinching = false;
                if (zoomLevel > 1) {
                    isDragging = true;
                    startX = e.touches[0].clientX - panX;
                    startY = e.touches[0].clientY - panY;
                }
            } else if (e.touches.length === 2) {
                isPinching = true;
                isDragging = false;
                initialDistance = Math.hypot(
                    e.touches[0].screenX - e.touches[1].screenX,
                    e.touches[0].screenY - e.touches[1].screenY
                );
                initialZoom = zoomLevel;
            }
        }, { passive: false });

        lightboxViewport.addEventListener('touchmove', (e) => {
            if (isPinching && e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = Math.hypot(
                    e.touches[0].screenX - e.touches[1].screenX,
                    e.touches[0].screenY - e.touches[1].screenY
                );
                setZoom(initialZoom * (currentDistance / initialDistance));
            } else if (isDragging && e.touches.length === 1 && zoomLevel > 1) {
                e.preventDefault();
                panX = e.touches[0].clientX - startX;
                panY = e.touches[0].clientY - startY;
                applyZoomTransform();
            }
        }, { passive: false });
        
        lightboxViewport.addEventListener('touchend', (e) => {
            if (isPinching || e.touches.length > 0) { isPinching = false; return; }
            if (isDragging) { isDragging = false; return; }
            if (zoomLevel <= 1.05) {
                const touchEndX = e.changedTouches[0].screenX;
                const touchEndY = e.changedTouches[0].screenY;
                const diffX = touchEndX - lbTouchStartX;
                const diffY = touchEndY - lbTouchStartY;
                if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX > 0) lightboxPrevSlide();
                    else lightboxNextSlide();
                }
            }
        }, { passive: false });
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
                alert('Por favor, introduce los dos nombres o iniciales para formar el coraz\u00f3n.');
                return;
            } else if (type === 'individual' && !name1) {
                alert('Por favor, introduce el nombre para el llavero.');
                return;
            }

            if (viewerInitial) viewerInitial.classList.remove('active');
            if (viewerResults) viewerResults.classList.remove('active');
            if (viewerLoading) viewerLoading.classList.add('active');
            generateBtn.disabled = true;

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
                [step1, step2, step3, step4].forEach((el, index) => {
                    if (!el) return;
                    if (index + 1 < activeStep) el.className = 'step-badge done';
                    else if (index + 1 === activeStep) el.className = 'step-badge active';
                    else el.className = 'step-badge';
                });
            }

            setStepState(1);
            if (loadingProgressBar) loadingProgressBar.style.width = '8%';
            if (loadingPercent) loadingPercent.textContent = '8%';
            let sseStarted = false;
            const timeTrackerInterval = setInterval(() => {
                const elapsedSec = (Date.now() - startTime) / 1000;
                
                if (!sseStarted) {
                    if (elapsedSec > 3) {
                        currentProgress = Math.min(10, 5 + elapsedSec * 0.1);
                        if (loadingStatusDesc) loadingStatusDesc.textContent = '🌐 Despertando servidor en la nube tras inactividad (puede tardar hasta ~50s)... ¡Ya casi está!';
                        if (loadingPercent) loadingPercent.textContent = `${Math.round(currentProgress)}%`;
                        if (loadingProgressBar) loadingProgressBar.style.width = `${currentProgress}%`;
                    }
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(0)}s transcurridos — Esperando conexión...`;
                } else {
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ ${elapsedSec.toFixed(1)}s transcurridos`;
                }
            }, 100);

            try {
                const API_URL = 'https://latens-studio-web-backend.onrender.com/api/preview';
                
                const payload = { type, name1, name2, fecha, cruz, relieve, tarjeta, tarjeta_titulo, tarjeta_mensaje };

                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({ detail: 'Error en el servidor' }));
                    throw new Error(errData.detail || 'Error al conectar con el servidor 3D');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let buffer = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    
                    sseStarted = true;
                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop(); // Mantener línea incompleta en el buffer

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.slice(6).trim();
                            if (!dataStr) continue;
                            
                            try {
                                const data = JSON.parse(dataStr);
                                
                                if (data.type === 'progress') {
                                    currentProgress = data.progress;
                                    if (loadingPercent) loadingPercent.textContent = `${Math.round(currentProgress)}%`;
                                    if (loadingProgressBar) loadingProgressBar.style.width = `${currentProgress}%`;
                                    if (loadingStatusDesc) loadingStatusDesc.textContent = data.message;
                                    
                                    if (currentProgress < 30) setStepState(1);
                                    else if (currentProgress < 60) setStepState(2);
                                    else if (currentProgress < 90) setStepState(3);
                                    else setStepState(4);
                                    
                                } else if (data.type === 'result') {
                                    currentApiData = data.result;
                                } else if (data.type === 'error') {
                                    throw new Error(data.detail || 'Error durante la generación');
                                }
                            } catch (e) {
                                console.error('Error parseando SSE:', e, dataStr);
                            }
                        }
                    }
                }

                if (!currentApiData) {
                    throw new Error("No se recibieron resultados válidos del servidor.");
                }

                clearInterval(timeTrackerInterval);
                if (loadingProgressBar) loadingProgressBar.style.width = '100%';
                if (loadingPercent) loadingPercent.textContent = '100%';
                if (loadingStatusDesc) loadingStatusDesc.textContent = '\u2728 \u00a1Modelo 3D y renders completados con \u00e9xito!';
                setStepState(5);
                await new Promise(r => setTimeout(r, 400));

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

                if (viewerLoading) viewerLoading.classList.remove('active');
                if (viewerResults) viewerResults.classList.add('active');

            } catch (error) {
                clearInterval(timeTrackerInterval);
                alert('Atenci\u00f3n: ' + error.message + '\n\nPor favor, int\u00e9ntalo de nuevo en unos segundos.');
                if (viewerLoading) viewerLoading.classList.remove('active');
                if (viewerInitial) viewerInitial.classList.add('active');
            } finally {
                clearInterval(timeTrackerInterval);
                generateBtn.disabled = false;
            }
        });
    }

    // ─── FAQ ACCORDION ───
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ─── FORMULARIO DE CONTACTO ───
    const contactForm = document.getElementById('contactForm');
    const fileInput = document.getElementById('attachment');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const formResult = document.getElementById('formResult');
    const fileLabel = document.querySelector('.file-label');

    const messageTextarea = document.querySelector('textarea[name="message"]');
    const formSubject = document.getElementById('formSubject');

    if (formSubject && messageTextarea) {
        formSubject.addEventListener('change', () => {
            if (formSubject.value === 'feedback') {
                messageTextarea.placeholder = "¿Qué crees que podría mejorar en la web o en los productos? Te leo...";
            } else {
                messageTextarea.placeholder = "Explícame tu idea o comenta el archivo que adjuntas...";
            }
        });
    }

    if (messageTextarea) {
        function autoResize() {
            messageTextarea.style.height = 'auto';
            const newHeight = Math.max(95, messageTextarea.scrollHeight);
            messageTextarea.style.height = newHeight + 'px';
            messageTextarea.style.overflowY = (newHeight > 300) ? 'auto' : 'hidden';
        }
        messageTextarea.addEventListener('input', autoResize);
        window.addEventListener('resize', autoResize);
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
            const emailInput = contactForm.querySelector('input[name="email"]');
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
                formResult.textContent = '❌ Por favor, introduce un correo electrónico válido (ej: tu_nombre@gmail.com).';
                formResult.className = 'form-result error';
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

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://latens-studio-web-backend.onrender.com/api/contact', {
                    method: 'POST',
                    body: formData
                });
                const json = await response.json();
                
                clearInterval(sendTimerInterval);

                if (response.status == 200) {
                    formResult.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
                    formResult.className = 'form-result success';
                    contactForm.reset();
                    if (messageTextarea) messageTextarea.style.height = 'auto';
                    if (fileNameDisplay) fileNameDisplay.textContent = 'Adjuntar archivo 3D o foto (Opcional)';
                    if (fileLabel) fileLabel.classList.remove('has-file');
                    
                    setTimeout(() => {
                        if (formResult) {
                            formResult.textContent = '';
                            formResult.className = 'form-result';
                        }
                    }, 5000);
                } else {
                    console.error(response);
                    formResult.textContent = json.detail || 'Error al enviar. Asegúrate de tener el servidor encendido.';
                    formResult.className = 'form-result error';
                }
            } catch (error) {
                clearInterval(sendTimerInterval);
                console.error(error);
                formResult.textContent = 'Error de conexión. Verifica tu internet y reintenta.';
                formResult.className = 'form-result error';
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

        function triggerLightbox() {
            const allSources = Array.from(slides).map(s => s.getAttribute('src'));
            const allTitles = Array.from(slides).map((s, i) => {
                const alt = s.getAttribute('alt');
                return alt ? `${alt} (${i + 1}/${slides.length})` : `Foto ${i + 1} de ${slides.length}`;
            });
            openCatalogLightbox(allSources, currentIdx, allTitles);
        }

        let lastBoxSwipeTime = 0;
        
        const zoomHint = box.querySelector('.gallery-zoom-hint');
        if (zoomHint) {
            zoomHint.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                triggerLightbox();
            });
        }

        box.addEventListener('click', (e) => {
            if (Date.now() - lastBoxSwipeTime < 200) return;
            if (e.target.closest('.card-gallery-nav button') || e.target.closest('.card-gallery-dots') || e.target.closest('.gallery-prev') || e.target.closest('.gallery-next') || e.target.closest('.gallery-dot') || e.target.closest('.gallery-zoom-hint')) {
                return;
            }
            triggerLightbox();
        });

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

}); // ─── FIN de DOMContentLoaded ───
