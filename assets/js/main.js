// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (toggleBtn && siteNav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = siteNav.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('is-open') && !siteNav.contains(e.target) && !toggleBtn.contains(e.target)) {
        siteNav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close when clicking nav link
    siteNav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-link').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Handle mobile dropdown toggle click
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  if (dropdownToggle && window.innerWidth <= 991) {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = dropdownToggle.closest('.has-dropdown');
      parent.classList.toggle('mobile-expanded');
    });
  }

  // Form submit state
  const forms = document.querySelectorAll('.site-form');
  forms.forEach(form => {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Submitting...';
      }
    });
  });
});
