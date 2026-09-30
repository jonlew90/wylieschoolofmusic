// Navigation & Interactive Enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Ensure animation state is booted immediately to prevent any deferred rendering delay
  document.body.setAttribute('data-animation-state', 'booted');

  // Reveal all gallery grid images immediately
  document.querySelectorAll('.gallery-grid-item').forEach(item => {
    item.setAttribute('data-show', 'true');
  });

  // 1. Mobile Burger Toggle for Squarespace Header
  const burgerBtns = document.querySelectorAll('.header-burger-btn, [data-test="header-burger"]');
  const body = document.body;

  burgerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = body.classList.toggle('header--menu-open');
      btn.classList.toggle('burger--active', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  // Close mobile menu when clicking outside or clicking any nav link
  document.addEventListener('click', (e) => {
    if (body.classList.contains('header--menu-open')) {
      const menu = document.querySelector('.header-menu');
      const isClickInsideBurger = Array.from(burgerBtns).some(b => b.contains(e.target));
      if (menu && !menu.contains(e.target) && !isClickInsideBurger) {
        body.classList.remove('header--menu-open');
        burgerBtns.forEach(b => {
          b.classList.remove('burger--active');
          b.setAttribute('aria-expanded', 'false');
        });
      }
    }
  });

  document.querySelectorAll('.header-menu-nav-item a, .header-menu-nav-folder-item a').forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('header--menu-open');
      burgerBtns.forEach(b => {
        b.classList.remove('burger--active');
        b.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Mobile menu folder expansion
  document.querySelectorAll('.header-menu-nav-item a[data-folder-id]').forEach(folderTitle => {
    folderTitle.addEventListener('click', (e) => {
      e.preventDefault();
      const folderId = folderTitle.getAttribute('data-folder-id');
      const targetFolder = document.querySelector(`.header-menu-nav-folder[data-folder="${folderId}"]`);
      if (targetFolder) {
        targetFolder.classList.toggle('header-menu-nav-folder--active');
      }
    });
  });

  // 2. Desktop Dropdown Toggle on Hover & Focus
  const desktopFolderTitles = document.querySelectorAll('.header-nav-folder-title');
  desktopFolderTitles.forEach(title => {
    const parent = title.closest('.header-nav-item--folder');
    if (!parent) return;

    parent.addEventListener('mouseenter', () => {
      parent.classList.add('has-subnav');
      title.setAttribute('aria-expanded', 'true');
    });

    parent.addEventListener('mouseleave', () => {
      parent.classList.remove('has-subnav');
      title.setAttribute('aria-expanded', 'false');
    });
  });

  // 3. Form submit state
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (btn) {
        btn.disabled = true;
        if (btn.tagName === 'INPUT') {
          btn.value = 'Submitting...';
        } else {
          btn.textContent = 'Submitting...';
        }
      }
    });
  });

  // 4. Scroll-Driven Fade-In Animations (Squarespace Parity)
  if ('IntersectionObserver' in window) {
    const animatableElements = document.querySelectorAll(
      '.sqs-block, .gallery-grid-item, .blog-card, .list-item'
    );
    const vh = window.innerHeight || document.documentElement.clientHeight;

    const scrollObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    });

    animatableElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Elements already above or within the initial viewport display immediately without delay
      if (rect.top < vh - 20) {
        el.classList.add('is-visible');
      } else {
        el.classList.add('scroll-fade');
        scrollObserver.observe(el);
      }
    });
  }
});
