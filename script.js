document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобильное бургер-меню
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = (forceClose = false) => {
    const isOpen = forceClose ? false : !burgerBtn.classList.contains('is-open');
    burgerBtn.classList.toggle('is-open', isOpen);
    mobileMenu.classList.toggle('is-open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => toggleMenu());
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(true));
    });
  }

  // 2. Переключатель языка (RU / ENG)
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      langBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  // 3. Активный пункт в шапке при клике и при скролле (для главной страницы)
  const navLinks = document.querySelectorAll('.header-nav .nav-link');
  const homeSections = document.querySelectorAll('#about, #cases, #experience');

  if (homeSections.length > 0) {
    const setActiveNav = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    };

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('href').replace('#', '');
        setActiveNav(targetId);
      });
    });

    const updateActiveNavOnScroll = () => {
      const scrollPos = window.scrollY + 180;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

      if (isAtBottom) {
        setActiveNav('experience');
        return;
      }

      homeSections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveNav(id);
        }
      });
    };

    window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
    updateActiveNavOnScroll();
  }

  // 4. Горизонтальный drag-to-scroll для всех каруселей
  const enableDragScroll = (el) => {
    let isDown = false;
    let hasDragged = false;
    let startX = 0;
    let scrollLeft = 0;

    el.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      hasDragged = false;
      el.classList.add('is-dragging');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => {
      isDown = false;
      el.classList.remove('is-dragging');
    });

    el.addEventListener('mouseup', () => {
      isDown = false;
      el.classList.remove('is-dragging');
    });

    el.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      if (Math.abs(x - startX) > 6) {
        hasDragged = true;
      }
      const walk = (x - startX) * 1.4;
      el.scrollLeft = scrollLeft - walk;
    });

    el.addEventListener('click', (e) => {
      if (hasDragged) {
        e.preventDefault();
      }
    });
  };

  document
    .querySelectorAll(
      '#projectNavTrack, .onboard-row, .store-grid, .tb-banners-row, .zr-kv-grid, .zr-bottom-row, .zr-icons-grid, .kz-smm-carousel, .um-badges-track, .um-ai-smm__grid, .um-renders__carousel, .ot-rc-carousel, .ot-cb-circles'
    )
    .forEach(enableDragScroll);

  // Начинаем нижнюю навигацию со «следующего» проекта (если указан data-nav-start)
  const navTrack = document.getElementById('projectNavTrack');
  if (navTrack) {
    const startCard = navTrack.querySelector('[data-nav-start]');
    if (startCard) {
      const gutter = parseFloat(getComputedStyle(navTrack).paddingLeft) || 0;
      navTrack.scrollLeft = startCard.offsetLeft - gutter;
    }
  }

  // 5. Появление шапки после скролла первого экрана (для страниц кейсов)
  const revealHeader = document.querySelector('.site-header--reveal');
  const caseHero = document.getElementById('caseHero');

  if (revealHeader && caseHero) {
    const toggleHeaderVisibility = () => {
      const triggerPoint = caseHero.offsetHeight - 100;
      revealHeader.classList.toggle('is-visible', window.scrollY >= triggerPoint);
    };

    window.addEventListener('scroll', toggleHeaderVisibility, { passive: true });
    toggleHeaderVisibility();
  }

  // 6. Автоматическая смена цвета шапки на тёмном/насыщенном фоне
  const header = document.getElementById('header');
  const darkSections = document.querySelectorAll(
    '.case-hero, .case-goal, .case-typography, .zr-hero, .zr-about, .kz-hero, .kz-goal, .kz-results, .um-hero, .um-goal, .ot-creditbar-intro, .ot-satcredit-intro'
  );

  if (header && darkSections.length > 0) {
    const updateHeaderTheme = () => {
      const checkY = 45;
      let isOverDark = false;

      darkSections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom >= checkY) {
          isOverDark = true;
        }
      });

      header.classList.toggle('site-header--dark', isOverDark);
    };

    window.addEventListener('scroll', updateHeaderTheme, { passive: true });
    window.addEventListener('resize', updateHeaderTheme, { passive: true });
    updateHeaderTheme();
  }
});