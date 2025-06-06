document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Mobile dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');

            // Change the toggle symbol
            this.textContent = dropdown.classList.contains('active') ? '−' : '+';
        });
    });

    // Close menu when clicking on a link (optional)
    const navItems = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});