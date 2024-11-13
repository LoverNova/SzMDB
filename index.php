<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];
    // Change default path to the final location
    $defaultPath = '/SzMDB/';
    switch($path){
        case $defaultPath:
            $table = json_decode(".view/movies.json", true);
            var_dump($table);
            require_once("./view/cimlap.php");
            break;
        default:
            require_once("./view/404.php");
            break;
    }
?>
