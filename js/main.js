// Madol Press Main Script

document.addEventListener('DOMContentLoaded', () => {
    console.log('Madol Press site loaded');

    // Dynamic Favicon Logic (Red/Blue Alternation)
    const favIcons = ['images/favicon-red.png', 'images/favicon-blue.png'];
    const randomFav = favIcons[Math.floor(Math.random() * favIcons.length)];
    let favElement = document.getElementById('dynamic-favicon');

    if (favElement) {
        favElement.href = randomFav;
    }

    // Add scroll effect for navbar
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
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
        }, 7000); // Change every 7 seconds
    }

    // Dark Mode Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
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
    }

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
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
    }

    // Testimonial System
    const marquee = document.getElementById('testimonial-marquee');
    if (marquee) {
        const defaultTestimonials = [
            { name: "John Doe", rating: 5, text: "Absolutely stunning quality! The colors are so vibrant and the turnaround was incredibly fast. Highly recommend Madol Press." },
            { name: "Sarah Williams", rating: 5, text: "The best printing company in Nigeria. Their attention to detail on our corporate brochures was second to none." },
            { name: "Michael Obi", rating: 4, text: "Great customer service and very professional staff. The books were printed perfectly. Will definitely use them again." },
            { name: "Chidi Okafor", rating: 5, text: "Excellent digital offset printing. The quality rivals international standards. So glad I found them!" },
            { name: "Emily Adams", rating: 5, text: "They helped us with a rush order for our event and delivered 100% on time. Truly life-savers!" }
        ];

        let testimonials = JSON.parse(localStorage.getItem('user_testimonials')) || defaultTestimonials;
        if (!localStorage.getItem('user_testimonials')) {
            localStorage.setItem('user_testimonials', JSON.stringify(defaultTestimonials));
        }

        const renderTestimonials = () => {
            const cardsHTML = testimonials.map(t => `
                <div class="testimonial-card">
                    <div class="stars">
                        ${Array(5).fill(0).map((_, i) => `<i class="fa-solid fa-star" style="color: ${i < t.rating ? '#FFD700' : '#ddd'}"></i>`).join('')}
                    </div>
                    <p class="testimonial-text">"${t.text}"</p>
                    <div class="testimonial-author">
                        <strong>${t.name}</strong>
                        <span>Verified Client</span>
                    </div>
                </div>
            `).join('');
            marquee.innerHTML = cardsHTML + cardsHTML;
        };
        renderTestimonials();
    }

    const testimonialForm = document.getElementById('testimonial-form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const text = document.getElementById('message').value;
            const ratingInput = document.querySelector('input[name="rating"]:checked');
            if (!ratingInput) {
                alert('Please select a rating');
                return;
            }
            const rating = parseInt(ratingInput.value);
            const newTestimonial = { name, text, rating };

            let testimonials = [];
            try {
                testimonials = JSON.parse(localStorage.getItem('user_testimonials')) || [];
            } catch (err) {
                testimonials = [];
            }

            // If it was null/empty, we might want to start with defaults or just empty. 
            // The logic above in the marquee block initializes defaults if empty.
            // But since we are on the form page, that block might not have run if marquee is missing.
            // Let's ensure we don't wipe out defaults if they exist, but if it's a fresh visit to form first, it's ok.
            // Actually, safe to just push to array.

            testimonials.unshift(newTestimonial);
            localStorage.setItem('user_testimonials', JSON.stringify(testimonials));
            alert('Thank you for your feedback! Redirecting to home page...');
            window.location.href = 'index.php';
        });
    }
});

