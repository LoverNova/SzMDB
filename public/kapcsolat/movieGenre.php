<?php

//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT moviegenre.movieId, moviegenre.genreId
              FROM moviegenre";
    
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
    if(
        isset($_POST['movieId']) &&//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
        isset($_POST['genreId']) 
    ){
        $movieId = $_POST['movieId'];
        $genreId = $_POST['genreId'];

        $sql = "INSERT INTO moviedirector (movieId, genreId) 
                VALUES ('$movieId','$movieId')"; 
        if(mysqli_query($conn, $sql)){
            header('Content-Type: application/json');
            echo json_encode('id' => "Sikeres feltöltés")
        }
        else{
            header('Content-Type: application/json');
            echo('üzenet' => 'Hiányos adatok')
        }
    }
}
