<?php

//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT movie.id, movie.title, movie.pictureURL, movie.description, movie.isItASeries, series.id AS 'sereiesId', series.title AS 'seriesTitle', movie.part
              FROM movie, series
              WHERE movie.seriesId = series.id";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $movie = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $movie[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($movie);  
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        isset($_POST['title']) &&//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
        isset($_POST['pictureURL']) &&
        isset($_POST['description']) &&
        isset($_POST['isItASeries']) && //
        isset($_POST['sereiesId']) &&   //  The check on these might not be needed
        isset($_POST['part'])           //  
    ){
        $title = $_POST['title'];
        $pictureURL = $_POST['pictureURL'];
        $description = $_POST['description'];
        $isItASeries = $_POST['isItASeries'];
        $isItASeries = $_POST['sereiesId'];
        $isItASeries = $_POST['part'];

        $sql = "INSERT INTO movie (title, pictureURL, description, isItASeries, sereiesId, part) 
                VALUES ('$title','$pictureURL', '$description', '$isItASeries', '$sereiesId', '$part')"; //There may be a bobo here. Will have to check
        if(mysqli_query($conn, $sql)){
            header('Content-Type: application/json');
            echo json_encode(['id' => "Sikeres feltöltés"]);
        }
        else{
            header('Content-Type: application/json');
            echo json_encode(['üzenet' => 'Hiányos adatok']);
        }
    }
}