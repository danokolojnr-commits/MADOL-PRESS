<?php
// login_process.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please provide both username and password.']);
        exit;
    }

    try {
        // Prepare SQL statement to find the user
        $stmt = $pdo->prepare('SELECT id, username, password, role FROM users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        // Check if user exists and password is correct
        if ($user && password_verify($password, $user['password'])) {
            // Password is correct! Create the session.
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['admin_role'] = $user['role'];
            $_SESSION['admin_logged_in'] = true;

            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            // Invalid credentials
            echo json_encode(['success' => false, 'message' => 'Invalid username or password.']);
        }
    } catch (PDOException $e) {
        // Database Error
        echo json_encode(['success' => false, 'message' => 'System error. Please try again later.']);
    }
} else {
    // Only allow POST requests
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>