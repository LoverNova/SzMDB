<?php

require_once("kapcsolat.php");
require_once("session.php");

header("Content-type:application/json");
ob_start();

try{
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $input = json_decode(file_get_contents("php://input"), true); // Parse JSON input
        if (!isset($input['email'])){
            http_response_code(404);
            echo json_encode(['error' => 'Hiányzó email!']);
        }
        if (!isset(($input['password']))){
            http_response_code(406);
            echo json_encode(['error' => 'Hiányzó jelszó!']);
        }
        $email = trim($input['email']);
        $password = trim($input['password']);
    
        if(empty($error)){
            if($query = $connect->prepare("SELECT * FROM client WHERE email = ?")){
                $query->bind_param('s', $email);
                $query->execute();
                $row = $query->fetch();
                if($row){
                    if(password_verify($password, $row['password'])){
                        $_SESSION["userId"] = $row['id'];
                        $_SESSION["user"] = $row;
                    }
                    else{
                        http_response_code(402);
                        echo json_encode(['error' => 'Hibás jelszó!']);
                    }
                }
            }
            else{
                http_response_code(401);
                echo json_encode(['error' => 'Rossz email!']);
            }
        }
    }
}
catch (Exception $e){
    http_response_code(500);
    echo json_encode(['error' => 'Szerverhiba: ' . $e->getMessage()]);
} finally {
    ob_end_clean(); // Clean unexpected output
}