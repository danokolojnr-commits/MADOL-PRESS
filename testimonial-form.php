<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Share Your Experience - Madol Press</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;700;800&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        /* Extra Compact Styles specifically for this form */
        .form-bg {
            background: var(--bg-body);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            min-height: 100vh;
        }

        .form-card {
            background: var(--bg-card);
            padding: 30px;
            border-radius: var(--radius-lg);
            /* Enhanced Outline - Blue Border */
            border: 2px solid var(--primary-blue);
            box-shadow: 0 10px 40px rgba(0, 86, 179, 0.15);
            width: 100%;
            max-width: 450px;
            text-align: center;
            position: relative;
        }

        /* Dark mode adjustment for shadow */
        body.dark-mode .form-card {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border-color: var(--primary-red);
            /* Switch to red in dark mode for contrast/style */
        }

        .form-card h2 {
            font-size: 1.8rem;
            margin-bottom: 5px;
            color: var(--primary-blue);
        }

        .form-card p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 25px;
        }

        .form-group {
            text-align: left;
            margin-bottom: 15px;
        }

        .form-group label {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-main);
            margin-bottom: 6px;
            display: block;
        }

        /* Input Focus Enhancements */
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 4px rgba(0, 86, 179, 0.1);
        }

        .star-rating {
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
            gap: 15px;
            margin: 10px 0 20px;
        }

        .star-rating input {
            display: none;
        }

        .star-rating label {
            cursor: pointer;
            font-size: 2rem;
            color: #ddd;
            transition: all 0.2s ease;
        }

        /* Essential Fix for interaction: using z-index and pointer-events if needed, 
           but row-reverse usually works fine if the elements don't overlap. */
        .star-rating label:hover,
        .star-rating label:hover~label,
        .star-rating input:checked~label {
            color: #FFD700;
            transform: scale(1.1);
        }

        .btn-submit {
            background: var(--primary-red);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 10px;
            font-weight: 700;
            width: 100%;
            cursor: pointer;
            transition: var(--transition);
            margin-top: 10px;
        }

        .btn-submit:hover {
            background: #C0151A;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(227, 30, 36, 0.3);
        }

        .back-link {
            display: block;
            margin-top: 20px;
            font-size: 0.85rem;
            color: var(--text-secondary);
            text-decoration: none;
        }

        .back-link:hover {
            color: var(--primary-blue);
        }
    </style>
    <!-- Dynamic Favicon -->
    <link id="dynamic-favicon" rel="icon" type="image/png" href="images/favicon-red.png">
</head>

<body class="form-bg">
    <!-- Theme Toggle -->
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode"
        style="position: absolute; top: 20px; right: 20px;">
        <i class="fa-solid fa-moon"></i>
    </button>
    <div class="form-card" data-aos="zoom-in">
        <a href="index.php" class="logo" style="justify-content: center; margin-bottom: 15px; display: flex;">
            <i class="fa-solid fa-print"></i>
            Madol<span>Press</span>
        </a>
        <h2>Share Your Experience</h2>
        <p>Your feedback helps us grow!</p>

        <form id="testimonial-form">
            <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" placeholder="John Doe" required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-main);">
            </div>

            <div class="form-group" style="text-align: center;">
                <label>Your Rating</label>
                <div class="star-rating">
                    <input type="radio" name="rating" id="star5" value="5" required>
                    <label for="star5" title="5 stars"><i class="fa-solid fa-star"></i></label>
                    <input type="radio" name="rating" id="star4" value="4">
                    <label for="star4" title="4 stars"><i class="fa-solid fa-star"></i></label>
                    <input type="radio" name="rating" id="star3" value="3">
                    <label for="star3" title="3 stars"><i class="fa-solid fa-star"></i></label>
                    <input type="radio" name="rating" id="star2" value="2">
                    <label for="star2" title="2 stars"><i class="fa-solid fa-star"></i></label>
                    <input type="radio" name="rating" id="star1" value="1">
                    <label for="star1" title="1 star"><i class="fa-solid fa-star"></i></label>
                </div>
            </div>

            <div class="form-group">
                <label for="message">Your Message</label>
                <textarea id="message" rows="3" placeholder="I loved the quality..." required
                    style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-body); color: var(--text-main); font-family: inherit; resize: none;"></textarea>
            </div>

            <button type="submit" class="btn-submit">Submit Review</button>
            <a href="index.php" class="back-link"><i class="fa-solid fa-arrow-left"></i> Back to Home</a>
        </form>
    </div>

    <script src="js/main.js"></script>
</body>

</html>