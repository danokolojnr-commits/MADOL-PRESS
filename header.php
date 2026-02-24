<?php
if (!isset($pageTitle)) {
    $pageTitle = "Madol Press | Professional Digital Printing";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;700;800&display=swap"
        rel="stylesheet">

    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">

    <!-- FontAwesome (for icons) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="aos.css">
    <!-- Dynamic Favicon -->
    <link id="dynamic-favicon" rel="icon" type="image/png" href="images/favicon-red.png">
</head>

<body>
    <!-- Theme Toggle -->
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Dark Mode">
        <i class="fa-solid fa-moon"></i>
    </button>

    <!-- Navigation -->
    <nav class="navbar">
        <div class="container nav-container">
            <a href="index.php" class="logo">
                <i class="fa-solid fa-print"></i>
                Madol<span>Press</span>
            </a>
            <div class="menu-toggle">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="nav-links">
                <a href="index.php" class="nav-link">Home</a>
                <a href="about.php" class="nav-link">About Us</a>
                <a href="products.php" class="nav-link">Services</a>
                <a href="admin.php" class="nav-link">Admin</a>
            </div>
            <a href="contact.php" class="btn btn-primary">Get a Quote</a>
        </div>
    </nav>
