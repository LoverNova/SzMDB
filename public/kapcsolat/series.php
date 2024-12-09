<?php
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT series.id, series.title
              FROM series";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $kategoriak = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $kategoriak[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($kategoriak);  
    }
}