<?php
// delete_project.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

// Security Check: Only logged in admins
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// RBAC Check: Only Super Admins can delete projects (matching JS logic)
if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super') {
    echo json_encode(['success' => false, 'message' => 'Permission denied. Only Super Admins can delete projects.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

    if (!$id) {
        echo json_encode(['success' => false, 'message' => 'Invalid or missing project ID.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('DELETE FROM projects WHERE id = ?');
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Project deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Project not found.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to delete project.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>