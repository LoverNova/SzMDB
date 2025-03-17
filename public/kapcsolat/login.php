<?php

require_once("kapcsolat.php");
require_once("session.php");

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if (!isset($_POST['email'])){
        http_response_code(404);
        header("Content-type:application/json");
        echo json_encode('error' => 'Hiányzó email!');
    }
    if (!isset(($_POST['password']))){
        http_response_code(404);
        header("Content-type:application/json");
        echo json_encode('error' => 'Hiányzó jelszó!');
    }
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

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
                    http_response_code(404);
                    header("Content-type:application/json");
                    echo json_encode('error' => 'Hibás jelszó!');
                }
            }
        }
        else{
            http_response_code(404);
            header("Content-type:application/json");
            echo json_encode('error' => 'Rossz email!');
        }
    }
}