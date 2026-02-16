document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Parallax Effect ---
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollValues = window.scrollY;
            // Move text slower than scroll (parallax)
            parallaxBg.style.transform = `translate(-50%, -50%) translateY(${scrollValues * 0.3}px)`;
        });
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;

            // Toggle active class
            item.classList.toggle('active');

            // Close other items (optional - keeps UI clean)
            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });

    // --- Language Toggle ---
    // --- Language Toggle (Dropdown) ---
    const languageSelector = document.querySelector('.language-selector');
    const languageText = document.getElementById('current-language');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-dropdown li');

    if (languageSelector && languageDropdown && languageText) {

        // Function to update dropdown visibility based on current selection
        const updateDropdownOptions = () => {
            const currentLang = languageText.textContent.trim();
            languageOptions.forEach(option => {
                if (option.getAttribute('data-value') === currentLang) {
                    option.style.display = 'none';
                } else {
                    option.style.display = 'block';
                }
            });
        };

        // Initial update
        updateDropdownOptions();

        // Toggle dropdown on click
        languageSelector.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate closing
            languageDropdown.classList.toggle('show');
        });

        // Handle option selection
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedValue = e.target.getAttribute('data-value');
                // Update text
                languageText.textContent = selectedValue;

                // Update dropdown options visibility
                updateDropdownOptions();

                languageDropdown.classList.remove('show'); // Close dropdown
                e.stopPropagation();
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });
    }

    // --- Marquee Infinite Scroll (Clone) ---
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // Clone the content to ensure seamless loop
        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.append(clone); // Append to container, not inside content
    }

    // --- Editorial Overlay ---
    // Let's try a robust selector based on text content since there are no IDs
    const navLinks = document.querySelectorAll('nav a');
    let editorialNavLink = null;
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'EDITORIAL') {
            editorialNavLink = link;
        }
    });

    const editorialOverlay = document.getElementById('editorial-overlay');

    if (editorialNavLink && editorialOverlay) {
        editorialNavLink.addEventListener('mouseenter', () => {
            editorialOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        editorialOverlay.addEventListener('click', () => {
            editorialOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }



    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            // Prevent scrolling when menu is open
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- FAQ Filters ---
    const faqFilters = document.querySelectorAll('.faq-filter-btn');
    const faqItems = document.querySelectorAll('.accordion-item');

    if (faqFilters.length > 0) {
        faqFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                faqFilters.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                faqItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    console.log('PLAIMANAS animations initialized.');
});
