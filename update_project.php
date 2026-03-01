<?php
// update_project.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

// Security Check: Only logged in admins
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// RBAC Check: Only Super Admins can edit projects (matching JS logic)
if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super') {
    echo json_encode(['success' => false, 'message' => 'Permission denied. Only Super Admins can update projects.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
    $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
    $status = filter_input(INPUT_POST, 'status', FILTER_SANITIZE_STRING);

    if (!$id || (empty($title) && empty($status))) {
        echo json_encode(['success' => false, 'message' => 'Invalid data.']);
        exit;
    }

    try {
        // Construct array and query based on what is being updated
        if (!empty($title) && !empty($status)) {
            $stmt = $pdo->prepare('UPDATE projects SET title = ?, status = ? WHERE id = ?');
            $stmt->execute([$title, $status, $id]);
        } else if (!empty($title)) {
            $stmt = $pdo->prepare('UPDATE projects SET title = ? WHERE id = ?');
            $stmt->execute([$title, $id]);
        } else if (!empty($status)) {
            $stmt = $pdo->prepare('UPDATE projects SET status = ? WHERE id = ?');
            $stmt->execute([$status, $id]);
        }

        echo json_encode(['success' => true, 'message' => 'Project updated successfully.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to update project.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>