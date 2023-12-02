// work/js_files/login.js

$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();

        // Fetch values from the login form
        var username = $("#username").val();
        var password = $("#password").val();

        // Create data object to send in the AJAX request
        var data = {
            username: username,
            password: password
        };

        // Make AJAX request to login.php (replace with your actual endpoint)
        $.ajax({
            type: "POST",
            url: "../php files/login.php",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.success) {
                    // Save user login status and information in local storage
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('username', username);

                    showSuccess(response.message);
                    // Redirect to profile page or handle as needed
                    window.location.href = "../html files/profile.html"; // Update with your profile page URL
                } else {
                    showError(response.message);
                }
            },
            error: function (xhr, status, error) {
                showError("Error during login. " + error);
            }
        });
    });

    function showError(message) {
        $("#error-message").html(message).fadeIn();
    }

    function showSuccess(message) {
        $("#error-message").html(message).css("color", "#2ecc71").fadeIn();
    }
});
