document.addEventListener('DOMContentLoaded', () => {


    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollValues = window.scrollY;

            parallaxBg.style.transform = `translate(-50%, -50%) translateY(${scrollValues * 0.3}px)`;
        });
    }


    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;


            item.classList.toggle('active');


            accordionHeaders.forEach(otherHeader => {
                const otherItem = otherHeader.parentElement;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });



    const languageSelector = document.querySelector('.language-selector');
    const languageText = document.getElementById('current-language');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-dropdown li');

    if (languageSelector && languageDropdown && languageText) {


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


        updateDropdownOptions();


        languageSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });


        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedValue = e.target.getAttribute('data-value');

                languageText.textContent = selectedValue;


                updateDropdownOptions();

                languageDropdown.classList.remove('show');
                e.stopPropagation();
            });
        });


        document.addEventListener('click', (e) => {
            if (!languageSelector.contains(e.target)) {
                languageDropdown.classList.remove('show');
            }
        });
    }


    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {

        const clone = marqueeContent.cloneNode(true);
        marqueeContent.parentElement.append(clone);
    }



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
            if (window.innerWidth > 900) { // Only on desktop
                editorialOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        editorialOverlay.addEventListener('click', () => {
            editorialOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // --- Mobile Editorial Dropdown ---
    const editorialToggle = document.querySelector('.editorial-toggle');
    const editorialDropdown = document.querySelector('.editorial-dropdown');

    if (editorialToggle && editorialDropdown) {
        editorialToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent navigation
            editorialToggle.classList.toggle('active');
            editorialDropdown.classList.toggle('active');
        });
    }




    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');

            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.body.classList.add('menu-open');
            } else {
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            });
        });
    }


    const faqFilters = document.querySelectorAll('.faq-filter-btn');
    const faqItems = document.querySelectorAll('.accordion-item');

    if (faqFilters.length > 0) {
        faqFilters.forEach(btn => {
            btn.addEventListener('click', () => {

                faqFilters.forEach(b => b.classList.remove('active'));

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
