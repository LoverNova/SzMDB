document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/SzMDB/public/kapcsolat/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                // Display success message and add a button for redirection
                const errorMessage = document.getElementById("error-message");
                errorMessage.style.color = "green";
                errorMessage.textContent = result.message;

                window.location.href = "http://localhost/SzMDB/";

                // Create a button for redirection
                // const redirectButton = document.createElement("button");
                // redirectButton.textContent = "Ugrás a főoldalra";
                // redirectButton.style.marginTop = "10px";
                // redirectButton.addEventListener("click", () => {
                //     window.location.href = result.redirect || "/SzMDB/";
                // });

                // Append the button below the success message
                errorMessage.appendChild(redirectButton);
            } else {
                document.getElementById("error-message").textContent = result.error || "Hiba történt a bejelentkezés során.";
            }
        } catch (error) {
            console.error("Error during login:", error);
            document.getElementById("error-message").textContent = "Hiba történt a bejelentkezés során.";
        }
    });

    // "Regisztráció" link kattintása
    document.getElementById("register-link").addEventListener("click", () => {
        window.location.href = "/SzMDB/register";
    }); 
    document.getElementById("main-page").addEventListener("click", () => {
        window.location.href = "/SzMDB/";
    }); 
});