<?php

//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $movie_id = $_GET['movie_id'];

    $query = "SELECT movie.id, movie.title, movie.pictureURL, movie.description, movie.isItASeries, series.id AS 'sereiesId', series.title AS 'seriesTitle', movie.part
              FROM movie, series
              WHERE movie.seriesId = series.id AND movie.id = '$movie_id'";
    
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