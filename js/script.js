document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-quart',
        once: false, // Alterado para false para animações em cada scroll, se preferir true para uma vez
        mirror: true // Elementos animam ao scrollar para cima e para baixo
    });

    // Typewriter Effect - Main Title
    const typewriterElement = document.getElementById('typewriter-content');
    const typewriterCursor = document.querySelector('.typewriter-cursor');
    // Textos atualizados para refletir suas habilidades e foco
    const texts = [
        "Edição de Vídeo Profissional",
        "Design Gráfico Criativo",
        "Ilustração Digital Autoral",
        "Criação de Conteúdo para Web",
        "Gestão de Mídias Sociais",
        "Adobe Premiere Pro & After Effects",
        "Photoshop & Illustrator",
        "Clip Studio Paint & Krita",
        "Paixão por Artes Visuais"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Velocidade de digitação
    let deleteSpeed = 50;   // Velocidade ao apagar
    let pauseTime = 1800; // Pausa no final da palavra
    
    function typeWriter() {
        const currentText = texts[textIndex];
        typewriterCursor.style.opacity = '1'; // Mantém o cursor visível durante a pausa
        
        if (isDeleting) {
            // Apagando
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeWriter, 500); // Pausa antes de começar a nova palavra
                return;
            }
        } else {
            // Digitando
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, pauseTime); // Pausa no final da palavra
                return;
            }
        }
        
        setTimeout(typeWriter, isDeleting ? deleteSpeed : typingSpeed);
    }
    
    if (typewriterElement) { // Verifica se o elemento existe
        setTimeout(typeWriter, 1000); // Inicia após um breve delay
    }


    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            // Trava o scroll do body quando o menu está aberto
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking a link or outside
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = ''; // Libera o scroll
            }
        });
    });
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active') && !mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });

    // Gallery Tabs
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const gallerySections = document.querySelectorAll('.gallery-section');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and sections
            galleryTabs.forEach(t => t.classList.remove('active'));
            gallerySections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            const sectionId = tab.dataset.section + '-section';
            document.getElementById(sectionId)?.classList.add('active');
            
            // Reinitialize or update swiper for the new active section if necessary
            // This might be needed if Swiper instances are not globally managed or need layout update
             initSwipers(); // Re-initialize Swipers to catch the active one
        });
    });
    
    // Load gallery items
    loadGalleryItems().then(() => {
        console.log('Gallery items loaded and Swipers initialized.');
        // Ensure lightbox functionality is set up after items are loaded
        setupLightboxListeners();
    }).catch(error => {
        console.error('Failed to load gallery:', error);
    });

    // Lightbox functionality (moved setup to a function)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightboxBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let galleryImages = [];
    let currentImageIndex = 0;

    function openLightbox(targetImage) {
        updateGalleryImagesForLightbox(); // Make sure we have the latest images from active swiper
        currentImageIndex = galleryImages.findIndex(img => img.src === targetImage.src);
        if (currentImageIndex === -1) { // Fallback if not found (e.g. dynamically added)
            lightboxImg.src = targetImage.src;
        } else {
             lightboxImg.src = galleryImages[currentImageIndex].src;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        if (galleryImages.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    }

    function showNextImage() {
         if (galleryImages.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    }
    
    function setupLightboxListeners() {
        // Event delegation for dynamically loaded images in Swiper
        document.getElementById('portfolio').addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG' && e.target.closest('.swiper-slide')) {
                 openLightbox(e.target);
            }
        });

        if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
        if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
        if (nextBtn) nextBtn.addEventListener('click', showNextImage);
        
        if (lightbox) {
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) { // Click on background
                    closeLightbox();
                }
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (lightbox && lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                else if (e.key === 'ArrowLeft') showPrevImage();
                else if (e.key === 'ArrowRight') showNextImage();
            }
        });
    }
    
    // Dark/Light Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            const isLightMode = document.body.classList.toggle('light-mode');
            
            // Update CSS variables based on mode
            // Define light and dark mode colors in an object for easier management
            const colors = {
                light: { bg: '#f8f9fa', secondary: '#f1f3f5', text: '#212529', accent: '#5a189a', card: '#ffffff', border: 'rgba(0,0,0,0.1)', heroOverlay: 'rgba(255,255,255,0.85)' },
                dark: { bg: '#121212', secondary: '#1e1e1e', text: '#f5f5f5', accent: '#7b2cbf', card: '#252525', border: 'rgba(255,255,255,0.1)', heroOverlay: 'rgba(0,0,0,0.85)' }
            };
            const currentMode = isLightMode ? 'light' : 'dark';
            for (const [key, value] of Object.entries(colors[currentMode])) {
                document.documentElement.style.setProperty(`--${key}`, value);
            }
            modeToggle.innerHTML = isLightMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('themeMode', currentMode); // Save preference
        });

        // Check for saved theme preference
        const savedMode = localStorage.getItem('themeMode');
        if (savedMode === 'light') {
            modeToggle.click(); // Simulate a click to apply light mode
        }
    }
    
    // Smooth Scrolling & Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const headerOffset = document.querySelector('.fixed-header')?.offsetHeight || 80;

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    function highlightActiveLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - headerOffset - 50) { // 50px buffer
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active-link');
            }
        });
    }
    
    // Header Scroll Effect & Active Link on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.fixed-header');
        if (header) { // Check if header exists
            if (window.scrollY > 50) { // Reduced scroll threshold
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                if (document.body.classList.contains('light-mode')) {
                    header.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
                } else {
                    header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
                }
            } else {
                header.style.boxShadow = 'none';
                 if (document.body.classList.contains('light-mode')) {
                    header.style.backgroundColor = 'rgba(248, 249, 250, 0.9)';
                } else {
                    header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
                }
            }
        }
        highlightActiveLink(); // Call highlighting function on scroll
    });
    highlightActiveLink(); // Initial call
    
    // WhatsApp Form & Footer Link
    const contactForm = document.getElementById('contact-form');
    const whatsappFooterLink = document.getElementById('whatsappFooterLink');
    const myWhatsAppNumber = '5519971590696'; // Seu número de WhatsApp

    function openWhatsApp(name, interest, message) {
        let whatsappText = `Olá Murilo,`;
        if (name) whatsappText += ` meu nome é ${name}.`;
        if (interest) whatsappText += ` Tenho interesse em ${interest}.`;
        if (message) whatsappText += ` ${message}`;
        
        const encodedText = encodeURIComponent(whatsappText.trim());
        const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;
            openWhatsApp(name, interest, message);
        });
    }
    if (whatsappFooterLink) {
        whatsappFooterLink.addEventListener('click', function(e){
            e.preventDefault();
            openWhatsApp(null, "conversar", "Gostaria de falar com você."); // Mensagem genérica
        });
    }


    // Load Gallery Items from JSON
    async function loadGalleryItems() {
        console.log('[Gallery] Starting to load gallery items...');
        try {
            const response = await fetch('assets/gallery-content.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, Nao foi possivel carregar assets/gallery-content.json`);
            }
            const galleryData = await response.json();
            console.log('[Gallery] Data loaded:', galleryData);

            for (const [category, items] of Object.entries(galleryData)) {
                const galleryElement = document.getElementById(`${category}-gallery`);
                if (!galleryElement) {
                    console.warn(`[Gallery] Element not found for category wrapper: ${category}-gallery`);
                    continue;
                }
                galleryElement.innerHTML = ''; // Clear existing, e.g. placeholders
                
                if (items.length === 0) {
                    galleryElement.innerHTML = `<div class="swiper-slide swiper-slide-placeholder">Nenhum item nesta categoria ainda. Adicione em <code>assets/gallery-content.json</code>.</div>`;
                    continue;
                }

                items.forEach(item => {
                    if (!item.file || !item.type || !item.title) {
                        console.warn('[Gallery] Invalid item format, missing file, type or title:', item);
                        return;
                    }

                    // Adaptação: Assume que 'file' agora é o caminho relativo dentro de 'assets/'
                    // Ex: "images/digital/minha_arte.jpg" -> assets/images/digital/minha_arte.jpg
                    const mediaPath = `assets/${item.file}`; 
                    console.log(`[Gallery] Loading media from: ${mediaPath}`);

                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';
                    
                    const mediaElement = item.type === 'video' ? // Para vídeos locais, não YouTube
                        `<video controls ${item.poster ? `poster="assets/${item.poster}"` : ''} title="${item.title}">
                           <source src="${mediaPath}" type="${item.mediaType || 'video/mp4'}">
                           Seu navegador não suporta este vídeo.
                         </video>` :
                        `<img src="${mediaPath}" alt="${item.description || item.title}" loading="lazy">`;

                    slide.innerHTML = `
                        ${mediaElement}
                        <div class="media-caption">
                            <h3>${item.title}</h3>
                            ${item.description ? `<p>${item.description}</p>` : ''}
                        </div>
                    `;
                    galleryElement.appendChild(slide);
                });
            }
            initSwipers(); // Initialize Swipers after content is loaded

        } catch (error) {
            console.error('[Gallery] Failed to load or process gallery-content.json:', error);
            // Manter placeholders ou mostrar mensagem de erro nas galerias
            document.querySelectorAll('.swiper-wrapper').forEach(wrapper => {
                 if (wrapper.childElementCount === 0) { // Se estiver vazio após a falha
                    wrapper.innerHTML = `<div class="swiper-slide swiper-slide-placeholder">Erro ao carregar galeria. Verifique o console.</div>`;
                 }
            });
             initSwipers(); // Tenta inicializar mesmo em erro para que a estrutura não quebre
        }
    }

    // Initialize Swipers
    let swiperInstances = [];
    function initSwipers() {
        console.log('[Gallery] Initializing/Re-initializing swipers...');
        // Destruir instâncias antigas se existirem para re-inicialização limpa
        swiperInstances.forEach(sw => sw.destroy && sw.destroy(true, true));
        swiperInstances = [];

        document.querySelectorAll('#portfolio .gallery-section .swiper').forEach((swiperEl) => {
            // Só inicializa o Swiper da aba ativa para otimizar, ou todos se preferir
            // if (swiperEl.closest('.gallery-section.active')) {
                try {
                    const swiperInstance = new Swiper(swiperEl, {
                        loop: swiperEl.querySelectorAll('.swiper-slide').length > 1, // Loop só se tiver mais de um slide
                        navigation: {
                            nextEl: swiperEl.querySelector('.swiper-button-next'),
                            prevEl: swiperEl.querySelector('.swiper-button-prev'),
                        },
                        effect: 'coverflow',
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        coverflowEffect: {
                            rotate: 20,
                            stretch: 0,
                            depth: 150, // Reduzido para um efeito mais sutil
                            modifier: 1,
                            slideShadows: true,
                        },
                        keyboard: {
                            enabled: true,
                        },
                        observer: true, // Observa mudanças no Swiper
                        observeParents: true, // Observa mudanças nos pais do Swiper
                        on: {
                            // eslint-disable-next-line no-unused-vars
                            imagesReady: function (swiper) {
                                // Forçar atualização do layout pode ser necessário em alguns casos
                                // swiper.update(); 
                            },
                        }
                    });
                    swiperInstances.push(swiperInstance);
                    console.log(`[Gallery] Swiper initialized for:`, swiperEl);
                } catch (error) {
                    console.error(`[Gallery] Error initializing swiper:`, swiperEl, error);
                }
            // }
        });
    }

    // Update images list for lightbox from the currently active Swiper
    function updateGalleryImagesForLightbox() {
        galleryImages = []; // Limpa a lista
        const activeSwiperSection = document.querySelector('#portfolio .gallery-section.active .swiper');
        if (activeSwiperSection) {
            const activeSwiperInstance = swiperInstances.find(sw => sw.el === activeSwiperSection);
            if (activeSwiperInstance && activeSwiperInstance.slides) {
                 activeSwiperInstance.slides.forEach(slide => {
                    const img = slide.querySelector('img');
                    if (img) {
                        galleryImages.push(img);
                    }
                });
            }
        } else { // Fallback para todas as imagens se nenhuma seção estiver claramente ativa para lightbox
             document.querySelectorAll('#portfolio .gallery-section .swiper-slide img').forEach(img => {
                galleryImages.push(img);
            });
        }
        console.log(`[Lightbox] Updated with ${galleryImages.length} images for lightbox.`);
    }

});
