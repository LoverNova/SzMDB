document.addEventListener("DOMContentLoaded", async () => {
    const profilePictureForm = document.getElementById("profile-picture-form");
    const profilePictureInput = document.getElementById("profile-picture-input");
    const profilePicture = document.getElementById("profile-picture");
    const removeProfilePictureButton = document.getElementById("remove-profile-picture-button");

    const response = await fetch("/SzMDB/public/kapcsolat/session.php");
    const sessionData = await response.json();

    const menu = document.querySelector(".menu");
    if (menu) {
        menu.innerHTML = ""; // Clear existing menu items

        if (sessionData.loggedIn) {
            // Update profile picture
            if (profilePicture && sessionData.profilePicture) {
                profilePicture.src = sessionData.profilePicture;
            }

            // Update menu for logged-in user
            const profileLink = document.createElement("a");
            profileLink.href = "/SzMDB/profile";
            profileLink.textContent = "Profil";
            profileLink.className = "menu-item";

            const logoutLink = document.createElement("a");
            logoutLink.href = "/SzMDB/logout";
            logoutLink.textContent = "Kijelentkezés";
            logoutLink.className = "menu-item";

            menu.appendChild(profileLink);
            menu.appendChild(logoutLink);
        } else {
            // Update menu for guest user
            const loginLink = document.createElement("a");
            loginLink.href = "/SzMDB/login";
            loginLink.textContent = "Bejelentkezés";
            loginLink.className = "menu-item";

            const registerLink = document.createElement("a");
            registerLink.href = "/SzMDB/register";
            registerLink.textContent = "Regisztráció";
            registerLink.className = "menu-item";

            menu.appendChild(loginLink);
            menu.appendChild(registerLink);
        }
    } else {
        console.warn("Menu element not found in the DOM.");
    }

    if (profilePictureForm) {
        profilePictureForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("profilePicture", profilePictureInput.files[0]);

            try {
                const uploadResponse = await fetch("/SzMDB/public/kapcsolat/uploadProfilePicture.php", {
                    method: "POST",
                    body: formData,
                });

                const responseText = await uploadResponse.text(); // Get raw response text
                console.log("Raw Response:", responseText); // Log raw response for debugging

                try {
                    const result = JSON.parse(responseText); // Parse JSON response

                    if (uploadResponse.ok) {
                        if (profilePicture) {
                            profilePicture.src = result.profilePictureURL;
                        }
                        alert("Profilkép sikeresen frissítve!");
                    } else {
                        alert(result.error || "Hiba történt a profilkép feltöltése során.");
                    }
                } catch (parseError) {
                    console.error("Error parsing server response:", parseError);
                    console.error("Raw Response:", responseText);
                    alert("Hiba történt a szerver válasz feldolgozása során.");
                }
            } catch (error) {
                console.error("Error during upload:", error);
                alert("Hiba történt a profilkép feltöltése során.");
            }
        });
    } else {
        console.error("profilePictureForm element not found in the DOM.");
    }

    if (removeProfilePictureButton) {
        removeProfilePictureButton.addEventListener("click", async () => {
            const confirmRemoval = confirm("Biztosan eltávolítja a profilképet?");
            if (!confirmRemoval) return;

            const removeResponse = await fetch("/SzMDB/public/kapcsolat/removeProfilePicture.php", {
                method: "POST",
            });

            const result = await removeResponse.json();

            if (removeResponse.ok) {
                if (profilePicture) {
                    profilePicture.src = "/SzMDB/public/img/default-profile.png"; // Reset to default
                }
                alert("Profilkép sikeresen eltávolítva!");
            } else {
                alert(result.error || "Hiba történt a profilkép eltávolítása során.");
            }
        });
    }

    // Redirect to the main page after login, only if not already on the profile page
    if (sessionData.loggedIn && window.location.pathname !== "/SzMDB/profile") {
        window.location.href = "/SzMDB/"; // Redirect to the main page
    }

    loadFavorites(); // Load favorites when the page loads
});

// Remove the "Poszter", "Cím", and "Leírás" sections and their buttons
const container = document.querySelector('.container');
if (container) {
    container.remove();
}

async function loadFavorites() {
    const favoritesList = document.getElementById("favorites-list");

    try {
        const response = await fetch("/SzMDB/public/kapcsolat/favorite.php");
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error loading favorites:", errorData.error || "Ismeretlen hiba");
            throw new Error(errorData.error || "Hiba a kedvencek lekérésekor.");
        }

        const favorites = await response.json();
        favoritesList.innerHTML = ""; // Clear existing content

        favorites.forEach(movie => {
            const favoriteItem = document.createElement("div");
            favoriteItem.classList.add("favorite-item");

            favoriteItem.innerHTML = `
                <a href="/SzMDB/moviePage?movieId=${movie.id}" class="favorite-link">
                    <img src="/SzMDB/public/uploads/moviePoster/${movie.pictureURL}" alt="${movie.title}">
                    <div class="movie-title">${movie.title}</div>
                </a>
            `;

            favoritesList.appendChild(favoriteItem);
        });
    } catch (error) {
        console.error("Error loading favorites:", error);
        favoritesList.innerHTML = "<p>Nem sikerült betölteni a kedvenceket.</p>";
    }
}