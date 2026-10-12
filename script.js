document.addEventListener('DOMContentLoaded', () => {
    // Функция для контроля адаптивности стандартных текстовых контейнеров
    function resizePortfolio() {
        const windowWidth = window.innerWidth;
        const scaleX = windowWidth / 1920;

        // Находим только стандартные контентные блоки (если они есть на других страницах)
        const standardContainers = document.querySelectorAll('.content-container:not(.collab-container)');
        
        standardContainers.forEach(container => {
            if (windowWidth >= 1920) {
                container.style.transform = 'scale(1)';
            } else {
                container.style.transform = `scale(${scaleX})`;
            }
        });
    }

    // Запуск при загрузке и изменении размера окна
    resizePortfolio();
    window.addEventListener('resize', resizePortfolio);

    const header = document.querySelector('.site-header-fixed');
    const menuButton = document.querySelector('.header-menu-btn');
    const menuNav = document.querySelector('.header-nav-main');

    if (header && menuButton && menuNav) {
        const closeMenu = () => {
            header.classList.remove('menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
        };

        menuButton.addEventListener('click', () => {
            const open = header.classList.toggle('menu-open');
            menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        menuNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) closeMenu();
        });
    }
});