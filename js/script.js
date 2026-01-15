document.addEventListener('DOMContentLoaded', function() {
    // Inicialização AOS (Animações mais rápidas e snappier)
    AOS.init({ 
        duration: 600, // Mais rápido
        easing: 'ease-out', 
        once: true // Anima só uma vez para não ficar pesado
    });

    // Typewriter Effect (Mais rápido)
    const typewriterElement = document.getElementById('typewriter-content');
    const texts = [
        "Edição de Vídeo",
        "Design & Motion",
        "Tecnologia & TI",
        "Audiovisual",
        "Hardware & Setup"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        if(!typewriterElement) return;
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeWriter, 300); // Pausa curta antes de começar a próxima
                return;
            }
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, 1500); // Fica parado lendo por 1.5s
                return;
            }
        }
        // Velocidade de digitar (50ms) e apagar (30ms)
        setTimeout(typeWriter, isDeleting ? 30 : 50);
    }
    typeWriter();

    // Menu Mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Tabs da Galeria
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const gallerySections = document.querySelectorAll('.gallery-section');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            galleryTabs.forEach(t => t.classList.remove('active'));
            gallerySections.forEach(s => s.classList.remove('active'));
            
            tab.classList.add('active');
            const sectionId = tab.dataset.section + '-section';
            const section = document.getElementById(sectionId);
            if(section) {
                section.classList.add('active');
                initSwipers(); 
            }
        });
    });

    // Carregamento da Galeria
    async function loadGalleryItems() {
        try {
            const response = await fetch('assets/gallery-content.json');
            const galleryData = await response.json();
            
            for (const [category, items] of Object.entries(galleryData)) {
                const wrapper = document.getElementById(`${category}-gallery`);
                if (!wrapper) continue;

                if (items.length === 0) {
                    wrapper.innerHTML = `<div class="swiper-slide"><p style="color:#8b949e">Em breve.</p></div>`;
                    continue;
                }

                wrapper.innerHTML = items.map(item => `
                    <div class="swiper-slide">
                        <img src="assets/${item.file}" 
                             alt="${item.title}" 
                             loading="lazy">
                    </div>
                `).join('');
            }
            initSwipers();
            setupLightbox(); // Configura o lightbox após carregar imagens
        } catch (error) {
            console.error('Erro ao carregar galeria:', error);
        }
    }
    
    // Lightbox Logic
    function setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.querySelector('.close-lightbox');
        
        // Adiciona evento de clique em todas as imagens dos swipers
        document.querySelectorAll('.swiper-slide img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex'; // Mostra flex
            });
        });

        // Fechar
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    function initSwipers() {
        document.querySelectorAll('.swiper').forEach(el => {
            // Verifica se já existe instância e destroi para recriar (evita bugs)
            if(el.swiper) el.swiper.destroy(true, true);
            
            new Swiper(el, {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 20,
                grabCursor: true,
                navigation: {
                    nextEl: el.querySelector('.swiper-button-next'),
                    prevEl: el.querySelector('.swiper-button-prev'),
                },
            });
        });
    }

    loadGalleryItems();
});
