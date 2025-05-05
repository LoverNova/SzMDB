<?php

require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT movie.releaseYear AS 'Year'
            FROM movie
            GROUP BY 1";

    $result = mysqli_query($connect, $sql);

    if(mysqli_num_rows($result) > 0){
        $year = [];
        while ($row = mysqli_fetch_assoc($result)){
            $movie[] = $row;
        }
        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode($movie); 
    }
    else{
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Szerver hiba!']); 
    }
}