const chatData = {
    start: {
        msg: "¡Hola! 👋 Bienvenido a Elite Core, tu centro de alto rendimiento en Andorra. ¿En qué puedo ayudarte hoy?",
        options: [
            { text: "💰 Ver Precios", next: "prices" },
            { text: "🏋️ Servicios & Áreas", next: "services" },
            { text: "🕐 Ver Horarios", next: "schedule-menu" },
            { text: "📍 Ubicación", next: "location" },
            { text: "💬 Contacto Directo", next: "contact" }
        ]
    },
    prices: {
        msg: "Ofrecemos varias opciones adaptadas a tu nivel y objetivos:",
        options: [
            { text: "📋 Ver planes en la web", action: "scroll-pricing" },
            { text: "💳 Pase diario (4€)", next: "daily-pass" },
            { text: "📅 Membresía Elite", next: "monthly" },
            { text: "🎯 Plan Personalizado", next: "custom" },
            { text: "⬅️ Volver", next: "start" }
        ]
    },
    daily_pass: {
        msg: "El pase diario tiene un coste de 4€. Ideal para probar nuestras instalaciones de primer nivel sin compromiso.",
        options: [
            { text: "Reservar ahora", action: "whatsapp" },
            { text: "Ver otros planes", next: "prices" },
            { text: "⬅️ Menú principal", next: "start" }
        ]
    },
    monthly: {
        msg: "Nuestra membresía estándar incluye acceso ilimitado a todas las áreas, vestuarios premium y una sesión de evaluación inicial.",
        options: [
            { text: "Consultar cuotas", action: "whatsapp" },
            { text: "Ver en la web", action: "scroll-pricing" },
            { text: "⬅️ Volver", next: "start" }
        ]
    },
    custom: {
        msg: "Para atletas que buscan el máximo rendimiento, diseñamos planes específicos que combinan entrenamiento, nutrición y recuperación.",
        options: [
            { text: "Hablar con un asesor", action: "whatsapp" },
            { text: "Enviar consulta email", action: "email" },
            { text: "⬅️ Volver", next: "start" }
        ]
    },
    services: {
        msg: "Disponemos de equipamiento de última generación y áreas especializadas:",
        options: [
            { text: "🏋️ Musculación & Peso libre", next: "weights" },
            { text: "🏊 Zona Acuática", next: "pool" },
            { text: "🧘 Clases Colectivas", next: "classes" },
            { text: "🏔️ Outdoor/Andorra", next: "outdoor" },
            { text: "⬅️ Volver", next: "start" }
        ]
    },
    weights: {
        msg: "Área equipada con marcas líderes, plataforma de halterofilia y zona de entrenamiento funcional.",
        options: [
            { text: "Agendar visita", action: "whatsapp" },
            { text: "⬅️ Volver a servicios", next: "services" }
        ]
    },
    pool: {
        msg: "Piscina olímpica de 50m y zona de spa para recuperación post-entrenamiento.",
        options: [
            { text: "Ver horarios piscina", action: "whatsapp" },
            { text: "⬅️ Volver a servicios", next: "services" }
        ]
    },
    classes: {
        msg: "Spinning, Yoga, Pilates, Cross-training y Boxeo. Todo incluido en nuestras cuotas mensuales.",
        options: [
            { text: "Pedir horario (PDF)", action: "whatsapp" },
            { text: "⬅️ Volver", next: "services" }
        ]
    },
    outdoor: {
        msg: "Aprovechamos el entorno de Andorra con entrenamientos de trail, MTB y esquí de fondo según temporada.",
        options: [
            { text: "Más info", action: "whatsapp" },
            { text: "⬅️ Volver", next: "services" }
        ]
    },
    "schedule-menu": {
        msg: "¿Qué horario te gustaría consultar?",
        options: [
            { text: "🕐 ¿Está abierto ahora?", next: "today-hours" },
            { text: "📅 Horario Semanal", next: "weekly-hours" },
            { text: "⬅️ Menú principal", next: "start" }
        ]
    },
    "today-hours": {
        msg: "", // Dynamic
        dynamic: true,
        options: [
            { text: "📅 Ver toda la semana", next: "weekly-hours" },
            { text: "⬅️ Menú principal", next: "start" }
        ]
    },
    "weekly-hours": {
        msg: "🕐 Horario Elite Core:\n\n• Lunes a Viernes: 07:00 - 22:00\n• Sábados y Domingos: 09:00 - 20:00\n\n📍 Av. de Salou, 105, Andorra.",
        options: [
            { text: "Agendar visita", action: "whatsapp" },
            { text: "⬅️ Volver", next: "start" }
        ]
    },
    location: {
        msg: "📍 Elite Core Andorra\nAv. de Salou, 105, AD500 Andorra la Vella.\n🅿️ Disponemos de parking privado para socios.",
        options: [
            { text: "🗺️ Ver en Google Maps", action: "map" },
            { text: "💬 Cómo llegar", action: "whatsapp" },
            { text: "⬅️ Volver", next: "start" }
        ]
    },
    contact: {
        msg: "¿Cómo prefieres que hablemos?",
        options: [
            { text: "💬 WhatsApp (Rápido)", action: "whatsapp" },
            { text: "📞 Llamada telefónica", action: "phone" },
            { text: "📧 Correo electrónico", action: "email" },
            { text: "⬅️ Volver", next: "start" }
        ]
    }
};

