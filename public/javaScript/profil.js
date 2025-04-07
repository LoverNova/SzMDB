const header = document.createElement('div');
header.className = 'header';

const logo = document.createElement('div');
logo.className = 'logo';

const logoImg = document.createElement('img');
logoImg.src = 'logo.png';
logoImg.alt = 'Logo';

const logoText = document.createElement('span');
logoText.textContent = 'Név';

logo.appendChild(logoImg);
logo.appendChild(logoText);

const menu = document.createElement('nav');
menu.className = 'menu';

header.appendChild(logo);
header.appendChild(menu);
document.body.appendChild(header);

// Tartalom létrehozása
const container = document.createElement('div');
container.className = 'container';

const poster = document.createElement('div');
poster.className = 'poster';
poster.textContent = 'Poszter';

const content = document.createElement('div');
content.className = 'content';

const titleContainer = document.createElement('div');
titleContainer.className = 'title';

const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.id = 'title';
titleInput.value = 'Cím';

titleContainer.appendChild(titleInput);

const descriptionContainer = document.createElement('div');
descriptionContainer.className = 'description';

const descriptionTextarea = document.createElement('textarea');
descriptionTextarea.id = 'description';
descriptionTextarea.rows = 5;
descriptionTextarea.textContent = 'Leírás';

descriptionContainer.appendChild(descriptionTextarea);

const buttons = document.createElement('div');
buttons.className = 'buttons';

const titleButton = document.createElement('button');
titleButton.textContent = 'Cím módosítása';
titleButton.onclick = function () {
    alert('A cím: ' + titleInput.value);
};

const descriptionButton = document.createElement('button');
descriptionButton.textContent = 'Leírás módosítása';
descriptionButton.onclick = function () {
    alert('A leírás: ' + descriptionTextarea.value);
};

buttons.appendChild(titleButton);
buttons.appendChild(descriptionButton);

content.appendChild(titleContainer);
content.appendChild(descriptionContainer);
content.appendChild(buttons);

container.appendChild(poster);
container.appendChild(content);
document.body.appendChild(container);

document.addEventListener("DOMContentLoaded", async () => {
    const profilePictureForm = document.getElementById("profile-picture-form");
    const profilePictureInput = document.getElementById("profile-picture-input");
    const profilePicture = document.getElementById("profile-picture");
    const removeProfilePictureButton = document.getElementById("remove-profile-picture-button");

    const response = await fetch("/SzMDB/public/kapcsolat/session.php");
    const sessionData = await response.json();

    const menu = document.querySelector(".menu");
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
});