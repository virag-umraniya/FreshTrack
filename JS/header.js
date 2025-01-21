document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // Toggle hamburger menu
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');

            hamburger.addEventListener('click', () => {
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.setAttribute('aria-expanded', !isExpanded);
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Toggle dropdown menu on mobile
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            const dropdownMenu = document.querySelector('.dropdown-menu');

            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownToggle.classList.toggle('active');
                dropdownMenu.classList.toggle('active');
            });
        });
});