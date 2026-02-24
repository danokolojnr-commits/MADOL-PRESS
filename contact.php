<?php include 'header.php'; ?>

<section class="section" style="padding-top: 140px; background: var(--bg-body);">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text" data-aos="fade-right">
                    <h1 class="text-blue">Get in <span class="text-red">Touch</span></h1>
                    <p>Have a project in mind? We'd love to hear from you. Visit us or send us a message.</p>

                    <ul style="margin-top: 2rem; font-size: 1.1rem; list-style: none;">
                        <li style="margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 15px;">
                            <div class="feature-icon" style="width: 40px; height: 40px; font-size: 1rem; margin: 0;"><i
                                    class="fa-solid fa-location-dot"></i></div>
                            <div>
                                <strong>Address:</strong><br>
                                4 Iyara cl Gariki 2
                            </div>
                        </li>
                        <li style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 15px;">
                            <div class="feature-icon" style="width: 40px; height: 40px; font-size: 1rem; margin: 0;"><i
                                    class="fa-solid fa-phone"></i></div>
                            <div>
                                <strong>Phone:</strong><br>
                                08062287336
                            </div>
                        </li>
                        <li style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 15px;">
                            <div class="feature-icon" style="width: 40px; height: 40px; font-size: 1rem; margin: 0;"><i
                                    class="fa-solid fa-envelope"></i></div>
                            <div>
                                <strong>Email:</strong><br>
                                info@madolpress.com
                            </div>
                        </li>
                    </ul>
                </div>

                <div data-aos="fade-left"
                    style="background: var(--bg-card); padding: var(--spacing-md); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
                    <h3 class="text-blue" style="margin-bottom: 1.5rem;">Send a Message</h3>
                    <form id="quoteForm">
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required
                                style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-body); color: var(--text-main);">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required
                                style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-body); color: var(--text-main);">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message / Project
                                Details</label>
                            <textarea id="message" name="message" rows="4" placeholder="Tell us about your project..."
                                required
                                style="width: 100%; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-body); color: var(--text-main);"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Placeholder -->
    <!-- Map -->
    <iframe width="100%" height="400"
        style="border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); border: none; display: block;"
        frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=4%20Iyara%20cl%20Gariki%202&t=&z=15&ie=UTF8&iwloc=&output=embed">
    </iframe>
    <?php include 'footer.php'; ?>