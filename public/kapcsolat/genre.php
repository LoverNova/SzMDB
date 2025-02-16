<?php

//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT genre.id, genre.genre
              FROM genre";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $nationalities = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $nationalities[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($nationalities);  
    }
}   