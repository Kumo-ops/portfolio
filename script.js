
// Theme Toggle //
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    if(document.body.classList.contains('light-mode')) {
        toggle.textContent = '🌙';
    } else {
        toggle.textContent = '☀️';
    }
});

//Smooth Scrolling for Anchor Links //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Skill card tooltips
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = card.getAttribute('data-name');
        card.appendChild(tooltip);
    });

    card.addEventListener('mouseleave', () => {
        const tooltip = card.querySelector('.tooltip');
        if(tooltip) tooltip.remove();
    });
});

// Form Validation //
const form = document.querySelector('#contact');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.querySelector('button[type="button"]');

submitBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // 1. Validate name
    if (name === '') {
        alert('Please enter your name.');
        return;
    }
    if (name.length < 2 || !/^[a-zA-Z\s]+$/.test(name)) {
        alert('Please enter a valid name.');
        return;
    }

    // 2. Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    const emailDomain = email.split('@')[1].toLowerCase();
    const blockedDomains = ['fake.com', 'test.com', 'example.com', 'mailinator.com', 'tempmail.com', 'throwaway.com'];
    if (blockedDomains.includes(emailDomain)) {
        alert('Please enter a real email address.');
        return;
    }

    // 3. Validate message
    if (message === '') {
        alert('Please enter a message.');
        return;
    }
fetch('http://127.0.0.1:5000/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
})
.then(res => {
    if (res.status === 400) {
        alert('Your message was blocked. Please ensure your message is appropriate.');
        return;
    }
    if (res.status === 429) {
        alert('You have sent too many messages. Please try again later.');
        return;         
    }
    return res.json();
    })
.then(data => {
    if (!data) return;
    if (data.status === 'sent') {
        alert('Thank you for your message!');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }
    })
.catch(err => alert('Something went wrong. Please try again.'));
});


