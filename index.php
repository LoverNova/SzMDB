<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];
    // Change default path to the final location
    $defaultPath = '/SzMDB/';
    switch($path){
        case $defaultPath:
            require_once("./view/cimlap.html");
<<<<<<< HEAD
=======
            echo($data[0]["nev"]);
>>>>>>> 71736faac937f861adc5c744e7993a41cb702d52
            break;
        default:
            require_once("./view/404.html");
            break;
    }
?>
