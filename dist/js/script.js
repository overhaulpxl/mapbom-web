document.addEventListener("DOMContentLoaded", function() {
    // Show the loading animation initially
    document.querySelector(".loading").style.display = "block";

    // Hide the loading animation after the content has loaded
    window.addEventListener("load", function() {
        document.querySelector(".loading").style.display = "none";
    });

    const menuBar = document.querySelector(".menu-bar");
    const menuNav = document.querySelector(".menu");
    const navBar = document.querySelector(".navbar");

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    const scrollHandler = debounce(() => {
        const windowPosition = window.scrollY > 0;
        navBar.classList.toggle("scrolling-active", windowPosition);
        if (windowPosition) {
            menuNav.classList.remove("menu-active");
        }

        // Fade-in animation for elements in view
        document.querySelectorAll('.fade-in').forEach(element => {
            const rect = element.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom >= 0;
            if (inView) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });

        // Scroll to Top Button
        const scrollTopButton = document.querySelector(".scroll-top");
        if (window.scrollY > 300) {
            scrollTopButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
        }
    });

    menuBar.addEventListener("click", () => {
        menuNav.classList.toggle("menu-active");
    });

    window.addEventListener("scroll", scrollHandler);

    document.querySelector(".scroll-top").addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    function scrollToSection(id) {
        const targetElement = document.getElementById(id);
        const offsetPosition = targetElement.offsetTop - navBar.offsetHeight; // Adjust with header height

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }

    document.querySelector(".hero-text button").addEventListener("click", function() {
        scrollToSection('about');
    });

    document.querySelectorAll('.menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);

            menuNav.classList.remove("menu-active"); // Close menu on click
        });
    });
});
