// ============================================
// PORTFOLIO INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // ============================================
    // COLOR PALETTE TOGGLE
    // ============================================
    const paletteToggle = document.getElementById('paletteToggle');
    const paletteText = document.querySelector('.palette-text');

    // Check for saved theme preference
    const savedPalette = localStorage.getItem('colorPalette');
    if (savedPalette) {
        document.body.setAttribute('data-palette', savedPalette);
        updatePaletteText(savedPalette);
    }

    if (paletteToggle) {
        paletteToggle.addEventListener('click', function () {
            const currentPalette = document.body.getAttribute('data-palette');
            const newPalette = currentPalette === 'urban' ? 'elegant' : 'urban';

            document.body.setAttribute('data-palette', newPalette);
            localStorage.setItem('colorPalette', newPalette);
            updatePaletteText(newPalette);

            // Add animation effect
            paletteToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                paletteToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    function updatePaletteText(palette) {
        if (paletteText) {
            paletteText.textContent = palette === 'urban' ? 'Dark' : 'Light';
        }
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 15px var(--shadow)';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // SMOOTH SCROLL WITH OFFSET
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAVIGATION LINK HIGHLIGHT
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ============================================
    // SKILL PROGRESS BAR ANIMATION
    // ============================================
    const skillItems = document.querySelectorAll('.skill-item');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const progressBar = entry.target.querySelector('.skill-progress');
                const width = progressBar.getAttribute('data-width');

                if (progressBar && width) {
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 200);
                }

                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // ============================================
    // CARD ENTRANCE ANIMATION
    // ============================================
    const cards = document.querySelectorAll('.experience-card, .project-card, .research-card, .interest-card');

    const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Form will be handled by Formspree
            // Add visual feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Reset after form submission (Formspree will redirect)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ============================================
    // SCROLL TO TOP BUTTON (Hidden by default)
    // ============================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--accent);
        color: var(--primary);
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px var(--shadow);
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });

    // ============================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ============================================
    // const hero = document.querySelector('.hero');

    // if (hero) {
    //     window.addEventListener('scroll', function () {
    //         const scrolled = window.pageYOffset;
    //         const parallaxSpeed = 0.5;
    //         hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    //     });
    // }

    // // ============================================
    // // CUSTOM CURSOR EFFECT (Optional Enhancement)
    // // ============================================
    // const cursor = document.createElement('div');
    // cursor.className = 'custom-cursor';
    // cursor.style.cssText = `
    //     position: fixed;
    //     width: 20px;
    //     height: 20px;
    //     border-radius: 50%;
    //     border: 2px solid var(--accent);
    //     pointer-events: none;
    //     transform: translate(-50%, -50%);
    //     transition: all 0.1s ease;
    //     z-index: 9999;
    //     display: none;
    // `;
    // document.body.appendChild(cursor);

    // // Enable custom cursor on desktop only
    // if (window.innerWidth > 768) {
    //     cursor.style.display = 'block';

    //     document.addEventListener('mousemove', function (e) {
    //         cursor.style.left = e.clientX + 'px';
    //         cursor.style.top = e.clientY + 'px';
    //     });

    //     // Expand cursor on hoverable elements
    //     const hoverables = document.querySelectorAll('a, button, .project-card, .research-card, .experience-card, .interest-card');

    //     hoverables.forEach(element => {
    //         element.addEventListener('mouseenter', function () {
    //             cursor.style.width = '40px';
    //             cursor.style.height = '40px';
    //             cursor.style.backgroundColor = 'rgba(176, 176, 176, 0.1)';
    //         });

    //         element.addEventListener('mouseleave', function () {
    //             cursor.style.width = '20px';
    //             cursor.style.height = '20px';
    //             cursor.style.backgroundColor = 'transparent';
    //         });
    //     });
    // }


    // ============================================
    // INITIALIZE ANIMATIONS
    // ============================================
    console.log('Portfolio initialized successfully! 🚀');
    console.log('Current palette:', document.body.getAttribute('data-palette') || 'elegant');

});

// ============================================
// PARTICLE SYSTEM FOR HERO SECTION
// ============================================
const particleCanvas = document.getElementById('particleCanvas');

if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        particleCanvas.width = particleCanvas.offsetWidth;
        particleCanvas.height = particleCanvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    particleCanvas.addEventListener('mousemove', function (event) {
        const rect = particleCanvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });

    particleCanvas.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.size = Math.random() * 3 + 1;
            this.density = (Math.random() * 30) + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        draw() {
            const isDark = document.body.getAttribute('data-palette') === 'urban';
            const color = isDark ? 'rgba(242, 233, 228, 0.5)' : 'rgba(51, 51, 51, 0.3)';

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX * 3;
                    this.y -= directionY * 3;
                }
            }

            let dx = this.baseX - this.x;
            let dy = this.baseY - this.y;
            this.x += dx * 0.05;
            this.y += dy * 0.05;

            if (this.x < 0 || this.x > particleCanvas.width) this.baseX = Math.random() * particleCanvas.width;
            if (this.y < 0 || this.y > particleCanvas.height) this.baseY = Math.random() * particleCanvas.height;
        }
    }

    function init() {
        particles = [];
        const numberOfParticles = particleCanvas.width < 768 ? 50 : 100;

        for (let i = 0; i < numberOfParticles; i++) {
            let x = Math.random() * particleCanvas.width;
            let y = Math.random() * particleCanvas.height;
            particles.push(new Particle(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', function () {
        resizeCanvas();
        init();
    });
}

// ============================================
// 3D PARALLAX EFFECTS FOR CARDS
// ============================================

function add3DParallax(selector) {
    const cards = document.querySelectorAll(selector);

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

add3DParallax('.project-card');
add3DParallax('.research-card');
add3DParallax('.experience-card');
add3DParallax('.interest-card');

// ============================================
// ENHANCED SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const appearObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedCards = document.querySelectorAll('.project-card, .research-card, .experience-card, .interest-card, .timeline-item');

animatedCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    appearObserver.observe(card);
});

const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

console.log('Enhanced portfolio features initialized! ✨');

