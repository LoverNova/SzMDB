<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];
    // Change default path to the final location
    $defaultPath = '/SzMDB/';
    switch($path){
        case $defaultPath:
            require_once("./view/cimlap.php");
            break;
        default:
            require_once("./view/404.php");
            break;
    }
?>
