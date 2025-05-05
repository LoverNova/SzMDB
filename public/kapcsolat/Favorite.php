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

    // $input = json_decode(file_get_contents('php://input'), true);

    // if (isset($input['movieId'])) {
    //     $movieId = $input['movieId'];
    //     $clientId = $_SESSION["userId"]; //Use logged user usedID

    //     // Insert
    //     $query = "INSERT INTO clientmovie (clientId, movieId, watchList) VALUES ('$clientId', '$movieId', 1)";
    //     if (mysqli_query($connect, $query)) {
    //         http_response_code(200);
    //         echo json_encode(['message' => 'Movie added to favorites']);
    //     } else {
    //         http_response_code(500);
    //         echo json_encode(['error' => 'Failed to add movie to favorites']);
    //     }
    // } else {
    //     http_response_code(400);
    //     echo json_encode(['error' => 'Invalid input']);
    // }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
