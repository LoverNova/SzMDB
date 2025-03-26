<?php

require_once("kapcsolat.php");
require_once("session.php");

header("Content-Type: application/json"); // Ensure JSON resp
ob_start(); // Start output buffering 

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $input = json_decode(file_get_contents("php://input"), true); // Parse JSON input
        if (isset($input['name'], $input['email'], $input['password'])) {
            $username = trim($input['name']);
            $email = trim($input['email']);
            $password = trim($input['password']);
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            if (!empty($username)) {
                if (!empty($email)) {
                    if (!empty($password_hash)) {
                        if ($query = $connect->prepare("SELECT * FROM client WHERE email = ?")) {
                            $error = '';
                            $query->bind_param('s', $email);
                            $query->execute();
                            $query->store_result();
                            if (!$query->num_rows > 0) {
                                // Registration
                                if (empty($error)) {
                                    $insertQuery = $connect->prepare("INSERT INTO client (email, username, pass) VALUES (?, ?, ?)");
                                    $insertQuery->bind_param("sss", $email, $username, $password_hash);
                                    $result = $insertQuery->execute();
                                    if ($result) {
                                        http_response_code(200);
                                        echo json_encode(['message' => 'Sikeres regisztáció!']);
                                    } else {
                                        http_response_code(404);
                                        echo json_encode(['error' => "Valami hiba történt!"]);
                                    }
                                }
                            } else {
                                http_response_code(404);
                                echo json_encode(['error' => 'Az email már haszálatban van!']);
                            }
                            $query->close();
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(['error' => "Nincs jelszó megadva!"]);
                    }
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => "Email nincs megadva!"]);
                }
            } else {
                http_response_code(404);
                echo json_encode(['error' => "Felhasználó név nincs megadva!"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Hiányos kérés.']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Helytelen HTTP metódus.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Szerverhiba: ' . $e->getMessage()]);
} finally {
    ob_end_clean(); // Clean unexpected output
}