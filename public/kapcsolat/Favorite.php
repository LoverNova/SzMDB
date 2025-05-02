<?php
require_once("kapcsolat.php");
require_once("session.php");

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!isset($_SESSION["userId"]) || !$_SESSION["user"]) {
        http_response_code(401);
        echo json_encode(['error' => 'Felhasználó nincs bejelentkezve']);
        exit;
    }

    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['movieId'])) {
        $movieId = $input['movieId'];
        $clientId = $_SESSION["userId"]; //Use logged user usedID

        // Insert
        $query = "INSERT INTO clientmovie (clientId, movieId, watchList) VALUES ('$clientId', '$movieId', 1)";
        if (mysqli_query($connect, $query)) {
            http_response_code(200);
            echo json_encode(['message' => 'Movie added to favorites']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to add movie to favorites']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
