<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];
    // Change default path to the final location
    $defaultPath = '/SzMDB/';
    switch($path){
        case $defaultPath:
            require_once("./view/cimlap.html");
            break;
        case $defaultPath . "moviePage":
            require_once("./view/moviePage.html");
            break;
        case $defaultPath . "profile":
            require_once("./view/profil.html");
            break;
        case $defaultPath . "login":
            require_once("./view/login.html");
            break;
        case $defaultPath . "register":
            require_once("./view/register.html");
            break;
        case $defaultPath . "addMovie":
            require_once("./view/addMovie.html");
            break;
        default:
            require_once("./view/404.html");
            break;
    }
?>
