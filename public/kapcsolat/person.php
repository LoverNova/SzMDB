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