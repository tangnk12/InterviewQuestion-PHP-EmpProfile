<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Process the POST data
$data = json_decode(file_get_contents("php://input"), true);

$required = ['employeeName', 'gender', 'martialStatus', 'phoneNo', 'email', 'address', 'dateOfBirth', 'nationality', 'hireDate', 'department'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(["message" => "$field is required"]);
        exit;
    }
}

$file = 'employees.json';
$employees = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$employees[] = $data;

file_put_contents($file, json_encode($employees, JSON_PRETTY_PRINT));
echo json_encode(["message" => "Employee added successfully"]);