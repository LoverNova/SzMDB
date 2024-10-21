<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];


    switch($path){
        case "" :
            
        default:
            echo("404 - page not found <a href = ''>Ugrás a címlapra</a>");
            break;
    }
?>
