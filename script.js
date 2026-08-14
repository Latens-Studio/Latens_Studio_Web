document.addEventListener('DOMContentLoaded', () => {
    // ─── TABS LOGIC ───
    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(targetId) {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        const activeBtn = document.querySelector(`[data-target="${targetId}"]`);
        const activePane = document.getElementById(targetId);
        
        if (activeBtn) activeBtn.classList.add('active');
        if (activePane) activePane.classList.add('active');

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

        // Ambos productos soportados son de pareja (2 inputs)
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

        dynamicInputsContainer.innerHTML = html;
    }

    if (productSelect) {
        productSelect.addEventListener('change', renderDynamicInputs);
        renderDynamicInputs();
    }

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

        if (lightboxImg) lightboxImg.src = `data:image/png;base64,${imgList[currentSlide]}`;
        const modeText = activeMode === 'juntos' ? 'Juntos' : 'Separados';
        const currentPerspectives = (activeMode === 'tarjeta') ? perspectivesTarjeta : perspectivesLlavero;
        if (lightboxTitle) lightboxTitle.textContent = `${currentPerspectives[currentSlide] || 'Perspectiva'} - [${modeText}]`;
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
            } else if (!name1) {
                alert('Por favor, introduce el nombre.');
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
            if (loadingProgressBar) loadingProgressBar.style.width = '5%';
            if (loadingPercent) loadingPercent.textContent = '5%';

            const progressInterval = setInterval(() => {
                const elapsedSec = (Date.now() - startTime) / 1000;
                
                if (elapsedSec < 2.0) {
                    currentProgress = Math.min(28, currentProgress + 1.2);
                    setStepState(1);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '📐 Calculando geometría tipográfica y curvas...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ Tiempo estimado: ~${Math.max(1, Math.round(9 - elapsedSec))} seg`;
                } else if (elapsedSec < 4.5) {
                    currentProgress = Math.min(58, currentProgress + 0.9);
                    setStepState(2);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '❤️ Ensamblando corazón magnético y anillas...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ Tiempo estimado: ~${Math.max(1, Math.round(9 - elapsedSec))} seg`;
                } else if (elapsedSec < 7.5) {
                    currentProgress = Math.min(84, currentProgress + 0.7);
                    setStepState(3);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '📸 Renderizando 5 perspectivas en alta definición (OpenSCAD)...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ Tiempo estimado: ~${Math.max(1, Math.round(9 - elapsedSec))} seg`;
                } else if (elapsedSec < 10.0) {
                    currentProgress = Math.min(95, currentProgress + 0.4);
                    setStepState(4);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '⚡ Optimizando imágenes y calculando medidas exactas...';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ Finalizando render...`;
                } else {
                    currentProgress = Math.min(98, currentProgress + 0.1);
                    setStepState(4);
                    if (loadingStatusDesc) loadingStatusDesc.textContent = '🌐 Despertando servidor en la nube... ¡Casi listo!';
                    if (loadingTimeText) loadingTimeText.textContent = `⏱️ Procesando datos (${Math.round(elapsedSec)}s)`;
                }

                if (loadingPercent) loadingPercent.textContent = `${Math.round(currentProgress)}%`;
                if (loadingProgressBar) loadingProgressBar.style.width = `${currentProgress}%`;
            }, 100);

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
            formResult.textContent = 'Enviando...';
            formResult.className = 'form-result';
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
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
