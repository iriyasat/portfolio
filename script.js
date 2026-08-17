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

// --- Contact Form Handler (Self-Hosted Supabase & Ntfy) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm._subject.value.trim();
    const message = contactForm.message.value.trim();

    const supabaseUrl = 'https://supabase.iriyasat.dev/rest/v1/contact_messages';
    const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';

    try {
      // 1. Save message to self-hosted Supabase PostgreSQL DB
      const response = await fetch(supabaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      if (response.ok) {
        if (successMsg) successMsg.style.display = 'block';
        contactForm.reset();

        // 2. Send instant push notification to self-hosted Ntfy
        fetch('https://ntfy.iriyasat.dev/portfolio_contact', {
          method: 'POST',
          headers: {
            'Title': `New Message: ${name}`,
            'Priority': 'high'
          },
          body: `From: ${name} (${email})\nSubject: ${subject}\n\n${message}`
        }).catch(() => {});
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
      }
    } catch (err) {
      if (errorMsg) errorMsg.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
    }
  });
}

