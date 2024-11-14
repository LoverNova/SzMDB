<?php
//kapcsolódás az adatbázishoz
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "szmdb";

//kapcsolat létrehozása
$connect = mysqli_connect($servername, $username, $password, $dbname);

//ha nem jött létre a kapcsolat
if (!$connect) {
    die("A kapcsolat nem jött létre: ". mysqli_connect_error()); // mysqli_connect_error() --> hiba üzenet
}