/* ========================================
   Wah-Pak Global Trading Limited
   B2B Auto Trade Website - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initRevealAnimations();
  initSmoothScroll();
  initModal();
  initCategoryFilter();
  initProductCardClick();
  initCurrentPageHighlight();
  initFormSubmit();
  initStatCounter();
});

/* ---------- Header Scroll Effect ---------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Trigger on load
  if (window.scrollY > 50) header.classList.add('scrolled');
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

/* ---------- Reveal on Scroll ---------- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 100;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Image Modal / Lightbox ---------- */
function initModal() {
  const modal = document.getElementById('imageModal');
  if (!modal) return;

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.modal-close');

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
}

function openModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImg = modal?.querySelector('img');
  if (!modal || !modalImg) return;

  modalImg.src = src;
  modal.classList.add('active');
}

/* ---------- Product Card Click ---------- */
function initProductCardClick() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) openModal(img.src);
    });
  });
}

/* ---------- Category Filter ---------- */
function initCategoryFilter() {
  const tabs = document.querySelectorAll('.category-tab');
  const cards = document.querySelectorAll('.product-card[data-category]');
  if (tabs.length === 0 || cards.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ---------- Current Page Highlight ---------- */
function initCurrentPageHighlight() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace(/\/$/, ''))) {
      link.classList.add('active');
    }
  });

  // Home page special case
  if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/wahpak-site/')) {
    const homeLink = document.querySelector('.nav-links a[href="index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }
}

/* ---------- Form Submit ---------- */
function initFormSubmit() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate submission
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#22c55e';
      this.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

/* ---------- Stat Counter Animation ---------- */
function initStatCounter() {
  const stats = document.querySelectorAll('.hero-stat h3');
  if (stats.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count) || parseInt(el.textContent.replace(/[^0-9]/g, ''));
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => {
    const text = stat.textContent;
    const num = parseInt(text.replace(/[^0-9]/g, ''));
    stat.dataset.count = num;
    stat.textContent = '0+';
    observer.observe(stat);
  });
}

function animateCount(el, target) {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + '+';
  }, 16);
}

/* ---------- Lazy Loading Images ---------- */
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.src = img.dataset.src || img.src;
  });
}
