<?php

require_once("kapcsolat.php");
require_once("session.php");

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if (isset(
        $_POST['name'],
        $_POST['email'],
        $_POST['password']
    )){
        $username = trim($_POST['name']);
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        
        if (!empty($username)){
            if (!empty($email)){
                if(!empty($password_hash)){
                    if($query = $connect->prepare("SELECT * FROM client WHERE email = ?")){
                            $error = '';
                        $query->bind_param('s', $email);
                        $query->execute();
                        $query->store_result();
                        if(!$query->num_rows > 0){    
                            //password validation here
                            
                            
                            //registration 
                            if(empty($error)){
                                $insertQuery = $connect->prepare("INSERT INTO client (email, username, pass) VALUES (?, ?, ?)");
                                $insertQuery->bind_param("sss", $email, $username, $password_hash);
                                $result = $insertQuery->execute();
                                if($result){
                                    http_response_code(200);
                                    header("Content-type:application/json");
                                    echo json_encode('message' => 'Sikeres regisztáció!');
                                }
                                else{
                                    http_response_code(404);
                                    header("Content-type:application/json");
                                    echo json_encode('error' => "Valami hiba történt!");
                                }
                            }
                        }
                        else{
                            http_response_code(404);
                            header("Content-type:application/json");
                            echo json_encode('error' => 'Az email már haszálatban van!');
                        }
                    }
                }
                else{
                    http_response_code(404);
                    header("Content-type:application/json");
                    echo json_encode('error' => "Nincs jelszó megadva!");
                }
            }
            else{
                http_response_code(404);
                header("Content-type:application/json");
                echo json_encode('error' => "Email nincs megadva!");
            }
        }
        else {
            http_response_code(404);
            header("Content-type:application/json");
            echo json_encode('error' => "Felhasználó név nincs megadva!");
        }
    }
    else{
        http_response_code(404);
        header("Content-type:application/json");
        echo json_encode('error' => 'Hiányos kérés.');
    }
    $query->close();
    $insertQuery->close();
}