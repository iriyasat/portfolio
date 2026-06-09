// --- Custom Cursor ---
const cursor = document.querySelector('.custom-cursor');
const cursorOutline = document.querySelector('.custom-cursor-outline');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  cursorOutline.animate({
    left: e.clientX + 'px',
    top: e.clientY + 'px'
  }, { duration: 500, fill: "forwards" });
});

// Cursor Hover Effects
const hoverables = document.querySelectorAll('a, button, .trivia-opt, input, textarea');
hoverables.forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    cursorOutline.classList.add('hovered');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    cursorOutline.classList.remove('hovered');
  });
});

// --- Mobile Navigation ---
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
  });
});

// --- Header Scroll Effect ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Typing Animation ---
const typingText = document.querySelector('.typing-text');
const wordsEN = ["Software Systems.", "IoT Hardware.", "AI Prompt Engineering.", "Web Research."];
const wordsES = ["Sistemas de Software.", "Hardware de IoT.", "Ingeniería de Prompts.", "Investigación Web."];
let currentWords = wordsEN;
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
  const currentWord = currentWords[wordIndex];
  
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 120;
  }
  
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause at the end of the word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % currentWords.length;
    typingDelay = 500; // Pause before starting next word
  }
  
  setTimeout(type, typingDelay);
}

// Start typing
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
  initTrivia();
});

// --- Language Toggle Logic ---
const langToggleBtn = document.getElementById('lang-toggle');
const langText = langToggleBtn.querySelector('.lang-text');
let currentLang = 'EN';

langToggleBtn.addEventListener('click', () => {
  currentLang = currentLang === 'EN' ? 'ES' : 'EN';
  langText.textContent = currentLang;
  
  // Toggle typing animation language arrays
  currentWords = currentLang === 'EN' ? wordsEN : wordsES;
  wordIndex = 0;
  charIndex = 0;
  isDeleting = false;
  
  // Update all translations in the page
  document.querySelectorAll('[data-en]').forEach(element => {
    element.textContent = element.getAttribute(`data-${currentLang.toLowerCase()}`);
  });
  
  // Reload trivia with translations
  updateTriviaQuestion();
});

// --- Real Madrid Trivia Interactive Widget ---
const triviaQuestions = [
  {
    num: { EN: "Question 1 of 3", ES: "Pregunta 1 de 3" },
    q: {
      EN: "How many UEFA Champions League titles has Real Madrid won?",
      ES: "¿Cuántas copas de la UEFA Champions League ha ganado el Real Madrid?"
    },
    options: ["13", "14", "15", "16"],
    correct: "15",
    feedback: {
      success: { EN: "¡Correct! La Decimoquinta was secured in Wembley in 2024! 🏆", ES: "¡Correcto! ¡La Decimoquinta se consiguió en Wembley en 2024! 🏆" },
      fail: { EN: "Wrong! They have won it 15 times! Hala Madrid! 👑", ES: "¡Incorrecto! ¡La han ganado 15 veces! ¡Hala Madrid! 👑" }
    }
  },
  {
    num: { EN: "Question 2 of 3", ES: "Pregunta 2 de 3" },
    q: {
      EN: "Who is Real Madrid's all-time top goalscorer?",
      ES: "¿Quién es el máximo goleador histórico del Real Madrid?"
    },
    options: ["Raúl", "Karim Benzema", "Cristiano Ronaldo", "Alfredo Di Stéfano"],
    correct: "Cristiano Ronaldo",
    feedback: {
      success: { EN: "¡SIIIIU! Cristiano Ronaldo scored 450 goals in 438 games! 🐐", ES: "¡SIIIIU! ¡Cristiano Ronaldo marcó 450 goles en 438 partidos! 🐐" },
      fail: { EN: "Incorrect! It's Cristiano Ronaldo (450 goals). ⚽", ES: "¡Incorrecto! Es Cristiano Ronaldo (450 goles). ⚽" }
    }
  },
  {
    num: { EN: "Question 3 of 3", ES: "Pregunta 3 de 3" },
    q: {
      EN: "In which year was Real Madrid C.F. officially founded?",
      ES: "¿En qué año se fundó oficialmente el Real Madrid C.F.?"
    },
    options: ["1899", "1902", "1905", "1910"],
    correct: "1902",
    feedback: {
      success: { EN: "Correct! March 6, 1902. A legendary club was born! 💫", ES: "¡Correcto! 6 de marzo de 1902. ¡Nació un club legendario! 💫" },
      fail: { EN: "Wrong! Real Madrid was founded in 1902. ⚪", ES: "¡Incorrecto! El Real Madrid se fundó en 1902. ⚪" }
    }
  }
];

