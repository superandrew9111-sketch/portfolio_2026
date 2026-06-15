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
});