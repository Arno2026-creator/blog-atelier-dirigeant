/* ============================================================
   L'Atelier du Dirigeant — JavaScript principal
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Menu mobile ─────────────────────────────────────── */
  function initMobileMenu() {
    const toggle = document.querySelector('.site-nav__toggle');
    const menu   = document.querySelector('.site-nav__menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fermer au clic en dehors
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Fermer avec Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── 2. Dropdown navigation ─────────────────────────────── */
  function initDropdowns() {
    const dropdownItems = document.querySelectorAll('.site-nav__item--dropdown');
    dropdownItems.forEach(function (item) {
      const link = item.querySelector('.site-nav__link');
      if (!link) return;

      // Toggle au clic sur mobile
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('is-open');
        }
      });
    });
  }

  /* ── 3. Header scroll effect ────────────────────────────── */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 80) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ── 4. Smooth scroll pour les ancres ───────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  /* ── 5. Filtrage des articles par catégorie ─────────────── */
  function initCategoryFilter() {
    const pills   = document.querySelectorAll('.category-pill');
    const cards   = document.querySelectorAll('.post-card');
    if (!pills.length || !cards.length) return;

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        const category = this.dataset.category;

        // Mettre à jour les pills
        pills.forEach(function (p) { p.classList.remove('category-pill--active'); });
        this.classList.add('category-pill--active');

        // Filtrer les cartes
        cards.forEach(function (card) {
          if (!category || category === 'all') {
            card.style.display = '';
            setTimeout(function () { card.style.opacity = '1'; }, 10);
          } else {
            const cardCat = card.dataset.category;
            if (cardCat === category) {
              card.style.display = '';
              setTimeout(function () { card.style.opacity = '1'; }, 10);
            } else {
              card.style.opacity = '0';
              setTimeout(function () { card.style.display = 'none'; }, 200);
            }
          }
        });
      });
    });
  }

  /* ── 6. Formulaires newsletter ──────────────────────────── */
  function initNewsletterForms() {
    const forms = document.querySelectorAll('[data-netlify="true"]');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn  = form.querySelector('button[type="submit"]');
        if (!emailInput) return;

        const email = emailInput.value.trim();
        if (!email || !isValidEmail(email)) {
          showFormMessage(form, 'Veuillez entrer une adresse email valide.', 'error');
          return;
        }

        // Désactiver le bouton pendant l'envoi
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Envoi…';
        }

        // Soumettre via fetch (Netlify Forms)
        const formData = new FormData(form);

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        })
        .then(function () {
          showFormMessage(form, '✅ Merci ! Vous êtes inscrit(e) à la newsletter.', 'success');
          form.reset();
        })
        .catch(function () {
          showFormMessage(form, '❌ Une erreur est survenue. Veuillez réessayer.', 'error');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Je m\'inscris gratuitement';
          }
        });
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(form, message, type) {
    // Supprimer l'ancien message
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.className = 'form-message form-message--' + type;
    msg.textContent = message;
    msg.style.cssText = [
      'margin-top: 0.75rem',
      'font-size: 0.875rem',
      'font-weight: 500',
      type === 'success' ? 'color: #22c55e' : 'color: #ef4444'
    ].join(';');

    form.appendChild(msg);

    // Auto-supprimer après 5s
    setTimeout(function () { msg.remove(); }, 5000);
  }

  /* ── 7. Lazy loading images ─────────────────────────────── */
  function initLazyImages() {
    if ('loading' in HTMLImageElement.prototype) return; // natif supporté

    const images = document.querySelectorAll('img[loading="lazy"]');
    if (!images.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    images.forEach(function (img) { observer.observe(img); });
  }

  /* ── 8. Barre de progression de lecture ─────────────────── */
  function initReadingProgress() {
    const article = document.querySelector('.post-content');
    if (!article) return;

    // Créer la barre
    const bar = document.createElement('div');
    bar.id = 'reading-progress';
    bar.style.cssText = [
      'position: fixed',
      'top: 70px',
      'left: 0',
      'height: 3px',
      'background: linear-gradient(90deg, #c9a84c, #e2c06a)',
      'width: 0%',
      'z-index: 99',
      'transition: width 0.1s linear',
      'pointer-events: none'
    ].join(';');
    document.body.appendChild(bar);

    window.addEventListener('scroll', function () {
      const articleTop    = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight  = window.innerHeight;
      const scrolled      = window.pageYOffset;

      const progress = Math.min(
        100,
        Math.max(0, ((scrolled - articleTop + windowHeight * 0.5) / articleHeight) * 100)
      );

      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ── 9. Copier le lien de l'article ─────────────────────── */
  function initCopyLink() {
    const copyBtns = document.querySelectorAll('[data-copy-link]');
    copyBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          const original = btn.textContent;
          btn.textContent = '✅ Lien copié !';
          setTimeout(function () { btn.textContent = original; }, 2000);
        });
      });
    });
  }

  /* ── 10. Netlify Identity ───────────────────────────────── */
  function initNetlifyIdentity() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', function (user) {
        if (!user) {
          window.netlifyIdentity.on('login', function () {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }

  /* ── 11. Animations au scroll ───────────────────────────── */
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.post-card, .section__header');
    if (!elements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function (el) {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  /* ── Init ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initDropdowns();
    initHeaderScroll();
    initSmoothScroll();
    initCategoryFilter();
    initNewsletterForms();
    initLazyImages();
    initReadingProgress();
    initCopyLink();
    initNetlifyIdentity();
    initScrollAnimations();
  });

})();