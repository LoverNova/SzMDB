<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];
    // Change default path to the final location
    $data = json_decode(file_get_contents("./view/json/movies.json", true) ,true);
    $defaultPath = '/SzMDB/';
    switch($path){
        case $defaultPath:
            require_once("./view/cimlap.html");
            echo($data[0]["nev"]);
            break;
        default:
            require_once("./view/404.html");
            break;
    }
?>
