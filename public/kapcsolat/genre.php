<?php

//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT genre.id, genre.genre
              FROM genre";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $nationalities = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $nationalities[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($nationalities);  
    }
}  

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(empty(!$_POST['genre'])){
        $genre = $_POST['genre'];
        if($genre == "null"){
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode(['üzenet' => 'Hiányos adatok']);
        }
        else{
            $sql = "SELECT genre.id 
                    FROM genre 
                    WHERE genre.genre LIKE '$genre'";
            $result = mysqli_query($connect, $sql); 
    
            if(!mysqli_num_rows($result) > 0){
                $sql = "INSERT INTO genre (genre)
                        VALUES ('$genre')";
                if(mysqli_query($connect, $sql)){
                    $sql = "SELECT genre.id 
                            FROM genre 
                            WHERE genre.genre LIKE '$genre'";
                    $result = mysqli_query($connect, $sql); 
    
                    http_response_code(200);
                    header('Content-Type: application/json');
                    echo json_encode(mysqli_fetch_assoc($result));
                }
            }
            else{
                http_response_code(200);
                header('Content-Type: application/json');
                echo json_encode(mysqli_fetch_assoc($result));
            }
        }
    }
    else{
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['üzenet' => 'Hiányos adatok']);
    }
}