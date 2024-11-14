<?php
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT movie.id, movie.title, movie.pictureURL, movie.isItASeries, series.id AS 'sereiesId', series.title AS 'seriesTitle', movie.part
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