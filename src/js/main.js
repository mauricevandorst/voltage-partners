document.addEventListener('DOMContentLoaded', () => {
  const menuToggleButtons = document.querySelectorAll('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const yearTargets = document.querySelectorAll('[data-year]');

  menuToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!mobileMenu) return;

      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', !isHidden);
      button.setAttribute('aria-expanded', String(isHidden));
    });
  });

  yearTargets.forEach((target) => {
    target.textContent = String(new Date().getFullYear());
  });
});