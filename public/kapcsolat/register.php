<?php

require_once("kapcsolat.php");
require_once("session.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    if($query = $connect->prepare("SELECT * FROM client WHERE email = ?")){
            $error = '';
        $query->bind_param('s', $email);
        $query->execute();
        $query->store_result();
        if($query->num_rows > 0){
            $error .= '<p class="error">Az email cím már regisztrálva van!</p>';
        }
        else{
            //password validation here


            //registration 
            if(empty($error)){
                $insertQuery = $connect->prepare("INSERT INTO client (email, username, pass) VALUES (?, ?, ?)");
                $insertQuery->bind_param("sss", $email, $username, $password_hash);
                $result = $insertQuery->execute();
                if($result){
                    $error .= '<p class="success">Sikeres regisztráció!</p>';
                }
                else{
                    $error .= '<p class="success">Valami probléma történt. A regisztráció sikertelen volt.</p>';
                }
            }
        }
    }
    $query->close();
    $insertQuery->close();
}