document.addEventListener('DOMContentLoaded', () => {
  const menuToggleButtons = document.querySelectorAll('[data-menu-toggle]');
  const menuCloseButtons = document.querySelectorAll('[data-menu-close]');
  const mobileSubmenuToggles = document.querySelectorAll('[data-mobile-submenu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const yearTargets = document.querySelectorAll('[data-year]');
  const hashLinks = document.querySelectorAll('a[href^="#"]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  const closeMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    menuToggleButtons.forEach((toggleButton) => {
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  };

  menuToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!mobileMenu) return;

      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
      document.body.classList.toggle('overflow-hidden', isHidden);

      menuToggleButtons.forEach((toggleButton) => {
        toggleButton.setAttribute('aria-expanded', String(isHidden));
      });
    });
  });

  menuCloseButtons.forEach((button) => {
    button.addEventListener('click', closeMobileMenu);
  });

  mobileSubmenuToggles.forEach((button) => {
    const panelId = button.getAttribute('aria-controls');
    if (!panelId) return;

    const panel = document.getElementById(panelId);
    if (!panel) return;

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      panel.classList.toggle('hidden', isExpanded);

      const icon = button.querySelector('[data-mobile-submenu-icon]');
      if (icon) {
        icon.classList.toggle('rotate-180', !isExpanded);
      }
    });
  });

  yearTargets.forEach((target) => {
    target.textContent = String(new Date().getFullYear());
  });

  hashLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href) return;

      event.preventDefault();

      if (href === '#') {
        window.scrollTo({ top: 0, behavior: scrollBehavior });
        if (mobileMenu && link.closest('#mobile-menu')) closeMobileMenu();
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });

      if (mobileMenu && link.closest('#mobile-menu')) closeMobileMenu();
    });
  });
});
