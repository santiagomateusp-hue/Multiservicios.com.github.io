// 1. Funcionalidad del Menú Móvil
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.getElementById('header');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    });
}

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// 2. Scroll Suave (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// 3. Efecto del Header al hacer Scroll (Sticky)
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('shadow-md');
        header.classList.add('bg-white/95');
        header.classList.remove('py-4');
        header.classList.add('py-2');
    } else {
        header.classList.remove('shadow-md');
        header.classList.remove('py-2');
        header.classList.add('py-4');
    }
});

// 4. Animación de aparición al hacer Scroll (Fade In)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Seleccionar secciones importantes para animar
document.querySelectorAll('section > div, .service-card, footer > div').forEach(el => {
    el.classList.add('opacity-0'); // Empiezan invisibles
    observer.observe(el);
});

// 5. Animación de Números (Contadores)
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16);
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + (target > 100 ? '+' : '%');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + (target > 100 ? '+' : '%');
                    }
                };
                updateCounter();
            });
            observer.unobserve(entry.target);
        }
    });
});

const statsSection = document.querySelector('.bg-slate-900'); // Sección oscura donde están los números
if (statsSection) {
    counterObserver.observe(statsSection);
}

// 6. Enviar Formulario a WhatsApp
function enviarWhatsApp() {
    // Obtener valores
    const nombre = document.getElementById('nombre').value;
    const empresa = document.getElementById('empresa').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validación básica
    if (!nombre || !telefono) {
        alert('Por favor ingrese al menos su nombre y teléfono para poder contactarlo.');
        return;
    }

    // Construir mensaje
    let text = `Hola Multiservicios, solicito una cotización:\n\n`;
    text += `👤 *Nombre:* ${nombre}\n`;
    if(empresa) text += `🏢 *Empresa:* ${empresa}\n`;
    if(email) text += `📧 *Email:* ${email}\n`;
    text += `📱 *Teléfono:* ${telefono}\n`;
    if(servicio) text += `🛡️ *Servicio de Interés:* ${servicio}\n`;
    if(mensaje) text += `📝 *Mensaje:* ${mensaje}`;

    // Codificar y abrir WhatsApp
    const phone = "573057002164";
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
}