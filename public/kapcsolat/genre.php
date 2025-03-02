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
        $sql = "SELECT * FROM genre WHERE id='$id' ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0){ //ha a visszaadott sorok száma nagyobb nulla
            //volt ilyen id
            $sql = "DELETE FROM genre WHERE id='$id'";
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