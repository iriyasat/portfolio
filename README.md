# 💫 Ibrahim Hasan | Personal Portfolio

Welcome to the repository for my personal developer portfolio website. This is a premium, responsive, dark-mode single-page website displaying my software systems engineering projects, hardware IoT systems, freelancing experience, and academic certifications.

🌐 **Live URL**: [https://iriyasat.dev](https://iriyasat.dev)  
🏠 **Local Development**: `http://localhost` (via WSL Nginx)

---

## 🚀 Key Features

* **Dual-Language Localization (EN/ES)**: Built-in instant translation switcher between English and Spanish that dynamically rewrites the copy across all sections (including the typing script).
* **Interactive Real Madrid C.F. Trivia**: A custom mini-quiz widget featuring trivia questions about Real Madrid C.F., loaded with real-time answer verification and language translations.
* **Responsive Experience Timeline**: An interactive vertical timeline showcasing my professional roles (PeoplePerHour freelancing, tutoring, and university sports coordination).
* **High-End Aesthetics**:
  * Glowing radial background spheres that pulse dynamically.
  * Custom cursor trailing outline that responds to links/buttons.
  * Glassmorphism layout styling utilizing native CSS variables.
  * Floating animated badge elements.

---

## 🛠️ Technology Stack

* **Structure**: HTML5 (Semantic elements, metadata optimization)
* **Styling**: Vanilla CSS3 (Custom properties, grid systems, keyframe animations, responsive media queries)
* **Logic & Interactions**: Vanilla JavaScript (ES6+, DOM manipulation, typing animations, interactive state managers)
* **Assets**: AI-generated futuristic vector art & SVG icons
* **Hosting**: GitHub Pages
* **SSL Certificate**: Let's Encrypt (Automated SSL/TLS provisioning)
* **Form Submissions**: AJAX fetch integration with Formspree (delivers contact submissions directly to `ihriyasat@gmail.com`)

---

## 📁 File Structure

```text
portfolio/
├── assets/
│   ├── avatar.png       # Restored holographic globe system visual (Hero)
│   ├── profile.jpg      # Professional profile photo (About Me)
│   └── cv.pdf           # Curriculum Vitae (Ibrahim Hasan_CV.pdf)
├── index.html           # Main home page structure
├── style.css            # Custom CSS rules and variables
├── script.js            # Translation, trivia widget, custom cursor & typing logic
├── .gitignore           # Ignores raw local files
└── README.md            # Repository documentation
```

---

## 💻 Local Development Setup

To run and edit this project locally, simply clone the repository and serve it using a lightweight web server:

```bash
# Clone the repository
git clone https://github.com/iriyasat/portfolio.git

# Navigate into the project folder
cd portfolio
```

### Hosting Locally on Linux Subsystem (WSL) with Nginx:
Since my active environment runs Nginx inside WSL, changes are synced directly to the Nginx root directory:

```bash
# Sync files to WSL Nginx root
wsl sudo cp -r /mnt/c/Users/Admin/portfolio/* /var/www/html/

# Reload Nginx to apply changes
wsl sudo systemctl reload nginx
```

Once synced, visit `http://localhost` on your Windows browser.

---

## 📪 Contact Form Customization

The contact form is pre-configured with AJAX handling inside `script.js` to submit directly to Formspree. To change the recipient email address:
1. Register a free account on [Formspree.io](https://formspree.io).
2. Create a form and copy the unique **Form ID**.
3. Replace the `action` attribute in `index.html` around line 335:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID_HERE" method="POST">
   ```
4. Commit and push the changes!
