<?php
// submit_quote.php
require_once 'config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize input data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
        exit;
    }

    try {
        // Insert into database
        $stmt = $pdo->prepare('INSERT INTO quotes (name, email, message) VALUES (?, ?, ?)');
        $stmt->execute([$name, $email, $message]);

        echo json_encode(['success' => true, 'message' => 'Thank you! Your quote request has been received.']);
    } catch (PDOException $e) {
        // Log error in a real app
        echo json_encode(['success' => false, 'message' => 'System error. Please try again later.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>