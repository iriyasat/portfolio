// --- Mobile Navigation Menu ---
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

// --- Header Scroll State Toggler ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Typing Animation (Subtitles) ---
const typingText = document.querySelector('.typing-text');
const words = ["Software Systems.", "IoT Hardware.", "AI Prompt Engineering.", "Web Research."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
  const currentWord = words[wordIndex];
  
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
    wordIndex = (wordIndex + 1) % words.length;
    typingDelay = 500; // Pause before starting next word
  }
  
  setTimeout(type, typingDelay);
}

// Start typing animation on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  if (typingText) {
    setTimeout(type, 1000);
  }
});

