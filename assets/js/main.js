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
      '.sqs-block, .gallery-grid-item, .blog-item, .blog-card, .list-item'
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

  // 5. Blog Carousel Functionality
  document.querySelectorAll('.blog-carousel').forEach(carousel => {
    const track = carousel.querySelector('.blog-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.blog-carousel-slide'));
    const prevBtn = carousel.querySelector('.blog-carousel-prev');
    const nextBtn = carousel.querySelector('.blog-carousel-next');
    const dots = Array.from(carousel.querySelectorAll('.blog-carousel-dot'));
    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
        dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(i);
      });
    });

    // Touch swipe navigation
    let startX = 0;
    let endX = 0;
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
      }
    }, { passive: true });

    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
      }
    });
  });

  // 6. Native HLS video support with automatic fallback
  const hlsVideos = document.querySelectorAll('video[data-hls-src]');
  if (hlsVideos.length > 0) {
    hlsVideos.forEach(video => {
      const src = video.dataset.hlsSrc;
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      } else {
        if (!window.Hls) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
          script.onload = () => {
            if (window.Hls && Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(src);
              hls.attachMedia(video);
            }
          };
          document.head.appendChild(script);
        } else if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
        }
      }
    });
  }
});
