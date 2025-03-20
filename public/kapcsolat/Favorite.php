<?php
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['movieId'])) {
        $movieId = $input['movieId'];
        $clientId = 1; //Replacing needed, baked userID

        // Insert
        $query = "INSERT INTO clientmovie (clientId, movieId, watchList, history) VALUES ('$clientId', '$movieId', 1, 0)";
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
