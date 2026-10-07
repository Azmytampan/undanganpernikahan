<?php
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/koneksi.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Metode request tidak diizinkan.'
    ]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$attendance = trim($_POST['attendance'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Nama wajib diisi.']);
    exit;
}

if (mb_strlen($name) > 150) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Nama terlalu panjang.']);
    exit;
}

$allowedAttendance = ['Hadir', 'Tidak Hadir'];
if (!in_array($attendance, $allowedAttendance, true)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Pilihan kehadiran tidak valid.']);
    exit;
}

if (mb_strlen($message) > 2000) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Ucapan terlalu panjang.']);
    exit;
}

try {
    $sql = 'INSERT INTO rsvp (name, attendance, message) VALUES (:name, :attendance, :message)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name' => $name,
        ':attendance' => $attendance,
        ':message' => $message !== '' ? $message : null
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'RSVP berhasil disimpan.'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Data RSVP gagal disimpan.'
    ]);
}