class Chatbot {
    constructor() {
        this.isOpen = false;
        this.history = [];
        this.autoOpenDelay = 4000; // 4 seconds
        this.init();
    }

    init() {
        this.createDOM();
        this.renderMessage('start');
        
        // Auto-open greeting
        setTimeout(() => {
            if (!this.isOpen && !localStorage.getItem('chat_interacted')) {
                this.toggle();
            }
        }, this.autoOpenDelay);
    }

    getTodaySchedule() {
        const now = new Date();
        const day = now.getDay(); 
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour * 60 + minute;

        let schedule, openTime, closeTime;

        if (day >= 1 && day <= 5) { // LV
            schedule = "07:00 - 22:00";
            openTime = 7 * 60;
            closeTime = 22 * 60;
        } else { // SD
            schedule = "09:00 - 20:00";
            openTime = 9 * 60;
            closeTime = 20 * 60;
        }

        const isOpen = currentTime >= openTime && currentTime < closeTime;
        const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        const todayName = days[day];

        if (isOpen) {
            return `✅ ¡Estamos abiertos hoy ${todayName}!\nNuestro horario es de ${schedule}.\n¿Vienes a entrenar?`;
        } else {
            return `🔒 Estamos cerrados en este momento.\nHoy ${todayName} el horario es ${schedule}.\n¡Te esperamos en la próxima apertura!`;
        }
    }

