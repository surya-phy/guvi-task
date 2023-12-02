<?php

// Assuming you have a database connection
$conn = new mysqli("localhost", "root", "", "users");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch user information
function fetchUserInfo($conn) {
    // Fetch values from the session or wherever you store the user identifier
    $userId = $_SESSION["user_id"]; // Update this based on how you store user sessions

    // Fetch user information from the database
    $result = $conn->query("SELECT * FROM users WHERE id = $userId");

    if ($result) {
        $userInfo = $result->fetch_assoc();
        $result->free_result();

        return array("success" => true, "userInfo" => $userInfo);
    } else {
        return array("success" => false, "message" => "Error fetching user information.");
    }
}

// Function to update user information
function updateUserInfo($conn) {
    // Fetch values from the session or wherever you store the user identifier
    $userId = $_SESSION["user_id"]; // Update this based on how you store user sessions

    // Collect updated information from the POST request
    $dob = $_POST["dob"];
    $phone = $_POST["phone"];
    $college = $_POST["college"];
    $degree = $_POST["degree"];
    $mother = $_POST["mother"];
    $father = $_POST["father"];
    $caste = $_POST["caste"];
    $nationality = $_POST["nationality"];

    // Update user information in the profile table
    $updateResult = $conn->query("UPDATE profile SET dob = '$dob', phone_number = '$phone', college = '$college', degree = '$degree', mothers_name = '$mother', fathers_name = '$father', caste = '$caste', nationality = '$nationality' WHERE user_id = $userId");

    if ($updateResult) {
        return array("success" => true, "message" => "Profile updated successfully!");
    } else {
        return array("success" => false, "message" => "Error updating profile: " . $conn->error);
    }
}

// Check the request type
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Fetch user information
    $response = fetchUserInfo($conn);
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Update user information
    $response = updateUserInfo($conn);
} else {
    $response = array("success" => false, "message" => "Invalid request method.");
}

// Close the database connection
$conn->close();

// Return JSON response
echo json_encode($response);

?>
