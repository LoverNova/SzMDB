<?php
//Works with the update
require_once("kapcsolat.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(!isset(($_GET['movieId']))){
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Nincs megadva movieId!']);
    }
    else{
        $movieId = $_GET['movieId'];
        $sql = "SELECT movie.title, movie.description, movie.pictureURL
                FROM movie
                WHERE movie.id = $movieId";
        
        $result = mysqli_query($connect, $sql);

        if(mysqli_num_rows($result) > 0){
            $movie = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $movie[] = $row;
            }
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode($movie);
        }
        else{
            http_response_code(404);
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Nem létezik ilyen film!']);    
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
    elseif(empty($_POST['release'])){
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(['error' => 'Nincs megadva megjelenési év!']);
    }
    else{
        $poster = $_POST['poster'];
        $description = $_POST['description'];
        $title = $_POST['title'];
        $series = 'false';
        $release = $_POST['release'];
        if(!empty($_POST['series'])){
            $series = 'true';
        }
        


        $sql = "INSERT INTO movie (title, description, pictureURL, isItASeries, releaseYear)
                VALUE ('$title', '$description', '$poster', $series, $release)";
        $result = mysqli_query($connect, $sql);
        if($result){
            $sql = "SELECT MAX(movie.id) as id
                    FROM movie";
            $result = mysqli_query($connect, $sql);
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode(mysqli_fetch_assoc($result));
        }
        else{
            http_response_code(404);
            header("Content-Type: application/json");
            echo json_encode(['error' => 'Szerver hiba!']);
        }
    }
}