document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');

            // Toggle active class
            item.classList.toggle('active');

            // Close other items (optional - if you want only one open at a time)
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // Marquee content duplication for seamless scrolling
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Clone the content to ensure seamless loop
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.appendChild(clone);
    }

    // Simple console log to confirm script load
    console.log('PLAIMANAS frontend script loaded.');
});
