<?php
// clear_history.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

// Security Check: Only logged in admins
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// RBAC Check: Only Super Admins can clear history
if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super') {
    echo json_encode(['success' => false, 'message' => 'Permission denied. Only Super Admins can clear login history.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $stmt = $pdo->prepare('TRUNCATE TABLE login_history'); // Fast deletion of all rows
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Login history cleared successfully.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to clear login history.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>