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

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        isset($_POST['genre'])//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
    ){
        $genre = $_POST['genre'];

        $sql = "INSERT INTO genre (genre)
                VALUES ('$genre')";
        if(mysqli_query($conn, $sql)){
            header('Content-Type: application/json');
            echo json_encode('id' => "Sikeres feltöltés")
        }
        else{
            header('Content-Type: application/json');
            echo('üzenet' => 'Hiányos adatok')
        }
    }
}