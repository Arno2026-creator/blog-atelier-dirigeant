// ============================================
// L'ATELIER DU DIRIGEANT — Blog JS
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- HAMBURGER MENU ----
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // ---- ACTIVE NAV ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .cat-tab').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- NEWSLETTER FORM ----
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (email && email.value) {
        btn.textContent = '✓ Inscription enregistrée !';
        btn.style.background = '#38A169';
        email.value = '';
        setTimeout(() => {
          btn.textContent = "Je m'inscris";
          btn.style.background = '';
        }, 3500);
      }
    });
  });

  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- READING TIME ----
  const articleContent = document.querySelector('.article-content');
  if (articleContent) {
    const words = articleContent.innerText.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 220));
    const readEl = document.querySelector('.read-time');
    if (readEl) readEl.textContent = minutes + ' min de lecture';
  }

  // ---- BACK TO TOP ----
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.style.opacity = window.scrollY > 400 ? '1' : '0';
      backTop.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});