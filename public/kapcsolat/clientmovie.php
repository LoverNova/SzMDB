SELECT clientmovie.clientId, clientmovie.movieId, clientmovie.watchList, clientmovie.history
FROM clientmovie;
<?php
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT client.id AS 'clientId', movie.id AS 'movieId', clientmovie.watchList, clientmovie.history
              FROM clientmovie, movie, client
              WHERE clientmovie.clientId = client.id AND clientmovie.movieId = movie.id;";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $clientmovie = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $clientmovie[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($clientmovie);  
    }
}