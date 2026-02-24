<?php
// get_login_history.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

// Security Check
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// RBAC Check: Only Super Admins can view login history
if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super') {
    echo json_encode(['success' => false, 'message' => 'Permission denied.']);
    exit;
}

try {
    $stmt = $pdo->query('SELECT username, role, login_time FROM login_history ORDER BY login_time DESC LIMIT 100');
    $history = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $history]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to retrieve login history.']);
}
?>