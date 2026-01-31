document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqs = document.querySelectorAll('.faq-question');
    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            const item = faq.parentElement;
            item.classList.toggle('active');
        });
    });

    // Mobile Menu
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');

    if (burger && menu) {
        burger.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (menu && !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                }
            }
        });
    });

    // Scroll Reveal Animation (Simple)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Form Handling (WhatsApp)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('input[type="text"]').value;

            // Get checked interests
            const checked = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value);
            const interestStr = checked.length > 0 ? checked.join(', ') : 'Información general';

            const msg = form.querySelector('textarea').value;

            const text = `Hola Elite Core, soy ${name}. Me interesa: ${interestStr}. Mensaje: ${msg}`;
            const url = `https://wa.me/34640862859?text=${encodeURIComponent(text)}`;

            window.open(url, '_blank');
        });
    }

    // 3D Tilt Effect (Excluded for Contact Form)
    const cards = document.querySelectorAll('.card, .pricing-card, .step-card');
    cards.forEach(card => {
        // Skip if inside contact section
        if (card.closest('#contact')) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Typewriter Effect (Hero)
    const words = ["vencerse a sí mismo.", "superar tus límites.", "ser mejor cada día.", "tu disciplina."];
    let i = 0;

    function typeWriter(elementId, textArray, loop = true) {
        const heading = document.getElementById(elementId);
        if (!heading) return;

        // Single string support
        const isArray = Array.isArray(textArray);
        const currentText = isArray ? textArray[i % textArray.length] : textArray;

        let charIndex = 0;
        heading.innerHTML = "";

        function type() {
            if (charIndex < currentText.length) {
                heading.innerHTML += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else if (loop && isArray) {
                setTimeout(erase, 2000);
            }
        }

        function erase() {
            if (charIndex > 0) {
                heading.innerHTML = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                i++;
                typeWriter(elementId, textArray, loop); // Recurse with next index
            }
        }

        type();
    }

    typeWriter("typewriter", words, true);
    setTimeout(() => typeWriter("email-typewriter", "Contacta con nosotros: Elitecore@elitecore.com", false), 1000);

    // Placeholder Typewriter
    // Placeholder Typewriter with Loop
    function typePlaceholder(id, text) {
        const el = document.getElementById(id);
        if (!el) return;

        let i = 0;
        let isDeleting = false;

        function loop() {
            const speed = isDeleting ? 50 : 100;
            const current = text.substring(0, i);
            el.placeholder = current;

            if (!isDeleting && i < text.length) {
                i++;
                setTimeout(loop, speed);
            } else if (isDeleting && i > 0) {
                i--;
                setTimeout(loop, speed);
            } else if (!isDeleting && i === text.length) {
                isDeleting = true;
                setTimeout(loop, 2000); // Pause before delete
            } else if (isDeleting && i === 0) {
                isDeleting = false;
                setTimeout(loop, 500); // Pause before re-type
            }
        }
        loop();
    }

    // Call for Name and Phone
    setTimeout(() => typePlaceholder("name-input", "Tu nombre completo..."), 500);
    setTimeout(() => typePlaceholder("phone-input", "+376 000 000"), 1500);

    // Create PARTICLES (More & Faster)
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let j = 0; j < 80; j++) { // Slightly reduced count but high visibility
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDuration = (Math.random() * 15 + 10) + 's';
            p.style.animationDelay = (Math.random() * 10 * -1) + 's';
            p.style.opacity = Math.random() * 0.8 + 0.2; // Higher opacity
            particleContainer.appendChild(p);
        }
    }
});

// MODAL LOGIC
window.openModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

// Close modal on click outside
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});