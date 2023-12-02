<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // database connection
    $conn = new mysqli("localhost", "root", "", "users");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch values from the registration form
    $username = $_POST["username"];
    $password = $_POST["password"];
    $age = $_POST["age"];
    $gender = $_POST["gender"];
    $email = $_POST["email"];
    $location = $_POST["location"];

    // Validate and sanitize data
    $username = filter_var($username, FILTER_SANITIZE_STRING);
    $age = filter_var($age, FILTER_VALIDATE_INT);
    $gender = filter_var($gender, FILTER_SANITIZE_STRING);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    $location = filter_var($location, FILTER_SANITIZE_STRING);

    // Check if required fields are not empty
    if (empty($username) || empty($password) || empty($age) || empty($gender) || empty($email) || empty($location)) {
        $response = array("success" => false, "message" => "All fields are required");
    } else {
        // Check if the username already exists
        $checkUsernameQuery = $conn->prepare("SELECT COUNT(*) as count FROM users WHERE username = ?");
        $checkUsernameQuery->bind_param("s", $username);
        $checkUsernameQuery->execute();
        $result = $checkUsernameQuery->get_result();
        $row = $result->fetch_assoc();
        $checkUsernameQuery->close();

        if ($row['count'] > 0) {
            $response = array("success" => false, "message" => "Username already exists. Please choose a different username.");
        } else {
            // Continue with the insertion
            // Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            

            // Example database insertion (use prepared statements for security)
            $stmt = $conn->prepare("INSERT INTO users (username, password, age, gender, email, location) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssisss", $username, $hashedPassword, $age, $gender, $email, $location);

            if ($stmt->execute()) {
                $response = array("success" => true, "message" => "Registration successful");
            } else {
                $response = array("success" => false, "message" => "Error during registration");
            }

            $stmt->close();
        }
    }

    echo json_encode($response);
}

?>
