<?php

require_once("kapcsolat.php");

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(!isset($_FILES['moviePoster'], $_POST['movieId'])){
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Hiányos kérés!']);
    }
    else{
        $target_dir = "../../public/uploads/moviePoster/";
        $target_file = $target_dir . "MoviePoster" . $_POST['movieId'] . "." . strtolower(pathinfo(basename($_FILES["moviePoster"]["name"]), PATHINFO_EXTENSION));
        
        if(move_uploaded_file($_FILES['moviePoster']['tmp_name'], $target_file)){
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode(['message' => 'Sikeres feltöltés!']);
        }
        else{
            http_response_code(404);
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Ismeretlen hiba!']);
        }
    }
}