document.addEventListener('DOMContentLoaded', function() {
    // Inicializa AOS (Animações no Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-quart',
        once: false,
        mirror: true
    });

    // Efeito Máquina de Escrever - Título Principal
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
    let typingSpeed = 200;
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

    // Menu Mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Fecha o menu quando um link é clicado
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Carrega a galeria
    loadGalleryItems();

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let galleryImages = [];
    let currentImageIndex = 0;
    
    // Abre lightbox quando uma imagem é clicada
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.swiper-slide')) {
            updateGalleryImages();
            currentImageIndex = galleryImages.indexOf(e.target);
            lightboxImg.src = e.target.src;
            lightbox.classList.add('active');
        }
    });
    
    // Fecha lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });
    
    // Navegação entre imagens no lightbox
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex].src;
    });
    
    // Fecha lightbox ao clicar no fundo
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // Navegação por teclado no lightbox
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
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
    
    // Navegação Suave
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
    
    // Efeito de Scroll no Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.fixed-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Formulário de WhatsApp
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

    // Função para carregar a galeria
    async function loadGalleryItems() {
        try {
            const response = await fetch('assets/gallery-content.json');
            if (!response.ok) throw new Error('Erro ao carregar a galeria');
            
            const galleryData = await response.json();

            // Processa cada categoria
            for (const [category, items] of Object.entries(galleryData)) {
                const galleryElement = document.getElementById(`${category}-gallery`);
                if (!galleryElement) continue;

                items.forEach(item => {
                    const slide = document.createElement('div');
                    slide.className = 'swiper-slide';

                    const mediaElement = item.type === 'video' 
                        ? `<video controls ${item.poster ? `poster="assets/${item.poster}"` : ''}>
                              <source src="assets/${item.file}" type="${item.mediaType}">
                              Seu navegador não suporta este vídeo.
                           </video>`
                        : `<img src="assets/${item.file}" alt="${item.title}">`;

                    slide.innerHTML = `
                        ${mediaElement}
                        <div class="media-caption">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;

                    galleryElement.appendChild(slide);
                });
            }

            // Inicializa todos os Swipers
            initSwipers();

        } catch (error) {
            console.error('Erro ao carregar a galeria:', error);
            // Pode adicionar uma mensagem de erro na interface
        }
    }

    // Inicializa os Swipers
    function initSwipers() {
        const swipers = [];
        document.querySelectorAll('.swiper').forEach((swiperEl, index) => {
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
        });
    }

    // Atualiza a lista de imagens para o lightbox
    function updateGalleryImages() {
        const activeSection = document.querySelector('.gallery-section.active');
        galleryImages = Array.from(activeSection.querySelectorAll('img'));
        currentImageIndex = 0;
    }
});
