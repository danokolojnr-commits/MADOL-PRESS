<?php
// get_quotes.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

// Security Check: Only allow logged in admins to access this data
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    // Fetch quotes ordered by newest first
    $stmt = $pdo->query('SELECT * FROM quotes ORDER BY created_at DESC');
    $quotes = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $quotes]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to retrieve quotes.']);
}
?>