let triviaIndex = 0;
let hasAnswered = false;

const triviaQNum = document.getElementById('trivia-q-num');
const triviaQ = document.getElementById('trivia-q');
const triviaOptsContainer = document.getElementById('trivia-opts');
const triviaFeedback = document.getElementById('trivia-feed');
const triviaNextBtn = document.getElementById('trivia-next');

function initTrivia() {
  triviaIndex = 0;
  updateTriviaQuestion();
  
  triviaNextBtn.addEventListener('click', () => {
    triviaIndex++;
    if (triviaIndex >= triviaQuestions.length) {
      // Loop back or end
      triviaIndex = 0;
    }
    updateTriviaQuestion();
  });
}

function updateTriviaQuestion() {
  hasAnswered = false;
  triviaFeedback.textContent = '';
  triviaFeedback.className = 'trivia-feedback';
  triviaNextBtn.classList.add('d-none');
  
  const currentQ = triviaQuestions[triviaIndex];
  
  // Set question number and text based on language
  triviaQNum.textContent = currentQ.num[currentLang];
  triviaQ.textContent = currentQ.q[currentLang];
  
  // Clear and populate options
  triviaOptsContainer.innerHTML = '';
  currentQ.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'trivia-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleTriviaSelect(btn, opt));
    
    // Wire up cursor hover triggers on newly created buttons
    btn.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorOutline.classList.add('hovered');
    });
    btn.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      cursorOutline.classList.remove('hovered');
    });
    
    triviaOptsContainer.appendChild(btn);
  });
}

function handleTriviaSelect(selectedBtn, optionVal) {
  if (hasAnswered) return;
  hasAnswered = true;
  
  const currentQ = triviaQuestions[triviaIndex];
  const isCorrect = optionVal === currentQ.correct;
  
  // Style selected option
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    triviaFeedback.textContent = currentQ.feedback.success[currentLang];
    triviaFeedback.className = 'trivia-feedback correct';
  } else {
    selectedBtn.classList.add('incorrect');
    triviaFeedback.textContent = currentQ.feedback.fail[currentLang];
    triviaFeedback.className = 'trivia-feedback incorrect';
    
    // Highlight correct one
    Array.from(triviaOptsContainer.children).forEach(btn => {
      if (btn.textContent === currentQ.correct) {
        btn.classList.add('correct');
      }
    });
  }
  
  // Show Next button
  triviaNextBtn.classList.remove('d-none');
}

// --- Contact Form Submission Handler ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const data = new FormData(contactForm);
  formStatus.textContent = currentLang === 'EN' ? 'Sending message...' : 'Enviando mensaje...';
  formStatus.className = 'form-status';
  
  // Submit via AJAX to Formspree (or whatever action url is configured on the form)
  fetch(contactForm.action, {
    method: 'POST',
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      formStatus.textContent = currentLang === 'EN' ? 'Message sent successfully! Check your inbox soon.' : '¡Mensaje enviado con éxito! Revise su correo pronto.';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      response.json().then(data => {
        if (data && data.errors) {
          formStatus.textContent = data.errors.map(error => error.message).join(", ");
        } else {
          formStatus.textContent = currentLang === 'EN' ? 'Oops! There was a problem submitting your form.' : '¡Ups! Hubo un problema al enviar el formulario.';
        }
        formStatus.className = 'form-status error';
      });
    }
  }).catch(error => {
    formStatus.textContent = currentLang === 'EN' ? 'Oops! Connection error. Please try again.' : '¡Ups! Error de conexión. Inténtelo de nuevo.';
    formStatus.className = 'form-status error';
  });
});
