<?php
// delete_quote.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

// Security Check: Only logged in admins
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// RBAC Check: Only Super Admins can delete
if (!isset($_SESSION['admin_role']) || $_SESSION['admin_role'] !== 'super') {
    echo json_encode(['success' => false, 'message' => 'Permission denied. Only Super Admins can delete quotes.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $quote_id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);

    if (!$quote_id) {
        echo json_encode(['success' => false, 'message' => 'Invalid or missing quote ID.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare('DELETE FROM quotes WHERE id = ?');
        $stmt->execute([$quote_id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Quote deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Quote not found or already deleted.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to delete quote.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>