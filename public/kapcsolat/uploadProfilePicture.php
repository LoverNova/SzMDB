<?php

// ini_set('display_errors', 0);
// ini_set('log_errors', 1);
// ini_set('error_log', '../../logs/php_errors.log'); // Ensure the logs directory exists

require_once("kapcsolat.php");

// Prevent session.php from outputting JSON
if (!defined('SESSION_CHECK')) {
    define('SESSION_CHECK', true);
}
require_once("session.php");

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION["userId"])) {
    http_response_code(401);
    echo json_encode(["error" => "Felhasználó nincs bejelentkezve."]);
    exit;
}

// Increase PHP upload limits
ini_set('upload_max_filesize', '50M');
ini_set('post_max_size', '50M');
ini_set('max_execution_time', '300');
ini_set('max_input_time', '300');

// Start output buffering to prevent unexpected output
ob_start();

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_FILES["profilePicture"])) {
        $userId = $_SESSION["userId"];
        $uploadDir = "../../public/uploads/";

        // Ensure the uploads directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true); // Create the directory with write permissions
        }

        $fileName = basename($_FILES["profilePicture"]["name"]);
        $targetFilePath = $uploadDir . $userId . "_" . $fileName;

        if (move_uploaded_file($_FILES["profilePicture"]["tmp_name"], $targetFilePath)) {
            $profilePictureURL = "/SzMDB/public/uploads/" . $userId . "_" . $fileName;

            $query = "UPDATE client SET profilePicture = ? WHERE id = ?";
            $stmt = $connect->prepare($query);
            $stmt->bind_param("si", $profilePictureURL, $userId);

            if ($stmt->execute()) {
                $_SESSION["user"]["profilePicture"] = $profilePictureURL; // Update session
                // Clear output buffer
                ob_clean();
                echo json_encode(["profilePictureURL" => $profilePictureURL]);
            } else {
                ob_clean();
                http_response_code(500);
                echo json_encode(["error" => "Nem sikerült frissíteni a profilképet."]);
            }
        } else {
            ob_clean();
            http_response_code(500);
            echo json_encode(["error" => "Nem sikerült feltölteni a fájlt."]);
        }
    } else {
        ob_clean();
        http_response_code(400);
        echo json_encode(["error" => "Érvénytelen kérés."]);
    }
} catch (Exception $e) {
    ob_clean();
    http_response_code(500);
    echo json_encode(["error" => "Szerverhiba: " . $e->getMessage()]);
} finally {
    // Clean any unexpected output
    ob_end_flush();
}
