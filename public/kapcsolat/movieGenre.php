<?php

//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(!isset(($_GET['movieId']))){
        $sql = "SELECT moviegenre.movieId, moviegenre.genreId
                FROM moviegenre";
        
        $result = mysqli_query($connect, $sql);
    
        if (mysqli_num_rows($result)  > 0) {
            $genres = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $genres[] = $row;
            }
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode($genres);  
        }
    }
    else{
        $movieId = $_GET['movieId'];
        $sql = "SELECT genre.genre
                FROM genre, moviegenre
                WHERE genre.id = moviegenre.genreId AND moviegenre.movieId = $movieId";
        
        $result = mysqli_query($connect, $sql);
    
        if (mysqli_num_rows($result)  > 0) {
            $genres = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $genres[] = $row;
            }
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode($genres);  
        }
    }
}   

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        empty(!$_POST['movieId']) &&//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
        empty(!$_POST['genreId']) 
    ){
        $movieId = $_POST['movieId'];
        $genreId = $_POST['genreId'];

        $sql = "INSERT INTO moviegenre (movieId, genreId)
                VALUE ($movieId,$genreId)"; 
        if(mysqli_query($connect, $sql)){
            header('Content-Type: application/json');
            echo json_encode(['message' => "Sikeresen hozzáadva!"]);
        }
    }
    else{
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Hiányos adatok']);
    }
}

if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "SELECT * FROM moviegenre WHERE id='$id' ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0){ //ha a visszaadott sorok száma nagyobb nulla
            //volt ilyen id
            $sql = "DELETE FROM moviegenre WHERE id='$id'";
            if(mysqli_query($conn, $sql)){
                //sikeres törlés
                echo "A felhasználó törölve";
            }
            else{
                echo "törlés sikertelen";
            }
        }
    }
}