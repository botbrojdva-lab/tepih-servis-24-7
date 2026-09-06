// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mainNav = document.querySelector('[data-main-nav]');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      const answer = item.querySelector('.faq-answer');
      if (!answer) return;

      item.classList.toggle('is-open');
      const isOpen = item.classList.contains('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        answer.style.setProperty('--faq-max-height', `${answer.scrollHeight}px`);
      } else {
        answer.style.setProperty('--faq-max-height', '0px');
      }
    });
  });

  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (mainNav && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const contactForm = document.querySelector('form[action*="YOUR_FORM_ID"]');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      window.alert('Pre slanja upita potrebno je da vlasnik sajta unese Formspree ID forme.');
    });
  }
});
