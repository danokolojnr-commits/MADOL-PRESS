<?php
// get_stats.php
session_start();
require_once 'config/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

try {
    // 1. Total Customers (Quotes)
    $stmt = $pdo->query('SELECT COUNT(*) FROM quotes');
    $total_quotes = $stmt->fetchColumn();

    // 2. Total Projects
    $stmt = $pdo->query('SELECT COUNT(*) FROM projects');
    $total_projects = $stmt->fetchColumn();

    // 3. Status Breakdown
    $stmt = $pdo->query('SELECT status, COUNT(*) as count FROM projects GROUP BY status');
    $breakdown = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

    // 4. Logins today
    $stmt = $pdo->query('SELECT COUNT(*) FROM login_history WHERE login_time >= CURDATE()');
    $logins_today = $stmt->fetchColumn();

    echo json_encode([
        'success' => true,
        'data' => [
            'total_quotes' => (int) $total_quotes,
            'total_projects' => (int) $total_projects,
            'pending' => (int) ($breakdown['pending'] ?? 0),
            'in_progress' => (int) ($breakdown['in progress'] ?? 0),
            'review' => (int) ($breakdown['review'] ?? 0),
            'logins_today' => (int) $logins_today
        ]
    ]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch statistics.']);
}
?>