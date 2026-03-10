# Anthony Rodriguez — Portfolio Website

A personal portfolio website built from scratch using HTML, CSS, JavaScript, and Python (Flask).
Designed with a cyber/dark theme to showcase my technical and business skills.

## 🌐 Live Site
[https://kumo-ops.github.io/portfolio](https://kumo-ops.github.io/portfolio)

##POSSIBLE ISSUE 
- contact email render 

## 🛠️ Built With
- HTML5
- CSS3
- JavaScript
- Python (Flask)
- Flask-Mail
- Flask-Limiter
- Flask-CORS

## ✨ Features
- Animated gradient hero section
- Dark / Light mode toggle
- English / Spanish language toggle
- Custom glowing cyber cursor
- Smooth scrolling navigation
- Skill cards with hover tooltips
- Contact form with:
  - Email validation
  - Malicious content detection (SQL injection, XSS, spam, threats)
  - Rate limiting (Flask-Limiter)
  - Flask email server
- Mobile responsive design
- Education section with degree highlights
- Project/Experience section

## 📁 Project Structure
```
Portfolio/
├── index.html
├── style.css
├── script.js
├── server.py
├── devicon.min.css
├── .gitignore
├── README.md
├── Anthony_Rodriguez.pdf
└── Images/
```

## 🚀 Running Locally

### Frontend
Open `index.html` with Live Server in VS Code.

### Backend
```bash
pip install flask flask-mail flask-cors flask-limiter python-dotenv
python server.py
```

Create a `.env` file with:
```
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

## 📬 Contact
- LinkedIn: [linkedin.com/in/techrodanthony](https://www.linkedin.com/in/techrodanthony/)
- GitHub: [github.com/Kumo-ops](https://github.com/Kumo-ops)
