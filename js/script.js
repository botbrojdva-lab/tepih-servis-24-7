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
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      item.classList.toggle('is-open');
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
});
