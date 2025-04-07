<?php

require_once("kapcsolat.php");
require_once("session.php");

header("Content-Type: application/json");
ob_start();

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents("php://input"), true);

        if (!isset($input['email']) || !isset($input['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Hiányzó email vagy jelszó!']);
            exit;
        }

        $email = trim($input['email']);
        $password = trim($input['password']);

        if ($query = $connect->prepare("SELECT * FROM client WHERE email = ?")) {
            $query->bind_param('s', $email);
            $query->execute();
            $result = $query->get_result();
            $user = $result->fetch_assoc();

            if ($user && password_verify($password, $user['pass'])) {
                $_SESSION["userId"] = $user['id'];
                $_SESSION["user"] = [
                    "id" => $user['id'],
                    "email" => $user['email'],
                    "username" => $user['username'],
                    "profilePicture" => $user['profilePicture'] // Store profile picture in session
                ];
                http_response_code(200);
                echo json_encode([
                    'message' => 'Sikeres bejelentkezés!'
                ]);
                
            } else {
                http_response_code(401);
                echo json_encode(['error' => 'Hibás email vagy jelszó!']);
            }
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Adatbázis hiba!']);
        }
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Helytelen HTTP metódus.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Szerverhiba: ' . $e->getMessage()]);
} finally {
    ob_end_clean();
}