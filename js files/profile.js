// work/js_files/profile.js

$(document).ready(function () {
    // Fetch and display user information on page load
    fetchAndUpdateUserInfo();

    // Event listener for the update form
    $("#updateForm").submit(function (event) {
        event.preventDefault();

        // Collect updated information
        var updatedInfo = {
            dob: $("#dob").val(),
            phone: $("#phone").val(),
            college: $("#college").val(),
            degree: $("#degree").val(),
            mother: $("#mother").val(),
            father: $("#father").val(),
            caste: $("#caste").val(),
            nationality: $("#nationality").val(),
            // Add more fields as needed
        };

        // Make an AJAX request to profile.php for both fetch and update
        $.ajax({
            type: "POST",
            url: "../php files/profile.php", // Update the URL based on your project structure
            data: updatedInfo,
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    showSuccess(response.message);
                    // Update displayed user information
                    fetchAndUpdateUserInfo();
                } else {
                    showError("Error: " + response.message);
                }
            },
            error: function (xhr, status, error) {
                showError("Error: " + error);
            }
        });
    });

    // Event listener for the logout button
    $("#logoutBtn").click(function () {
        // Perform logout, for example, redirect to the login page
        window.location.href = "../html files/login.html"; // Update with your login page URL
    });

    // Function to fetch and update user information
    function fetchAndUpdateUserInfo() {
        // Make an AJAX request to profile.php for fetching user information
        $.ajax({
            type: "GET",
            url: "../php files/profile.php", // Update the URL based on your project structure
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    displayUserInfo(response.userInfo);
                } else {
                    showError("Error: " + response.message);
                }
            },
            error: function (xhr, status, error) {
                showError("Error: " + error);
            }
        });
    }

    // Function to display user information in the profile page
    function displayUserInfo(userInfo) {
        // Display user information
        $("#username").val(userInfo.username);
        $("#password").val(userInfo.password);
        $("#age").val(userInfo.age);
        $("#gender").val(userInfo.gender);
        $("#email").val(userInfo.email);
        $("#location").val(userInfo.location);

        // Additional Profile Fields
        $("#dob").val(userInfo.dob);
        $("#phone").val(userInfo.phone);
        $("#college").val(userInfo.college);
        $("#degree").val(userInfo.degree);
        $("#mother").val(userInfo.mother);
        $("#father").val(userInfo.father);
        $("#caste").val(userInfo.caste);
        $("#nationality").val(userInfo.nationality);

        // You can add more styling or formatting as needed
    }

    // Function to show error messages
    function showError(message) {
        $("#error-message").html(message).fadeIn();
    }

    // Function to show success messages
    function showSuccess(message) {
        $("#success-message").html(message).fadeIn();
    }
});
