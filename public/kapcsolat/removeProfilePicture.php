<?php

require_once("kapcsolat.php");

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION["userId"])) {
    http_response_code(401);
    echo json_encode(["error" => "Felhasználó nincs bejelentkezve."]);
    exit;
}

$userId = $_SESSION["userId"];
$defaultProfilePicture = "/SzMDB/public/img/default-profile.png";

$query = "UPDATE client SET profilePicture = NULL WHERE id = ?";
$stmt = $connect->prepare($query);
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    $_SESSION["user"]["profilePicture"] = $defaultProfilePicture; // Reset session profile pic
    echo json_encode(["message" => "Profilkép sikeresen eltávolítva."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Nem sikerült eltávolítani a profilképet."]);
}
