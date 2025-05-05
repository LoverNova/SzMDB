<?php

if (!defined('SESSION_CHECK')) {
    
    session_start();

    header("Content-Type: application/json");

    if (isset($_SESSION["userId"]) && isset($_SESSION["user"])) {
        http_response_code(200);
        echo json_encode([
            "loggedIn" => true,
            "admin" => $_SESSION["user"]["admin"],
            "profilePicture" => $_SESSION["user"]["profilePicture"] ?? null // Include profile picture
        ]);
    } else {
        echo json_encode(["loggedIn" => false]);
    }
}