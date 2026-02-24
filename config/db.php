<?php
// config/db.php

$host = 'localhost';
$dbname = 'madol_press_db';
$username = 'root'; // Default XAMPP username
$password = ''; // Default XAMPP password is empty

try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

    // Set PDO error mode to exception for easier debugging
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // If connection fails, stop everything and show an error
    die("ERROR: Could not connect to the database. " . $e->getMessage());
}
?>