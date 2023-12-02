// work/js/index.js

$(document).ready(function () {
    $("#registrationForm").submit(function (event) {
        event.preventDefault();

        // Fetch values from the registration form
        var username = $("#username").val();
        var password = $("#password").val();
        var verifyPassword = $("#verifyPassword").val();
        var age = $("#age").val();
        var gender = $("#gender").val();
        var email = $("#email").val();
        var location = $("#location").val();

        // Check if passwords match
        if (password !== verifyPassword) {
            showError("Passwords do not match. Please verify your password.");
            return;
        }

        // Create data object to send in the AJAX request
        var data = {
            username: username,
            password: password,
            age: age,
            gender: gender,
            email: email,
            location: location
        };

        // Make AJAX request to register.php (replace with your actual endpoint)
        $.ajax({
            type: "POST",
            url: "../php files/register.php", // Update the URL based on your project structure
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    showSuccess("Registration successful!");
                    // Redirect to the login page
                    window.location.href = "../html files/login.html";
                } else {
                    showError("Registration failed. " + response.message);
                }
            },
            error: function (xhr, status, error) {
                var errorMessage = "Error during registration. ";
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage += xhr.responseJSON.message;
                } else {
                    errorMessage += error;
                }
                showError(errorMessage);
            }
        });
    });

    function showError(message) {
        $("#error-message").html(message).fadeIn();
        setTimeout(function () {
            $("#error-message").fadeOut();
        }, 5000); // Hide after 5 seconds
    }

    function showSuccess(message) {
        $("#success-message").html(message).fadeIn();
        setTimeout(function () {
            $("#success-message").fadeOut();
        }, 5000); // Hide after 5 seconds
    }
});
