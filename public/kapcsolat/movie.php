<?php
//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['movieId'])){
        $movieId = $_GET['movieId'];

        $query = "SELECT movie.id, movie.title, movie.pictureURL, movie.description, movie.isItASeries, series.id AS 'sereiesId', series.title AS 'seriesTitle', movie.part
                  FROM movie, series
                  WHERE movie.seriesId = series.id AND movie.id = $movieId";
        
        $result = mysqli_query($connect, $query);
    
        if ($result) {
            $movie = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $movie[] = $row;
            }
            header("Content-Type: application/json");
            echo json_encode($movie);  
        }
    }
}

elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
    if(empty($_POST['title'])){
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Nincs megadva cím!']);
    }
    elseif(empty($_POST['description'])){
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Nincs megadva film leírás!']);
    }
    elseif(empty($_POST['poster'])){
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Nincs feltöltve film poster!']);
    }
    else{
        $poster = $_POST['poster'];
        $description = $_POST['description'];
        $title = $_POST['title'];
        $series = 'false';
        if(empty($_POST['series'])){
            $series = 'true';
        }
        


        $sql = "INSERT INTO movie (title, description, pictureURL, isItASeries)
                VALUE ('$title', '$description', '$poster', $series)";
        $result = mysqli_query($connect, $sql);
        if($result){
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode($_POST);
        }
        else{
            http_response_code(404);
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Szerver hiba!']);
        }
    }
}

if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        $sql = "SELECT * FROM movie WHERE id='$id' ";
        $result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result)>0){ //ha a visszaadott sorok száma nagyobb nulla
            //volt ilyen id
            $sql = "DELETE FROM movie WHERE id='$id'";
            if(mysqli_query($conn, $sql)){
                //sikeres törlés
                echo "A film törölve";
            }
            else{
                echo "törlés sikertelen";
            }
        }
    }
}