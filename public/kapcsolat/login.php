<?php

require_once("kapcsolat.php");
require_once("session.php");

$error = '';
if($_SERVER['REQUEST_METHoD'] == 'POST'){
    if (!isset($_POST['email'])){
        $error .= '<p class="error">Kérem adjon meg egy emailt!</p>';
    }
    if (!isset(($_POST['password']))){
        $error .= '<p class="error">Kérem adjon meg egy jelszót!</p>';
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
            }
        }
    }
}