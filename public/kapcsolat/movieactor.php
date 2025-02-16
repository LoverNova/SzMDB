<?php

//Hasn't been checked
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT person.id AS 'actorId', movie.id AS 'movieId', movieactor.role
              FROM person, movie, movieactor
              WHERE movieactor.actorId = person.id AND movieactor.movieId = movie.id;";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $movieactor = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $movieactor[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($movieactor);  
    }
}