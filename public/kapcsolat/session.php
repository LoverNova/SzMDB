<?php

session_start();

header("Content-Type: application/json");

if (isset($_SESSION["userId"]) && $_SESSION["user"] === true) {
    echo json_encode([
        "loggedIn" => true,
        "profilePicture" => $_SESSION["user"]["profilePicture"] ?? null //check for profile picture
    ]);
} else {
    echo json_encode(["loggedIn" => false]);
}