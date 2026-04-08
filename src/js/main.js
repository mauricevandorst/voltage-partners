document.addEventListener('DOMContentLoaded', () => {
  const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  const lockedViewportUnit = viewportHeight * 0.01;
  document.documentElement.style.setProperty('--vh-locked', `${lockedViewportUnit}px`);

  const menuToggleButtons = document.querySelectorAll('[data-menu-toggle]');
  const menuCloseButtons = document.querySelectorAll('[data-menu-close]');
  const mobileSubmenuToggles = document.querySelectorAll('[data-mobile-submenu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuPanel = mobileMenu ? mobileMenu.querySelector('[data-mobile-menu-panel]') : null;
  const mobileMenuItems = mobileMenu ? Array.from(mobileMenu.querySelectorAll('[data-mobile-menu-item]')) : [];
  const yearTargets = document.querySelectorAll('[data-year]');
  const hashLinks = document.querySelectorAll('a[href^="#"]');
  const werkwijzeIcon = document.querySelector('[data-werkwijze-icon]');
  const werkwijzeButton = werkwijzeIcon ? werkwijzeIcon.closest('.btn-glass-pill') : null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  let mobileMenuAnimations = [];

  const stopMobileMenuAnimations = () => {
    mobileMenuAnimations.forEach((animation) => {
      animation.cancel();
    });
    mobileMenuAnimations = [];
  };

  const animateMobileMenuEnter = () => {
    if (!mobileMenu || prefersReducedMotion) return;

    stopMobileMenuAnimations();

    if (mobileMenuPanel) {
      const panelAnimation = mobileMenuPanel.animate(
        [
          { opacity: 0, transform: 'translateY(52px) rotate(-1.4deg) scale(0.985)' },
          { opacity: 1, transform: 'translateY(0px) rotate(0deg) scale(1)' }
        ],
        {
          duration: 520,
          easing: 'cubic-bezier(0.2, 0.85, 0.22, 1)',
          fill: 'both'
        }
      );
      mobileMenuAnimations.push(panelAnimation);
    }

    mobileMenuItems.forEach((item, index) => {
      const itemAnimation = item.animate(
        [
          { opacity: 0, transform: 'translateY(36px)' },
          { opacity: 1, transform: 'translateY(-4px)', offset: 0.72 },
          { opacity: 1, transform: 'translateY(0px)' }
        ],
        {
          duration: 560,
          delay: 110 + index * 55,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      mobileMenuAnimations.push(itemAnimation);
    });
  };

  const closeMobileMenu = () => {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    stopMobileMenuAnimations();
    document.body.classList.remove('overflow-hidden');
    menuToggleButtons.forEach((toggleButton) => {
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  };

  menuToggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!mobileMenu) return;

      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        animateMobileMenuEnter();
      } else {
        closeMobileMenu();
      }

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

  if (werkwijzeIcon) {
    let introAnimation = null;
    let activePointerId = null;
    let pointerStartX = 0;
    let swipeDeltaX = 0;
    let hasReachedSwipeEnd = false;
    const maxSwipeDistance = 44;

    const setIconTransform = (deltaX) => {
      const clampedDeltaX = Math.max(0, Math.min(maxSwipeDistance, deltaX));
      werkwijzeIcon.style.transform = `translateX(${clampedDeltaX}px)`;
    };

    const setPressedState = (isPressed) => {
      if (!werkwijzeButton) return;
      werkwijzeButton.classList.toggle('bg-white/30', isPressed);
      werkwijzeButton.classList.toggle('border-white/60', isPressed);
      werkwijzeButton.classList.toggle('translate-y-0', isPressed);
    };

    const resetSwipeState = () => {
      setPressedState(false);
      werkwijzeIcon.style.transition = 'transform 280ms ease';
      setIconTransform(0);
      window.setTimeout(() => {
        werkwijzeIcon.style.transition = '';
      }, 280);
      swipeDeltaX = 0;
      hasReachedSwipeEnd = false;
      activePointerId = null;
    };

    werkwijzeIcon.style.touchAction = 'pan-y';

    werkwijzeIcon.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (introAnimation) {
        introAnimation.cancel();
        introAnimation = null;
      }

      activePointerId = event.pointerId;
      pointerStartX = event.clientX;
      swipeDeltaX = 0;
      hasReachedSwipeEnd = false;
      setPressedState(true);
      werkwijzeIcon.style.transition = '';
      werkwijzeIcon.setPointerCapture(event.pointerId);
    });

    werkwijzeIcon.addEventListener('pointermove', (event) => {
      if (event.pointerId !== activePointerId) return;
      event.preventDefault();
      swipeDeltaX = Math.max(0, event.clientX - pointerStartX);
      setIconTransform(swipeDeltaX);
      hasReachedSwipeEnd = swipeDeltaX >= maxSwipeDistance;
    });

    werkwijzeIcon.addEventListener('pointerup', (event) => {
      if (event.pointerId !== activePointerId) return;
      if (hasReachedSwipeEnd && werkwijzeButton) {
        werkwijzeButton.click();
      }
      resetSwipeState();
    });

    werkwijzeIcon.addEventListener('pointercancel', (event) => {
      if (event.pointerId !== activePointerId) return;
      resetSwipeState();
    });

    if (!prefersReducedMotion) {
      window.setTimeout(() => {
        introAnimation = werkwijzeIcon.animate(
          [
            { transform: 'translateX(0) rotate(0deg)' },
            { transform: 'translateX(8px) rotate(180deg)' },
            { transform: 'translateX(0) rotate(360deg)' }
          ],
          {
            duration: 1800,
            easing: 'ease-in-out',
            iterations: 1
          }
        );
      }, 1000);
    }
  }
});
