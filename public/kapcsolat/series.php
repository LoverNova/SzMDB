<?php

//Hasn't been checked
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

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        isset($_POST['title']) //létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
    ){
        $title = $_POST['title'];

        $sql = "INSERT INTO series (title) 
                VALUES ('$title')"; 
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
        $sql = "SELECT * FROM series WHERE id='$id' ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0){ //ha a visszaadott sorok száma nagyobb nulla
            //volt ilyen id
            $sql = "DELETE FROM series WHERE id='$id'";
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