<?php

//Hasn't been checked
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT person.id AS 'directorId', movie.id AS 'movieId'
              FROM person, movie, moviedirector
              WHERE moviedirector.directorId = person.id AND moviedirector.movieId = movie.id;";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $moviedirector = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $moviedirector[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($moviedirector);  
    }
}   

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        isset($_POST['directorId']) &&//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
        isset($_POST['movieId']) 
    ){
        $directorId = $_POST['directorId'];
        $movieId = $_POST['movieId'];

        $sql = "INSERT INTO moviedirector (directorId, movieId) 
                VALUES ('$directorId','$movieId')"; 
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