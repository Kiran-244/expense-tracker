<?php
$host = '192.168.81.83';
$dbname = 'expense_tracker';
$username = 'root';  
$password = '';      

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['description']) && isset($data['amount'])) {
        $description = $data['description'];
        $amount = $data['amount']; // Accept amount directly in rupees

        $stmt = $pdo->prepare('INSERT INTO expenses (description, amount) VALUES (:description, :amount)');
        if ($stmt->execute(['description' => $description, 'amount' => $amount])) {
            echo json_encode(['status' => 'success', 'message' => 'Data inserted successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error inserting data.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} catch (PDOException $e) {
    // Catch and display connection errors
    echo json_encode(['status' => 'error', 'message' => "Connection failed: " . $e->getMessage()]);
}
?>
