document.addEventListener('DOMContentLoaded', function() {
    // Inicialização AOS (Animações)
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true });

    // Typewriter Effect (Textos atualizados)
    const typewriterElement = document.getElementById('typewriter-content');
    const texts = [
        "Estudante de Artes Visuais (UNESPAR)",
        "Edição de Vídeo & Motion",
        "Ilustração Digital & Tradicional",
        "Pós-produção Audiovisual",
        "Adobe Premiere & After Effects",
        "Clip Studio Paint"
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
                setTimeout(typeWriter, 500);
                return;
            }
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeWriter, 2000);
                return;
            }
        }
        setTimeout(typeWriter, isDeleting ? 50 : 100);
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
        // Fechar ao clicar em link
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
            document.getElementById(sectionId).classList.add('active');
            initSwipers(); // Reinicia swiper para recalcular tamanhos
        });
    });

    // Carregamento da Galeria (JSON)
    async function loadGalleryItems() {
        try {
            const response = await fetch('assets/gallery-content.json');
            const galleryData = await response.json();
            
            for (const [category, items] of Object.entries(galleryData)) {
                const wrapper = document.getElementById(`${category}-gallery`);
                if (!wrapper) continue;
                
                if (items.length === 0) {
                    wrapper.innerHTML = `<div class="swiper-slide"><p style="color:var(--muted)">Em breve.</p></div>`;
                    continue;
                }

                wrapper.innerHTML = items.map(item => `
                    <div class="swiper-slide">
                        <img src="assets/${item.file}" 
                             alt="${item.title}" 
                             loading="lazy"
                             onclick="openLightbox(this)">
                    </div>
                `).join('');
            }
            initSwipers();
        } catch (error) {
            console.error('Erro ao carregar galeria:', error);
        }
    }
    
    // Lightbox Simples
    window.openLightbox = function(img) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.style.opacity = '1', 10);
    }
    
    document.querySelector('.close-lightbox').addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.opacity = '0';
        setTimeout(() => lightbox.style.display = 'none', 300);
    });

    // Inicializar Swiper
    function initSwipers() {
        document.querySelectorAll('.swiper').forEach(el => {
            new Swiper(el, {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 30,
                loop: false,
                navigation: {
                    nextEl: el.querySelector('.swiper-button-next'),
                    prevEl: el.querySelector('.swiper-button-prev'),
                },
                grabCursor: true
            });
        });
    }

    loadGalleryItems();
});
