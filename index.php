<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];


    switch($path){
        case "/13_F1/2024_10_01/Ingatlanok/" :
            
        default:
            echo("404 - page not found <a href = '/13_F1/2024_10_01/Ingatlanok/'>Ugrás a címlapra</a>");
            break;
    }
?>