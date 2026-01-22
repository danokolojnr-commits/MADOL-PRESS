// Madol Press Main Script

document.addEventListener('DOMContentLoaded', () => {
    console.log('Madol Press site loaded');

    // Add scroll effect for navbar
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            navbar.style.padding = '1rem 0';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon betwen bars and times
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Hero Image Slider
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;

        setInterval(() => {
            // Remove active class from current
            slides[currentSlide].classList.remove('active');

            // Move to next
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active class to next
            slides[currentSlide].classList.add('active');
        }, 4000); // Change every 4 seconds
    }

    // Dark Mode Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update icon and save preference
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const speed = 200;

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = +target.innerText;
                const data = +target.getAttribute('data-target');
                const time = data / speed;

                const updateCount = () => {
                    const currentCount = +target.innerText;
                    if (currentCount < data) {
                        target.innerText = Math.ceil(currentCount + time);
                        setTimeout(updateCount, 1);
                    } else {
                        target.innerText = data + (data === 7 ? '+' : data === 12000 ? '+' : 'M+');
                    }
                };

                updateCount();
                observer.unobserve(target);
            }
        });
    };

    const statsObserver = new IntersectionObserver(startCounter, {
        threshold: 0.5
    });

    stats.forEach(stat => statsObserver.observe(stat));
});

