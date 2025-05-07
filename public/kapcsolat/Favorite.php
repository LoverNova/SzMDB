<?php
require_once("kapcsolat.php");

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION["userId"]) || !$_SESSION["user"]) {
        http_response_code(401);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Felhasználó nincs bejelentkezve']);
    }

    // Get the JSON input
    else{
        if(!empty($_POST["movieId"])){
            $movieId = $_POST["movieId"];
            $clientId = $_SESSION["userId"];

            $sql = "SELECT * 
                    FROM clientmovie
                    WHERE clientmovie.clientId = $clientId AND clientmovie.movieId = $movieId";

            $result = mysqli_query($connect, $sql);

            if(mysqli_num_rows($result) > 0){
                $sql = "DELETE FROM clientmovie
                        WHERE clientmovie.clientId = $clientId AND clientmovie.movieId = $movieId";

                if(mysqli_query($connect, $sql)){
                    http_response_code(200);
                    header("Content-Type: application/json");
                    echo json_encode(['message' => 'A film eltávolítva a kedvencekből!']);
                }
                else{
                    http_response_code(400);
                    header("Content-Type: application/json");
                    echo json_encode(['error' => 'Ismeretlen hiba!']);
                }
            }
            else{
                $sql = "INSERT INTO clientmovie (clientId, movieId)
                        VALUE ($clientId,$movieId)";
                
                if(mysqli_query($connect, $sql)){
                    http_response_code(200);
                    header("Content-Type: application/json");
                    echo json_encode(['message' => 'A film hozzáadva a kedvencekhez!']);
                }
                else{
                    http_response_code(400);
                    header("Content-Type: application/json");
                    echo json_encode(['error' => 'Ismeretlen hiba!']);
                }
            }
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_SESSION["userId"])) {
        http_response_code(401);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Felhasználó nincs bejelentkezve']);
        exit;
    }

    $clientId = $_SESSION["userId"];
    $sql = "SELECT movie.id, movie.title, movie.pictureURL 
            FROM clientmovie 
            INNER JOIN movie ON clientmovie.movieId = movie.id 
            WHERE clientmovie.clientId = $clientId";

    $result = mysqli_query($connect, $sql);

    if ($result) {
        $favorites = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $favorites[] = $row;
        }
        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode($favorites);
    } else {
        http_response_code(500);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Hiba a kedvencek lekérésekor']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
