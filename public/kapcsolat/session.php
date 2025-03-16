<?php

session_start();

if(isset($_SESSION["userId"]) && $_SESSION["user"] === true){
    header("location: SzMDB/");
    exit;
}