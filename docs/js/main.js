document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  const lockedViewportUnit = viewportHeight * 0.01;
  document.documentElement.style.setProperty('--vh-locked', `${lockedViewportUnit}px`);

  const menuToggleButtons = document.querySelectorAll('[data-menu-toggle]');
  const menuCloseButtons = document.querySelectorAll('[data-menu-close]');
  const mobileSubmenuToggles = document.querySelectorAll('[data-mobile-submenu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = mobileMenu ? mobileMenu.querySelector('[data-mobile-menu-backdrop]') : null;
  const mobileMenuPanel = mobileMenu ? mobileMenu.querySelector('[data-mobile-menu-panel]') : null;
  const mobileMenuItems = mobileMenu ? Array.from(mobileMenu.querySelectorAll('[data-mobile-menu-item]')) : [];
  const navbar = document.querySelector('[data-navbar]');
  const navbarItems = navbar ? Array.from(navbar.querySelectorAll('[data-navbar-item]')) : [];
  const heroSection = document.querySelector('[data-hero-section]');
  const heroFrame = heroSection ? heroSection.querySelector('[data-hero-frame]') : null;
  const heroTextItems = heroSection ? Array.from(heroSection.querySelectorAll('[data-hero-text-item]')) : [];
  const heroPill = heroSection ? heroSection.querySelector('[data-hero-pill]') : null;
  const heroCtaButtons = heroSection ? Array.from(heroSection.querySelectorAll('[data-hero-cta]')) : [];
  const heroCards = heroSection ? Array.from(heroSection.querySelectorAll('[data-hero-card]')) : [];
  const heroAside = heroSection ? heroSection.querySelector('[data-hero-aside]') : null;
  const yearTargets = document.querySelectorAll('[data-year]');
  const hashLinks = document.querySelectorAll('a[href^="#"]');
  const stickyHeader = document.querySelector('header.sticky');
  const werkwijzeIcon = document.querySelector('[data-werkwijze-icon]');
  const werkwijzeButton = werkwijzeIcon ? werkwijzeIcon.closest('.btn-glass-pill') : null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
  let mobileMenuAnimations = [];
  let navbarAnimations = [];
  let heroAnimations = [];
  let hasHeroAnimated = false;
  let isMobileMenuClosing = false;

  const stopMobileMenuAnimations = () => {
    mobileMenuAnimations.forEach((animation) => {
      animation.cancel();
    });
    mobileMenuAnimations = [];
  };

  const stopNavbarAnimations = () => {
    navbarAnimations.forEach((animation) => {
      animation.cancel();
    });
    navbarAnimations = [];
  };

  const stopHeroAnimations = () => {
    heroAnimations.forEach((animation) => {
      animation.cancel();
    });
    heroAnimations = [];
  };

  const animateNavbarEnter = () => {
    if (!navbar || prefersReducedMotion) return;

    stopNavbarAnimations();

    const headerAnimation = navbar.animate(
      [
        { opacity: 0, transform: 'translateY(-22px)' },
        { opacity: 1, transform: 'translateY(0px)' }
      ],
      {
        duration: 560,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'both'
      }
    );
    navbarAnimations.push(headerAnimation);

    navbarItems.forEach((item, index) => {
      const itemAnimation = item.animate(
        [
          { opacity: 0, transform: 'translateY(-18px)' },
          { opacity: 1, transform: 'translateY(3px)', offset: 0.72 },
          { opacity: 1, transform: 'translateY(0px)' }
        ],
        {
          duration: 520,
          delay: 120 + index * 46,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      navbarAnimations.push(itemAnimation);
    });
  };

  const animateHeroEnter = () => {
    if (!heroSection || prefersReducedMotion) return;

    stopHeroAnimations();

    const playfulRiseFrames = [
      { opacity: 0, transform: 'translateY(52px)' },
      { opacity: 1, transform: 'translateY(-8px)', offset: 0.72 },
      { opacity: 1, transform: 'translateY(0px)' }
    ];
    const playfulPillRiseFrames = [
      { opacity: 0, transform: 'translateY(28px)' },
      { opacity: 1, transform: 'translateY(-6px)', offset: 0.72 },
      { opacity: 1, transform: 'translateY(0px)' }
    ];

    if (heroFrame) {
      const frameAnimation = heroFrame.animate(
        [
          { opacity: 0 },
          { opacity: 1, offset: 0.74 },
          { opacity: 1 }
        ],
        {
          duration: 980,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      heroAnimations.push(frameAnimation);
    }

    heroTextItems.forEach((item, index) => {
      const textAnimation = item.animate(
        playfulRiseFrames,
        {
          duration: 940,
          delay: 220 + index * 170,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      heroAnimations.push(textAnimation);
    });

    if (heroPill) {
      const pillAnimation = heroPill.animate(
        playfulPillRiseFrames,
        {
          duration: 980,
          delay: 560,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      heroAnimations.push(pillAnimation);
    }

    heroCtaButtons.forEach((button, index) => {
      const ctaAnimation = button.animate(
        playfulRiseFrames,
        {
          duration: 920,
          delay: 760 + index * 130,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      heroAnimations.push(ctaAnimation);
    });

    heroCards.forEach((card, index) => {
      const cardAnimation = card.animate(
        playfulRiseFrames,
        {
          duration: 980,
          delay: 980 + index * 130,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      heroAnimations.push(cardAnimation);
    });

    if (heroAside) {
      const asideAnimation = heroAside.animate(
        playfulRiseFrames,
        {
          duration: 1040,
          delay: 700,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'both'
        }
      );
      heroAnimations.push(asideAnimation);
    }
  };

  const triggerHeroAnimation = () => {
    if (hasHeroAnimated) return;
    hasHeroAnimated = true;
    animateHeroEnter();
  };

  const getAnchorOffset = () => {
    if (!stickyHeader) return 0;
    return Math.ceil(stickyHeader.getBoundingClientRect().height) + 8;
  };

  const scrollToAnchorTarget = (target) => {
    const targetTop = target.getBoundingClientRect().top + window.scrollY - getAnchorOffset();
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: scrollBehavior
    });
  };

  const getHashTarget = (hash) => {
    if (!hash || hash === '#') return null;

    try {
      return document.querySelector(hash);
    } catch (error) {
      return null;
    }
  };

  const animateMobileMenuEnter = () => {
    if (!mobileMenu || prefersReducedMotion) return;

    stopMobileMenuAnimations();

    if (mobileMenuBackdrop) {
      const backdropAnimation = mobileMenuBackdrop.animate(
        [
          { opacity: 0 },
          { opacity: 1 }
        ],
        {
          duration: 380,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'both'
        }
      );
      mobileMenuAnimations.push(backdropAnimation);
    }

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

  const animateMobileMenuExit = () => {
    return new Promise((resolve) => {
      if (!mobileMenu || prefersReducedMotion) {
        resolve();
        return;
      }

      stopMobileMenuAnimations();

      const closingAnimations = [];

      if (mobileMenuBackdrop) {
        closingAnimations.push(
          mobileMenuBackdrop.animate(
            [
              { opacity: 1 },
              { opacity: 0 }
            ],
            {
              duration: 280,
              easing: 'cubic-bezier(0.4, 0, 1, 1)',
              fill: 'both'
            }
          )
        );
      }

      if (mobileMenuPanel) {
        closingAnimations.push(
          mobileMenuPanel.animate(
            [
              { opacity: 1, transform: 'translateY(0px) rotate(0deg) scale(1)' },
              { opacity: 0, transform: 'translateY(42px) rotate(-0.9deg) scale(0.99)' }
            ],
            {
              duration: 340,
              easing: 'cubic-bezier(0.4, 0, 1, 1)',
              fill: 'both'
            }
          )
        );
      }

      [...mobileMenuItems].reverse().forEach((item, index) => {
        closingAnimations.push(
          item.animate(
            [
              { opacity: 1, transform: 'translateY(0px)' },
              { opacity: 0, transform: 'translateY(20px)' }
            ],
            {
              duration: 300,
              delay: index * 36,
              easing: 'cubic-bezier(0.4, 0, 1, 1)',
              fill: 'both'
            }
          )
        );
      });

      if (!closingAnimations.length) {
        resolve();
        return;
      }

      mobileMenuAnimations = closingAnimations;

      Promise.allSettled(
        closingAnimations.map((animation) => animation.finished.catch(() => undefined))
      ).then(() => {
        resolve();
      });
    });
  };

  const closeMobileMenu = async () => {
    if (!mobileMenu) return;
    if (isMobileMenuClosing) return;

    isMobileMenuClosing = true;
    try {
      if (!mobileMenu.classList.contains('hidden')) {
        await animateMobileMenuExit();
      }

      mobileMenu.classList.add('hidden');
      stopMobileMenuAnimations();
      document.body.classList.remove('overflow-hidden');
      menuToggleButtons.forEach((toggleButton) => {
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    } finally {
      isMobileMenuClosing = false;
    }
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
        void closeMobileMenu();
      }

      menuToggleButtons.forEach((toggleButton) => {
        toggleButton.setAttribute('aria-expanded', String(isHidden));
      });
    });
  });

  menuCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      void closeMobileMenu();
    });
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
        if (mobileMenu && link.closest('#mobile-menu')) {
          void closeMobileMenu();
        }
        return;
      }

      const target = getHashTarget(href);
      if (!target) return;

      if (window.location.hash !== href) {
        window.history.pushState(null, '', href);
      }

      if (mobileMenu && link.closest('#mobile-menu')) {
        closeMobileMenu().then(() => {
          window.requestAnimationFrame(() => {
            scrollToAnchorTarget(target);
          });
        });
        return;
      }

      scrollToAnchorTarget(target);
    });
  });

  const initialTarget = getHashTarget(window.location.hash);
  if (initialTarget) {
    window.requestAnimationFrame(() => {
      scrollToAnchorTarget(initialTarget);
    });
  }

  if (navbar && !prefersReducedMotion) {
    window.requestAnimationFrame(animateNavbarEnter);
  }

  if (heroSection && !prefersReducedMotion) {
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            triggerHeroAnimation();
            heroObserver.disconnect();
          });
        },
        { threshold: 0.28 }
      );
      heroObserver.observe(heroSection);
    } else {
      window.requestAnimationFrame(triggerHeroAnimation);
    }
  }

  if (werkwijzeIcon) {
    let introAnimation = null;
    let introAnimationTimeoutId = null;
    let activePointerId = null;
    let pointerStartX = 0;
    let swipeProgress = 0;
    let hoverOffsetX = 0;
    let hoverRotationDeg = 0;
    let isHoveringButton = false;
    let hasReachedSwipeEnd = false;
    const maxSwipeDistance = 44;
    const hoverDistance = 6;
    const hoverPreviewRotationDeg = 18;
    const canUseHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const baseBackgroundAlpha = 0.2;
    const activeBackgroundAlpha = 0.34;
    const baseBorderAlpha = 0.4;
    const activeBorderAlpha = 0.68;

    const syncHoverOffset = () => {
      const hasHoverPreview = canUseHover && isHoveringButton && activePointerId === null;
      hoverOffsetX = hasHoverPreview ? hoverDistance : 0;
      hoverRotationDeg = hasHoverPreview ? hoverPreviewRotationDeg : 0;
    };

    const updateSwipeVisualState = () => {
      const swipeOffsetX = swipeProgress * maxSwipeDistance;
      const totalOffsetX = swipeOffsetX + hoverOffsetX;
      const rotateDeg = swipeProgress * 360 + hoverRotationDeg;
      werkwijzeIcon.style.transform = `translateX(${totalOffsetX}px) rotate(${rotateDeg}deg)`;

      if (!werkwijzeButton) return;
      const backgroundAlpha = baseBackgroundAlpha + (activeBackgroundAlpha - baseBackgroundAlpha) * swipeProgress;
      const borderAlpha = baseBorderAlpha + (activeBorderAlpha - baseBorderAlpha) * swipeProgress;
      werkwijzeButton.style.backgroundColor = `rgb(255 255 255 / ${backgroundAlpha.toFixed(3)})`;
      werkwijzeButton.style.borderColor = `rgb(255 255 255 / ${borderAlpha.toFixed(3)})`;
    };

    const setPressedState = (isPressed) => {
      if (!werkwijzeButton) return;
      werkwijzeButton.classList.toggle('translate-y-0', isPressed);
    };

    const resetSwipeState = () => {
      setPressedState(false);
      werkwijzeIcon.style.transition = 'transform 280ms ease';
      if (werkwijzeButton) {
        werkwijzeButton.style.transition = 'background-color 280ms ease, border-color 280ms ease';
      }
      syncHoverOffset();
      swipeProgress = 0;
      updateSwipeVisualState();
      window.setTimeout(() => {
        werkwijzeIcon.style.transition = '';
        if (werkwijzeButton) {
          werkwijzeButton.style.transition = '';
        }
      }, 280);
      hasReachedSwipeEnd = false;
      activePointerId = null;
    };

    werkwijzeIcon.style.touchAction = 'pan-y';
    werkwijzeIcon.setAttribute('draggable', 'false');
    if (werkwijzeButton) {
      werkwijzeButton.setAttribute('draggable', 'false');
    }

    const cancelIntroAnimation = () => {
      if (introAnimationTimeoutId !== null) {
        window.clearTimeout(introAnimationTimeoutId);
        introAnimationTimeoutId = null;
      }
      if (!introAnimation) return;
      introAnimation.cancel();
      introAnimation = null;
    };

    werkwijzeIcon.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });
    if (werkwijzeButton) {
      werkwijzeButton.addEventListener('dragstart', (event) => {
        event.preventDefault();
      });
    }

    werkwijzeIcon.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      event.preventDefault();
      cancelIntroAnimation();

      activePointerId = event.pointerId;
      pointerStartX = event.clientX;
      swipeProgress = 0;
      hasReachedSwipeEnd = false;
      setPressedState(true);
      isHoveringButton = false;
      syncHoverOffset();
      werkwijzeIcon.style.transition = '';
      if (werkwijzeButton) {
        werkwijzeButton.style.transition = '';
      }
      updateSwipeVisualState();
      werkwijzeIcon.setPointerCapture(event.pointerId);
    });

    werkwijzeIcon.addEventListener('pointermove', (event) => {
      if (event.pointerId !== activePointerId) return;
      event.preventDefault();
      const swipeDeltaX = Math.max(0, event.clientX - pointerStartX);
      swipeProgress = Math.min(1, swipeDeltaX / maxSwipeDistance);
      updateSwipeVisualState();
      hasReachedSwipeEnd = swipeProgress >= 1;
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

    if (werkwijzeButton && canUseHover) {
      werkwijzeButton.addEventListener('mouseenter', () => {
        if (activePointerId !== null) return;
        cancelIntroAnimation();
        isHoveringButton = true;
        syncHoverOffset();
        werkwijzeIcon.style.transition = 'transform 220ms ease';
        updateSwipeVisualState();
      });

      werkwijzeButton.addEventListener('mouseleave', () => {
        if (activePointerId !== null) return;
        isHoveringButton = false;
        syncHoverOffset();
        werkwijzeIcon.style.transition = 'transform 220ms ease';
        updateSwipeVisualState();
      });

      window.addEventListener('blur', () => {
        if (activePointerId !== null) return;
        isHoveringButton = false;
        syncHoverOffset();
        updateSwipeVisualState();
      });
    }

    updateSwipeVisualState();

    if (!prefersReducedMotion) {
      introAnimationTimeoutId = window.setTimeout(() => {
        introAnimationTimeoutId = null;
        if (activePointerId !== null) return;

        const animationDuration = 1800;
        const introPeakSwipeProgress = 0.33;
        const easeInOut = (value) => 0.5 - Math.cos(value * Math.PI) * 0.5;
        const easeOutBack = (value) => {
          const overshoot = 1.70158;
          const shifted = value - 1;
          return 1 + (overshoot + 1) * shifted * shifted * shifted + overshoot * shifted * shifted;
        };
        const lerp = (start, end, amount) => start + (end - start) * amount;
        let introFrameId = null;
        const animationStartTime = performance.now();

        const finishIntroAnimation = () => {
          swipeProgress = 0;
          updateSwipeVisualState();
          introAnimation = null;
        };

        const runIntroFrame = (timestamp) => {
          const elapsed = timestamp - animationStartTime;
          const rawProgress = Math.min(1, elapsed / animationDuration);
          let introProgress = 0;

          if (rawProgress < 0.24) {
            const phaseProgress = rawProgress / 0.24;
            introProgress = lerp(0, 0.08, easeInOut(phaseProgress));
          } else if (rawProgress < 0.62) {
            const phaseProgress = (rawProgress - 0.24) / 0.38;
            introProgress = lerp(0.08, 1, easeOutBack(phaseProgress));
          } else {
            const phaseProgress = (rawProgress - 0.62) / 0.38;
            const settleProgress = 1 - easeInOut(phaseProgress);
            const wobble = Math.sin(phaseProgress * Math.PI * 3) * 0.06 * (1 - phaseProgress);
            introProgress = settleProgress + wobble;
          }

          const clampedIntroProgress = Math.max(0, Math.min(1, introProgress));
          swipeProgress = clampedIntroProgress * introPeakSwipeProgress;
          updateSwipeVisualState();

          if (rawProgress >= 1 || activePointerId !== null) {
            finishIntroAnimation();
            return;
          }

          introFrameId = window.requestAnimationFrame(runIntroFrame);
        };

        introAnimation = {
          cancel: () => {
            if (introFrameId !== null) {
              window.cancelAnimationFrame(introFrameId);
            }
            finishIntroAnimation();
          }
        };

        introFrameId = window.requestAnimationFrame(runIntroFrame);
      }, 1000);
    }
  }
});
