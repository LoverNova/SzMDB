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

if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "SELECT * FROM clientmovie WHERE id='$id' ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0){ //ha a visszaadott sorok száma nagyobb nulla
            //volt ilyen id
            $sql = "DELETE FROM clientmovie WHERE id='$id'";
            if(mysqli_query($conn, $sql)){
                //sikeres törlés
                echo "A felhasználó törölve";
            }
            else{
                echo "törlés sikertelen";
            }
        }
    }
}