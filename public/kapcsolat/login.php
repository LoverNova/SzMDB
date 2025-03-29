<?php

require_once("kapcsolat.php");
require_once("session.php");

header("Content-type:application/json");

if($_SERVER['REQUEST_METHOD'] === 'POST'){
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

    $sql = "SELECT * FROM client WHERE email = '$email'";
    $result = mysqli_query($connect, $sql);

    if(mysqli_num_rows($result) === 0){
        http_response_code(401);
        echo json_encode(['error' => 'Rossz email!']);
    }
    else{
        $row = mysqli_fetch_assoc($result);
        if(password_verify($password, $row['pass'])){
            http_response_code(200);
            $_SESSION["userId"] = $row['id'];
            $_SESSION["user"] = $row;
            echo json_encode($_SESSION);
        }
        else{
            http_response_code(402);
            echo json_encode(['error' => "hibás jelszó"]);
        }
    }
    
}