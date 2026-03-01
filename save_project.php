<?php
// save_project.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

// Security Check: Only logged in admins
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// RBAC Check: Only Super Admins can add projects (matching JS logic)
if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super') {
    echo json_encode(['success' => false, 'message' => 'Permission denied. Only Super Admins can add projects.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
    $status = filter_input(INPUT_POST, 'status', FILTER_SANITIZE_STRING);

    if (empty($title) || empty($status)) {
        echo json_encode(['success' => false, 'message' => 'Please provide a title and status.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('INSERT INTO projects (title, status) VALUES (?, ?)');
        $stmt->execute([$title, $status]);

        echo json_encode([
            'success' => true,
            'message' => 'Project created successfully.',
            'id' => $pdo->lastInsertId()
        ]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to save project.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>