import './bootstrap';

 document.addEventListener('DOMContentLoaded', () => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu   = document.getElementById('navbar-default');
        const overlay   = document.getElementById('nav-overlay');
        const body      = document.body;

        // Toggle menu
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('hidden');

            navMenu.classList.toggle('hidden');
            navMenu.classList.toggle('block');

            overlay.classList.toggle('hidden');
            overlay.classList.toggle('block');

            body.style.overflow = isOpen ? 'hidden' : 'auto';

            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu function
        const closeMenu = () => {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('block');

            overlay.classList.add('hidden');
            overlay.classList.remove('block');

            body.style.overflow = 'auto';
            navToggle.setAttribute('aria-expanded', 'false');
        };

        // Close when clicking overlay
        overlay.addEventListener('click', closeMenu);

        // Close when clicking any nav link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close with Escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeMenu();
        });
    });