//Translate 
const translations = {
    en: {
        greeting: 'Hello! My name is',
        name: 'Anthony Rodriguez',
        tagline: 'Bridging the gap between business and technology!',
        'Technical Skills': 'Technical Skills 💻⚙️',
        'Business Skills': 'Business & Analytical Skills 💼🤝🏽',
        Education: 'Education 🎓',
        Projects: 'Projects 📋📊',
        contact: 'Contact Me',
        linkedin: 'My LinkedIn Profile',
        resume: 'My Resume',

        Bachelor: 'Bachelor of Science — Management Information Systems',
        Graduate: 'Graduated 2025',
        Associate: 'Associate of Science — Computer Science',
        'In Progress': 'In Progress (expected 2026)',
        study: 'Currently Studying',

        proj4title: 'Spookathon - Iota Xi Honor Society: Orange Coast College',
        proj4role: 'Full Stack Developer - Python, JavaScript, HTML, CSS',
        proj4a: 'Built a full-stack web application implementing 4 filtering parameters to retrieve real-time data.',
        proj4b: 'Troubleshot backend bugs and resolved Git merge conflicts in a 3 member setting, delivering a functioning prototype.',

        proj3title: 'Emergency Triage Application (System Analysis, Design) - Cal State Long Beach',
        proj3role: 'System Analyst & UI Prototype Designer - Domain Modeling, Use Case, Process Flow',
        proj3a: 'Applied structured system analysis and GUI prototyping to map symptom inputs to care recommendations.',
        proj3b: 'Developed technical documentation and process flows and presented the problem, idea, and solution.',

        proj2title: 'I.T. Competition - Mgmt Info Systems Student Association: Cal Polytechnic Pomona',
        proj2role: 'Penetration Tester & Team Lead - Nmap, GoBuster, DevTools',
        proj2a: 'Conducted reconnaissance and identified 10 security risks across Kubernetes, AWS, and on-premise systems using Kali Linux.',
        proj2b: 'Produced technical documentation on troubleshooting, risk score and presented actionable recommendations.',

        proj1title: 'Beach Hacks 8.0 - Association for Computing Machinery: Cal State Long Beach',
        proj1role: 'Frontend Developer - HTML, CSS, JavaScript',
        proj1a: 'Collaborated in a team of 4 developers to design and deliver a functional AI-driven stock analysis web app in 24 hours.',
        proj1b: 'Designed and implemented the front-end to create a responsive and user-friendly interface.',

        about: 'About Me',
        aboutText: 'My name is Anthony Rodriguez, a 2025 graduate of California State University, Long Beach with a B.S. in Management Information Systems and a current Computer Science student at Orange Coast College. I’m passionate about the intersection of technology, systems, and problem-solving, with experience in Python, C++, and full-stack development through academic and hackathon projects. My interests lie in cybersecurity and DevOps, where secure infrastructure, automation, and system reliability intersect. I’m currently preparing for the CompTIA Security+ to strengthen my foundation in security principles and defensive practices. Outside of technology, I enjoy baseball, gaming, and spending time outdoors with my five-year-old Husky.',

        submit: 'Submit',     
        placeholder: 'Type your message here...'

    },
    es: {
        greeting: '¡Hola! Mi nombre es',
        name: 'Anthony Rodriguez',
        tagline: '¡Conectando los negocios con la tecnología!',
        'Technical Skills': 'Habilidades Técnicas 💻⚙️',
        'Business Skills': 'Habilidades de Negocios y Análisis 💼🤝🏽',
        Education: 'Educación 🎓',
        Projects: 'Proyectos 📋📊',
        contact: 'Contáctame',
        linkedin: 'Mi Perfil de LinkedIn',
        resume: 'Mi Currículum',

        Bachelor: 'Licenciatura en Ciencias — Sistemas de Información Gerencial',
        Graduate: 'Graduado 2025',
        Associate: 'Asociado en Ciencias — Ciencias de la Computación',
        'In Progress': 'En Progreso (esperado 2026)',
        study: 'Actualmente Estudiando',

        proj4title: 'Spookathon - Sociedad de Honor Iota Xi: Orange Coast College',
        proj4role: 'Desarrollador Full Stack - Python, JavaScript, HTML, CSS',
        proj4a: 'Construí una aplicación web completa con 4 parámetros de filtrado para recuperar datos en tiempo real.',
        proj4b: 'Resolví errores de backend y conflictos de Git en un equipo de 3 personas, entregando un prototipo funcional.',

        proj3title: 'Aplicación de Triaje de Emergencias (Análisis y Diseño de Sistemas) - Cal State Long Beach',
        proj3role: 'Analista de Sistemas y Diseñador de Prototipos UI - Modelado de Dominio, Casos de Uso, Flujo de Proceso',
        proj3a: 'Apliqué análisis de sistemas estructurado y prototipado de GUI para mapear síntomas a recomendaciones de atención.',
        proj3b: 'Desarrollé documentación técnica y flujos de proceso y presenté el problema, la idea y la solución.',

        proj2title: 'Competencia de T.I. - Asociación de Estudiantes de Sistemas de Información: Cal Polytechnic Pomona',
        proj2role: 'Tester de Penetración y Líder de Equipo - Nmap, GoBuster, DevTools',
        proj2a: 'Realicé reconocimiento e identifiqué 10 riesgos de seguridad en Kubernetes, AWS y sistemas locales usando Kali Linux.',
        proj2b: 'Produje documentación técnica sobre solución de problemas, puntuación de riesgo y presenté recomendaciones.',

        proj1title: 'Beach Hacks 8.0 - Asociación para la Computación: Cal State Long Beach',
        proj1role: 'Desarrollador Frontend - HTML, CSS, JavaScript',
        proj1a: 'Colaboré en un equipo de 4 desarrolladores para diseñar y entregar una app web de análisis de acciones con IA en 24 horas.',
        proj1b: 'Diseñé e implementé el frontend para crear una interfaz responsiva y fácil de usar.',

        about: 'Sobre Mí',
        aboutText: 'Mi nombre es Anthony Rodriguez, graduado en 2025 de la Universidad Estatal de California en Long Beach con una licenciatura en Sistemas de Información Gerencial y actualmente estudiante de Ciencias de la Computación en Orange Coast College. Me apasiona la intersección entre la tecnología, los sistemas y la resolución de problemas, con experiencia en Python, C++ y desarrollo full-stack a través de proyectos académicos y hackatones. Mis intereses se centran en la ciberseguridad y DevOps, donde la infraestructura segura, la automatización y la confiabilidad de los sistemas se intersectan. Actualmente me estoy preparando para la certificación CompTIA Security+ para fortalecer mi base en principios de seguridad y prácticas de defensa. Fuera de la tecnología, disfruto el béisbol, los videojuegos y pasar tiempo al aire libre con mi Husky.',

        submit: 'Enviar',     
        placeholder: 'Escribe tu mensaje aquí...'
    }
};

let currentLang = 'en';

const langToggle = document.getElementById('language-toggle');

langToggle.addEventListener('click', () => {
    if (currentLang === 'en') {
        currentLang = 'es';
        langToggle.textContent = 'EN';
    } else {
        currentLang = 'en';
        langToggle.textContent = 'ES';
    }

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                el.placeholder = translations[currentLang][key];
        } else {
                el.textContent = translations[currentLang][key];
            }
        }
    });
});

//Custom Cursor hovering 
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
})
