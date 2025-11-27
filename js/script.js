// Hamburger Menu Toggle dengan Slide dari Samping
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navItems = document.querySelector('.nav-items');
    const body = document.querySelector('body');

    // Buat overlay element jika belum ada
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    if (navToggle && navItems) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navItems.classList.toggle('active');
            navToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = navItems.classList.contains('active') ? 'hidden' : '';
            navToggle.setAttribute('aria-expanded',
                navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-items a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking on overlay
        overlay.addEventListener('click', () => {
            closeMenu();
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navItems.classList.contains('active')) {
                closeMenu();
            }
        });

        function closeMenu() {
            navItems.classList.remove('active');
            navToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});