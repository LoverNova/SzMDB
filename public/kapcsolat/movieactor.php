<?php

//Hasn't been checked
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT person.id AS 'actorId', movie.id AS 'movieId', movieactor.role
              FROM person, movie, movieactor
              WHERE movieactor.actorId = person.id AND movieactor.movieId = movie.id;";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $movieactor = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $movieactor[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($movieactor);  
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        isset($_POST['actorId']) &&//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
        isset($_POST['movieId']) &&
        isset($_POST['role'])
    ){
        $actorId = $_POST['actorId'];
        $movieId = $_POST['movieId'];
        $role = $_POST['role'];

        $sql = "INSERT INTO movieactor (actorId, movieId, role) 
                VALUES ('$actorId','$movieId', '$role')"; //There may be a bobo here. Will have to check
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
        $sql = "SELECT * FROM movieactor WHERE id='$id' ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0){ //ha a visszaadott sorok száma nagyobb nulla
            //volt ilyen id
            $sql = "DELETE FROM movieactor WHERE id='$id'";
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