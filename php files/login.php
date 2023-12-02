<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Assuming you have a database connection
    $conn = new mysqli("localhost", "root", "", "users");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch values from the login form
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate and sanitize data
    $username = filter_var($username, FILTER_SANITIZE_STRING);

    // Check if the username exists in the database
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();
    $stmt->close();

    if (!$hashedPassword) {
        // Username doesn't exist, display appropriate error message
        $response = array("success" => false, "message" => "Username not found. Please register first.");
    } else {
        // Check if the password is correct
        if (password_verify($password, $hashedPassword)) {
            $response = array("success" => true, "message" => "Login successful");
        } else {
            // Invalid password
            $response = array("success" => false, "message" => "Invalid password. Please try again.");
        }
    }

    echo json_encode($response);
}

?>