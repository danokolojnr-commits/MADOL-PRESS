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
        // Fetch all possible roles and their passwords
        $stmt = $pdo->query('SELECT role, password FROM users');
        $role_accounts = $stmt->fetchAll();

        $matched_role = null;
        foreach ($role_accounts as $account) {
            if (password_verify($password, $account['password'])) {
                $matched_role = $account['role'];
                break;
            }
        }

        if ($matched_role) {
            // Password is correct! Create the session using the typed username
            $_SESSION['admin_username'] = $username; // Use their custom username
            $_SESSION['admin_role'] = $matched_role;
            $_SESSION['admin_logged_in'] = true;

            // Record login history
            $log_stmt = $pdo->prepare('INSERT INTO login_history (username, role) VALUES (?, ?)');
            $log_stmt->execute([$username, $matched_role]);

            echo json_encode(['success' => true, 'message' => 'Login successful', 'role' => $matched_role]);
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