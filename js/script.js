document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-quart',
        once: false,
        mirror: true
    });

    // Typewriter Effect - Main Title
    const typewriterElement = document.getElementById('typewriter-content');
    const typewriterCursor = document.querySelector('.typewriter-cursor');
    const texts = [
        "Editor de Vídeos",
        "Editor de Imagens", 
        "Editor de Áudio",
        "Artista Digital",
        "Artista Tradicional",
        "Experiência com Photoshop",
        "Experiência com Premiere Pro",
        "Experiência com After Effects",
        "Experiência com Clip Studio Paint",
        "Experiência com diversos softwares"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseTime = 1500;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            typewriterCursor.style.opacity = '1';
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = charIndex < 5 ? 150 : 100;
        } 
        else if (!isDeleting && charIndex === currentText.length) {
            typewriterCursor.style.opacity = '1';
            isDeleting = true;
            typingSpeed = pauseTime;
        } 
        else if (isDeleting) {
            typewriterCursor.style.opacity = '1';
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    setTimeout(typeWriter, 1000);

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Load gallery items
    loadGalleryItems().then(() => {
        console.log('Gallery loaded successfully');
    }).catch(error => {
        console.error('Failed to load gallery:', error);
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let galleryImages = [];
    let currentImageIndex = 0;
    
    // Open lightbox when clicking an image
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.swiper-slide')) {
            updateGalleryImages();
            currentImageIndex = galleryImages.indexOf(e.target);
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Navigation between images in lightbox
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    });
    
    // Close lightbox when clicking background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Keyboard navigation in lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                lightboxImg.src = galleryImages[currentImageIndex].src;
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                lightboxImg.src = galleryImages[currentImageIndex].src;
            }
        }
    });
    
    // Dark/Light Mode Toggle
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            document.documentElement.style.setProperty('--bg', 'var(--light-bg)');
            document.documentElement.style.setProperty('--secondary', 'var(--light-secondary)');
            document.documentElement.style.setProperty('--text', 'var(--light-text)');
            document.documentElement.style.setProperty('--accent', 'var(--light-accent)');
            document.documentElement.style.setProperty('--card', 'var(--light-card)');
            document.documentElement.style.setProperty('--border', 'var(--light-border)');
            document.documentElement.style.setProperty('--hero-overlay', 'var(--light-hero-overlay)');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.style.setProperty('--bg', 'var(--dark-bg)');
            document.documentElement.style.setProperty('--secondary', 'var(--dark-secondary)');
            document.documentElement.style.setProperty('--text', 'var(--dark-text)');
            document.documentElement.style.setProperty('--accent', 'var(--dark-accent)');
            document.documentElement.style.setProperty('--card', 'var(--dark-card)');
            document.documentElement.style.setProperty('--border', 'var(--dark-border)');
            document.documentElement.style.setProperty('--hero-overlay', 'rgba(0,0,0,0.85)');
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.fixed-header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.fixed-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // WhatsApp Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value;
        
        const whatsappText = `Olá Murilo, meu nome é ${name}. Tenho interesse em ${interest}. ${message}`;
        const encodedText = encodeURIComponent(whatsappText);
        const whatsappUrl = `https://wa.me/5519971590696?text=${encodedText}`;
        
        window.open(whatsappUrl, '_blank');
    });

    // Load Gallery Items with improved error handling
    async function loadGalleryItems() {
        console.log('[Gallery] Starting to load gallery items...');
        
        try {
            const response = await fetch('assets/gallery-content.json');
            console.log('[Gallery] Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const galleryData = await response.json();
            console.log('[Gallery] Data loaded:', galleryData);

            // Process each category
            for (const [category, items] of Object.entries(galleryData)) {
                const galleryElement = document.getElementById(`${category}-gallery`);
                if (!galleryElement) {
                    console.warn(`[Gallery] Element not found for category: ${category}`);
                    continue;
                }

                // Clear existing content
                galleryElement.innerHTML = '';
                
                items.forEach(item => {
                    try {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide';

                        // Validate item properties
                        if (!item.file || !item.type || !item.mediaType || !item.title) {
                            console.warn('[Gallery] Invalid item format:', item);
                            return;
                        }

                        const mediaPath = `assets/${item.file}`;
                        console.log(`[Gallery] Loading media from: ${mediaPath}`);

                        const mediaElement = item.type === 'video' 
                            ? `<video controls ${item.poster ? `poster="assets/${item.poster}"` : ''}>
                                  <source src="${mediaPath}" type="${item.mediaType}">
                                  Seu navegador não suporta este vídeo.
                               </video>`
                            : `<img src="${mediaPath}" alt="${item.title}" loading="lazy">`;

                        slide.innerHTML = `
                            ${mediaElement}
                            <div class="media-caption">
                                <h3>${item.title}</h3>
                                <p>${item.description || ''}</p>
                            </div>
                        `;

                        galleryElement.appendChild(slide);
                    } catch (error) {
                        console.error(`[Gallery] Error creating slide for item:`, item, error);
                    }
                });
            }

            // Initialize Swipers after loading
            initSwipers();
            return galleryData;

        } catch (error) {
            console.error('[Gallery] Failed to load gallery:', error);
            
            // Show error message to user
            const galleryContainer = document.getElementById('gallery');
            if (galleryContainer) {
                galleryContainer.innerHTML += `
                    <div class="error-message">
                        <p>Ocorreu um erro ao carregar a galeria. Por favor, tente recarregar a página.</p>
                        <button onclick="window.location.reload()">Recarregar</button>
                    </div>
                `;
            }
            
            return {
                videos: [],
                digital: [],
                traditional: [],
                graphic: [],
                photo: []
            };
        }
    }

    // Initialize Swipers
    function initSwipers() {
        console.log('[Gallery] Initializing swipers...');
        const swipers = [];
        
        document.querySelectorAll('.swiper').forEach((swiperEl, index) => {
            try {
                swipers[index] = new Swiper(swiperEl, {
                    loop: true,
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
                        depth: 200,
                        modifier: 1,
                        slideShadows: true,
                    },
                    keyboard: {
                        enabled: true,
                    },
                });
                console.log(`[Gallery] Swiper ${index} initialized successfully`);
            } catch (error) {
                console.error(`[Gallery] Error initializing swiper ${index}:`, error);
            }
        });
    }

    // Update images list for lightbox
    function updateGalleryImages() {
        const activeSection = document.querySelector('.gallery-section.active');
        if (!activeSection) {
            console.warn('[Gallery] No active gallery section found');
            return;
        }
        
        galleryImages = Array.from(activeSection.querySelectorAll('img'));
        currentImageIndex = 0;
        console.log(`[Gallery] Updated lightbox with ${galleryImages.length} images`);
    }
});