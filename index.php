<?php
    $path = parse_url($_SERVER["REQUEST_URI"])["path"];

    echo (":3")

    switch($path){
        case "" :
            
            require_once("./view/cimlap.php")
            break;
        default:
            echo("404 - page not found <a href = ''>Ugrás a címlapra</a>");
            break;
    }
?>
