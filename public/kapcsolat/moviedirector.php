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