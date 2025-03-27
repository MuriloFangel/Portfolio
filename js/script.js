// Configuração Inicial
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
    let typingSpeed = 100;
    let pauseTime = 1500;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        // Mostra cursor apenas quando estiver digitando ou na pausa após digitar
        if (!isDeleting && charIndex < currentText.length) {
            typewriterCursor.style.opacity = '1';
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = charIndex < 5 ? 150 : 100;
        } 
        // Pausa após digitar
        else if (!isDeleting && charIndex === currentText.length) {
            typewriterCursor.style.opacity = '1';
            isDeleting = true;
            typingSpeed = pauseTime;
        } 
        // Apagando o texto
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
    
    // Inicia o efeito
    setTimeout(typeWriter, 1000);
    
    // Efeito de troca de softwares (sem cursor)
    const softwareTypewriter = document.getElementById('softwareTypewriter');
    const softwares = [
        "Adobe Photoshop",
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Adobe Illustrator",
        "Clip Studio Paint",
        "DaVinci Resolve",
        "e muitos outros"
    ];
    
    let softwareIndex = 0;
    
    function changeSoftware() {
        softwareTypewriter.textContent = softwares[softwareIndex];
        softwareIndex = (softwareIndex + 1) % softwares.length;
        
        const speed = softwareIndex === softwares.length - 1 ? 3000 : 2000;
        setTimeout(changeSoftware, speed);
    }
    
    // Inicia o efeito
    setTimeout(changeSoftware, 1500);
    
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
    
    // Carrega a galeria de imagens dinamicamente
    function loadGalleryItems() {
        // Esta função seria implementada para carregar arquivos de um diretório
        // Como exemplo, vamos usar imagens placeholder
        
        const categories = {
            'video': [
                { type: 'video', src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', poster: 'https://source.unsplash.com/random/800x600?video,editing', title: 'Projeto de Edição de Vídeo', description: 'Editado no Adobe Premiere com efeitos no After Effects' },
                { type: 'video', src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', poster: 'https://source.unsplash.com/random/800x600?video,animation', title: 'Animação Digital', description: 'Criada no Adobe After Effects e Animate' }
            ],
            'digital': [
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?digital-art,illustration', title: 'Ilustração Digital', description: 'Criada no Clip Studio Paint' },
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?digital-art,concept', title: 'Concept Art', description: 'Desenvolvimento de personagens' }
            ],
            'traditional': [
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?drawing,pencil', title: 'Desenho a Lápis', description: 'Técnica tradicional em papel' },
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?painting,watercolor', title: 'Aquarela', description: 'Pintura em aquarela sobre papel' }
            ],
            'graphic': [
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?photo-manipulation', title: 'Manipulação Fotográfica', description: 'Criada no Adobe Photoshop' },
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?graphic-design', title: 'Design Gráfico', description: 'Criado no Adobe Illustrator' }
            ],
            'photo': [
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?photography,urban', title: 'Série Urbana', description: 'Exploração de arquitetura e espaços urbanos' },
                { type: 'image', src: 'https://source.unsplash.com/random/800x600?photography,portrait', title: 'Retratos', description: 'Série de retratos com iluminação natural' }
            ]
        };
        
        for (const [category, items] of Object.entries(categories)) {
            const galleryElement = document.getElementById(`${category}-gallery`);
            
            items.forEach(item => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                
                if (item.type === 'video') {
                    slide.innerHTML = `
                        <video controls poster="${item.poster}">
                            <source src="${item.src}" type="video/mp4">
                            Seu navegador não suporta vídeos.
                        </video>
                        <div class="media-caption">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                } else {
                    slide.innerHTML = `
                        <img src="${item.src}" alt="${item.title}">
                        <div class="media-caption">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    `;
                }
                
                if (galleryElement) {
                    galleryElement.appendChild(slide);
                }
            });
        }
    }
    
    // Inicializa todos os Swipers
    const swipers = [];
    
    function initSwipers() {
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
    
    // Carrega a galeria e inicializa os Swipers
    loadGalleryItems();
    initSwipers();
    
    // Controle das seções da galeria
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const gallerySections = document.querySelectorAll('.gallery-section');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove classe active de todas as tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            // Adiciona classe active na tab clicada
            this.classList.add('active');
            
            // Esconde todas as seções
            gallerySections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostra a seção correspondente
            const sectionId = this.dataset.section + '-section';
            document.getElementById(sectionId).classList.add('active');
            
            // Atualiza o Swiper correspondente
            swipers.forEach(swiper => swiper.update());
        });
    });
    
    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Array para armazenar todas as imagens da galeria
    let galleryImages = [];
    let currentImageIndex = 0;
    
    // Atualiza a lista de imagens quando muda de seção
    function updateGalleryImages() {
        const activeSection = document.querySelector('.gallery-section.active');
        galleryImages = Array.from(activeSection.querySelectorAll('img'));
        currentImageIndex = 0;
    }
    
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
            // Atualiza variáveis para modo claro
            document.documentElement.style.setProperty('--bg', 'var(--light-bg)');
            document.documentElement.style.setProperty('--secondary', 'var(--light-secondary)');
            document.documentElement.style.setProperty('--text', 'var(--light-text)');
            document.documentElement.style.setProperty('--accent', 'var(--light-accent)');
            document.documentElement.style.setProperty('--card', 'var(--light-card)');
            document.documentElement.style.setProperty('--border', 'var(--light-border)');
            document.documentElement.style.setProperty('--hero-overlay', 'var(--light-hero-overlay)');
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            // Atualiza variáveis para modo escuro
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
});