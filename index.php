<?php include 'header.php'; ?>

<!-- Hero Section -->
    <section class="hero">
        <div class="hero-shape shape-1"></div>
        <div class="hero-shape shape-2"></div>

        <div class="container hero-content">
            <div class="hero-text" data-aos="fade-right" data-aos-delay="500">
                <h1>High Quality <br><span class="text-red">Printing</span> Services</h1>
                <p>From brochures to large format prints, Madol Press delivers exceptional quality with speed and
                    precision. Your trusted partner in professional printing.</p>
                <div class="hero-buttons">
                    <a href="products.php" class="btn btn-primary">Explore Services</a>
                    <a href="about.php" class="btn btn-secondary" style="margin-left: 10px;">Learn More</a>
                </div>
            </div>

            <div class="hero-visual" data-aos="zoom-in" data-aos-delay="500">
                <!-- Image Slider -->
                <div class="hero-slider">
                    <div class="slide active">
                        <img src="images/638215624819873778_heidelberg-movh-offset-printing-machines-500x500.jpg"
                            alt="Modern Digital Printing"
                            style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>
                    <div class="slide">
                        <img src="images/large-format-new.png" alt="Large Format Printing"
                            style="width: 100%; height: 100%; object-fit: cover; display: block;">
                    </div>

                    <div class="slide">
                        <img src="images/fashion-magazine.png" alt="Fashion Magazine"
                            style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;">
                    </div>
                    <div class="slide">
                        <img src="images/homepage-slider-3.png" alt="Showcase"
                            style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Statistics Board -->
    <section class="stats-section" data-aos="fade-up">
        <div class="container">
            <div class="text-center" style="margin-bottom: var(--spacing-md);">
                <h2 style="font-size: 2.2rem;">Our <span class="text-red">Impact</span> in Numbers</h2>
                <div style="width: 50px; height: 3px; background: var(--primary-red); margin: 10px auto;"></div>
            </div>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-icon">
                        <i class="fa-solid fa-calendar-check"></i>
                    </div>
                    <div class="stat-info">
                        <h2 class="stat-number" data-target="7">0</h2>
                        <p>Years of Excellence</p>
                        <small>Since 2017</small>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <i class="fa-solid fa-boxes-stacked"></i>
                    </div>
                    <div class="stat-info">
                        <h2 class="stat-number" data-target="12000">0</h2>
                        <p>Products Crafted</p>
                        <small>Digital & Offset</small>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div class="stat-info">
                        <h2 class="stat-number" data-target="75">0</h2>
                        <p>Total Sales (Millions)</p>
                        <small>Revenue Growth</small>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section section">
        <div class="container">
            <div class="text-center" data-aos="fade-up">
                <h2 style="font-size: 2.5rem;">What Our <span class="text-red">Clients</span> Say</h2>
                <p style="color: var(--text-light); margin-top: 10px;">Join thousands of satisfied customers who trust
                    us with their vision.</p>
                <div style="width: 60px; height: 4px; background: var(--primary-red); margin: 15px auto 30px;"></div>
            </div>
        </div>

        <!-- Infinite Marquee -->
        <div class="marquee-wrapper">
            <div class="marquee-content" id="testimonial-marquee">
                <!-- Testimonials will be injected by JS -->
            </div>
        </div>

        <div class="container text-center" style="margin-top: 50px;">
            <a href="testimonial-form.php" class="btn btn-secondary">
                <i class="fa-solid fa-pen-to-square"></i> Share Your Experience
            </a>
        </div>
    </section>

    <!-- Highlights / Core Values -->
    <section class="section">
        <div class="container">
            <div class="text-center" data-aos="fade-up" data-aos-duration="600"
                style="margin-bottom: var(--spacing-lg);">
                <h2 style="font-size: 2.5rem;">Why <span class="text-red">Madol Press?</span></h2>
                <p style="color: var(--text-light); margin-top: 10px;">We bring your ideas to life with state-of-the-art
                    technology.</p>
            </div>

            <div class="features-grid">
                <div class="feature-card hover-card" data-aos="fade-right" data-aos-duration="600">
                    <div class="feature-icon">
                        <i class="fa-solid fa-gauge-high"></i>
                    </div>
                    <h3>Fast Turnaround</h3>
                    <p>We understand deadlines. Get your prints delivered on time, every time, without compromising on
                        quality.</p>
                </div>
                <div class="feature-card hover-card" data-aos="fade-up" data-aos-duration="600" data-aos-delay="150">
                    <div class="feature-icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <h3>Premium Quality</h3>
                    <p>Using the latest digital offset technology to ensure crisp, vibrant, and professional results.
                    </p>
                </div>
                <div class="feature-card hover-card" data-aos="fade-left" data-aos-duration="600" data-aos-delay="300">
                    <div class="feature-icon">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <h3>Expert Support</h3>
                    <p>Our dedicated team is here to guide you through stock choices, finishes, and design adjustments.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <?php include 'footer.php'; ?>