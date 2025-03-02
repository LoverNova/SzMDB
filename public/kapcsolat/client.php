<?php

//Hasn't been checked
//This is all wrong needs to be fixed !!!!!!
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

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        isset($_POST['clientId']) &&//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
        isset($_POST['movieId']) &&
        isset($_POST['watchList']) &&
        isset($_POST['history'])
    ){
        $clientId = $_POST['clientId'];
        $movieId = $_POST['movieId'];
        $watchList = $_POST['watchList'];
        $history = $_POST['history'];

        $sql = "INSERT INTO clientmovie (clientId, movieId, watchList, history)
                VALUES ('$clientId','$movieId', '$watchList', '$history')";
        if(mysqli_query($conn, $sql)){
            header('Content-Type: application/json');
            echo json_encode(['id' => "Sikeres feltöltés"]);
        }
        else{
            header('Content-Type: application/json');
            echo json_encode(['üzenet' => 'Hiányos adatok']);
        }
    }
}