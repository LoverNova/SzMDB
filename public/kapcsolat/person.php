<?php

//Hasn't been checked
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT person.id, person.name, person.yearOfBirth, person.pictureURL, person.isActor, person.isDirector, nationalities.id AS 'nationalityId', nationalities.nationality
              FROM person, nationalities
              WHERE person.nationalityId = nationalities.id ";
    
    $result = mysqli_query($connect, $query);

    if ($result) {
        $person = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $person[] = $row;
        }
        header("Content-Type: application/json");
        echo json_encode($person);  
    }
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(
        isset($_POST['name']) &&//létezik-e a $_POST szuperglobál 'kategoria' kúlcsú eleme; azért 'kategoria' mert a select name paramétere a kulcs
        isset($_POST['yearOfBirth']) &&
        isset($_POST['pictureURL']) &&
        isset($_POST['isActor']) &&
        isset($_POST['isDirector']) &&
        isset($_POST['nationalityId'])
    ){
        $name = $_POST['name'];
        $yearOfBirth = $_POST['yearOfBirth'];
        $pictureURL = $_POST['pictureURL'];
        $isActor = $_POST['isActor'];
        $isDirector = $_POST['isDirector'];
        $nationalityId = $_POST['nationalityId'];

        $sql = "INSERT INTO person (name, yearOfBirth, pictureURL, isActor, isDirector, nationalityId) 
                VALUES ('$name','$yearOfBirth','$pictureURL','$isActor','$isDirector','$nationalityId')"; 
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
        $sql = "SELECT * FROM person WHERE id='$id' ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0){ //ha a visszaadott sorok száma nagyobb nulla
            //volt ilyen id
            $sql = "DELETE FROM person WHERE id='$id'";
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