    createDOM() {
        if (document.getElementById('chatbot-wrapper')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'chatbot-wrapper';
        wrapper.innerHTML = `
            <button id="chat-trigger" title="Habla con nosotros">
                <div class="chat-notif">1</div>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
            <div id="chat-window">
                <div class="chat-header">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981;"></div>
                        <span>Asistente Elite Core</span>
                    </div>
                    <button id="chat-close">&times;</button>
                </div>
                <div id="chat-messages"></div>
                <div id="chat-options"></div>
            </div>
        `;
        document.body.appendChild(wrapper);

        const style = document.createElement('style');
        style.textContent = `
            #chatbot-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 9999; font-family: 'Inter', sans-serif; }
            
            #chat-trigger { 
                width: 65px; height: 65px; border-radius: 50%; 
                background: var(--primary); color: white; border: none; 
                cursor: pointer; box-shadow: 0 8px 32px rgba(124, 58, 237, 0.4); 
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
                display: flex; align-items: center; justify-content: center;
                position: relative;
            }
            #chat-trigger:hover { transform: scale(1.1) translateY(-5px); box-shadow: 0 12px 40px rgba(124, 58, 237, 0.6); }
            
            .chat-notif {
                position: absolute; top: 0; right: 0;
                background: #ef4444; color: white; font-size: 10px; font-weight: bold;
                width: 20px; height: 20px; border-radius: 50%; border: 2px solid #000;
                display: flex; align-items: center; justify-content: center;
            }

            #chat-window { 
                position: absolute; bottom: 85px; right: 0; 
                width: 350px; height: 500px; 
                background: rgba(15, 15, 20, 0.95); 
                backdrop-filter: blur(20px);
                border-radius: 24px; border: 1px solid rgba(255,255,255,0.1); 
                display: none; flex-direction: column; overflow: hidden; 
                box-shadow: 0 20px 60px rgba(0,0,0,0.8);
                animation: chatSlide 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            }
            
            @keyframes chatSlide {
                from { opacity: 0; transform: translateY(20px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }

            .chat-header { 
                padding: 20px 24px; background: rgba(124,58,237,0.1); 
                border-bottom: 1px solid rgba(255,255,255,0.05); 
                display: flex; justify-content: space-between; align-items: center; 
                font-weight: 700; color: white;
            }
            #chat-close { background: none; border: none; color: #fff; font-size: 28px; cursor: pointer; line-height: 1; transition: opacity 0.2s; }
            #chat-close:hover { opacity: 0.7; }

            #chat-messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
            
            .bot-msg { 
                background: rgba(255,255,255,0.08); padding: 12px 16px; 
                border-radius: 18px 18px 18px 4px; align-self: flex-start; 
                max-width: 85%; font-size: 0.95rem; line-height: 1.5; color: #e5e7eb;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                animation: msgAppear 0.3s ease-out forwards;
            }
            
            .user-msg { 
                background: var(--primary); color: white; 
                padding: 12px 16px; border-radius: 18px 18px 4px 18px; 
                align-self: flex-end; max-width: 85%; font-size: 0.95rem;
                font-weight: 500; animation: msgAppear 0.3s ease-out forwards;
            }

            @keyframes msgAppear {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            #chat-options { 
                padding: 15px 20px 25px; display: flex; flex-wrap: wrap; 
                gap: 8px; border-top: 1px solid rgba(255,255,255,0.05); 
                max-height: 180px; overflow-y: auto;
            }
            
            .chat-opt { 
                background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.3); 
                color: #ddd; padding: 10px 16px; border-radius: 12px; 
                font-size: 0.85rem; cursor: pointer; transition: all 0.2s; 
                font-weight: 500;
            }
            .chat-opt:hover { 
                background: var(--primary); color: white; 
                border-color: var(--primary); transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3);
            }

            #chat-messages::-webkit-scrollbar { width: 4px; }
            #chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            
            @media (max-width: 480px) {
                #chat-window { width: calc(100vw - 40px); height: 70vh; right: -10px; }
            }
        `;
        document.head.appendChild(style);

        document.getElementById('chat-trigger').addEventListener('click', () => this.toggle());
        document.getElementById('chat-close').addEventListener('click', () => this.toggle());
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chat-window');
        const trigger = document.getElementById('chat-trigger');
        
        chatWindow.style.display = this.isOpen ? 'flex' : 'none';
        
        if (this.isOpen) {
            localStorage.setItem('chat_interacted', 'true');
            const notif = trigger.querySelector('.chat-notif');
            if (notif) notif.style.display = 'none';
        }
    }

    renderMessage(key) {
        const data = chatData[key];
        if(!data) return;

        const msgs = document.getElementById('chat-messages');
        const opts = document.getElementById('chat-options');

        const msgDiv = document.createElement('div');
        msgDiv.className = 'bot-msg';
        
        if(data.dynamic && key === 'today-hours') {
            msgDiv.innerText = this.getTodaySchedule();
        } else {
            msgDiv.innerText = data.msg;
        }
        
        // Simular escritura
        setTimeout(() => {
            msgs.appendChild(msgDiv);
            msgs.scrollTop = msgs.scrollHeight;
            this.renderOptions(data.options);
        }, 400);
    }

    renderOptions(options) {
        const opts = document.getElementById('chat-options');
        opts.innerHTML = '';
        if(options) {
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'chat-opt';
                btn.innerText = opt.text;
                btn.onclick = () => this.handleOption(opt);
                opts.appendChild(btn);
            });
        }
    }

    handleOption(opt) {
        const msgs = document.getElementById('chat-messages');
        const userDiv = document.createElement('div');
        userDiv.className = 'user-msg';
        userDiv.innerText = opt.text;
        msgs.appendChild(userDiv);
        msgs.scrollTop = msgs.scrollHeight;

        if(opt.next) {
            setTimeout(() => this.renderMessage(opt.next), 600);
        } else if(opt.action) {
            this.handleAction(opt.action);
        }
    }

    handleAction(action) {
        if(action === 'whatsapp') {
            window.open('https://wa.me/34640862859', '_blank');
        } else if(action === 'email') {
            window.location.href = "mailto:Elitecore@elitecore.com";
        } else if(action === 'phone') {
            window.location.href = "tel:+34640862859";
        } else if(action === 'map') {
            window.open('https://goo.gl/maps/placeholder', '_blank');
        } else if(action === 'scroll-pricing') {
            document.getElementById('plans')?.scrollIntoView({behavior: 'smooth'});
            this.toggle();
        }
    }
}

// Iniciar chatbot
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Chatbot());
} else {
    new Chatbot();
}