<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$query = $_GET['q'] ?? '';

$file = 'employees.json';
$employees = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

$results = array_filter($employees, function ($employee) use ($query) {
    $query = strtolower($query);
    return strpos(strtolower($employee['employeeName']), $query) !== false ||
           strpos(strtolower($employee['email']), $query) !== false ||
           strpos(strtolower($employee['department']), $query) !== false;
});

echo json_encode(array_values($results)); 