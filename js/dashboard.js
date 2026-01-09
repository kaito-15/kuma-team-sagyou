document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentFrame = document.getElementById('content-frame');

    // Default Page
    // Check if we can restore state or default to first item

    function navigateTo(url, element) {
        // Update Iframe
        contentFrame.src = url;

        // Update Active State
        navItems.forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const url = item.getAttribute('href');
            navigateTo(url, item);
        });
    });

    // Initial Load - Simulate click on the first active item or the first item
    const activeItem = document.querySelector('.nav-item.active') || navItems[0];
    if (activeItem) {
        // Just ensure iframe is set (it might be set in HTML too)
        const url = activeItem.getAttribute('href');
        if (contentFrame.getAttribute('src') !== url) {
            contentFrame.src = url;
        }
    }
});
