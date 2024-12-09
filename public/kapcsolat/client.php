<?php
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT clientmovie.clientId, clientmovie.movieId, clientmovie.watchList, clientmovie.history
              FROM clientmovie;";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $client = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $client[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($client);  
    }
}   