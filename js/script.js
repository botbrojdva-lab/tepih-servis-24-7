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

  const contactForm = document.querySelector('#kontakt-forma');
  if (contactForm) {
    const isPlaceholderForm = contactForm.action.includes('YOUR_FORM_ID');
    contactForm.addEventListener('submit', (event) => {
      if (isPlaceholderForm) {
        event.preventDefault();
        window.alert('Pre slanja upita potrebno je da vlasnik sajta unese Formspree ID forme.');
        return;
      }

      window.sessionStorage.setItem('kontakt-upit-poslat', '1');
    });

    const statusMessage = document.querySelector('#forma-poruka');
    const searchParams = new URLSearchParams(window.location.search);
    const wasFormSubmitted = window.sessionStorage.getItem('kontakt-upit-poslat') === '1';
    if (statusMessage && wasFormSubmitted && searchParams.get('submitted') === '1') {
      statusMessage.hidden = false;
      window.sessionStorage.removeItem('kontakt-upit-poslat');
    }
  }
});
