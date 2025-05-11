let openHam = document.querySelector('#openHam');
let closeHam = document.querySelector('#closeHam');
let navigationItems = document.querySelector('#navigation-items');

const hamburgerEvent = (navigation, close, open) => {
    navigationItems.style.display = navigation;
    closeHam.style.display = close;
    openHam.style.display = open;
};

openHam.addEventListener('click', () => hamburgerEvent("flex", "block", "none"));
closeHam.addEventListener('click', () => hamburgerEvent("none", "none", "block"))


// Check if the user is logged in

fetch('public/kapcsolat/session.php')
.then(response => {
    if(!response.ok){
        throw new Error("Szerver hiba");
    }
    return response.json();
})
.then(result => {
    console.log(result);
    
    if(result['loggedIn']){
        if(result['profilePicture'] == null){
            console.log(result['profilePicture']);
            
            html = `<img src="SzMDB/public/uploads/default-profile.png" class="profile" alt="">`;
        }
        else{
            html = `<img src="SzMDB/public/uploads/${result['profilePicture']}" class="profile" alt="">`;    
        }

        Profile = document.getElementById("loginProfile");
        Profile.classList.remove("addMovie")
        Profile.innerHTML = html;
        Profile.href = "/SzMDB/profile";

        document.getElementById('logOut').innerHTML = "Kijelentkezés"

        if(result['admin'] === 1){
            html = `Add new movie`;

            admin = document.getElementById("addMovie");
            admin.innerHTML = html;
            admin.href = "addMovie"
        }
    }
})


// async function checkLoginStatus() {
//     const response = await fetch('public/kapcsolat/session.php');
//     const result = await response.json();

//     if (result.loggedIn) {
//         // Display user profile picture
//         const userNameLink = document.createElement("a");
//         userNameLink.href = "profile"; 
//         userNameLink.style.display = "inline-block";
//         userNameLink.style.padding = "10px";
//         userNameLink.style.cursor = "pointer";

//         const profileImage = document.createElement("img");
//         profileImage.src = result.profilePicture || "/SzMDB/public/img/default-profile.png"; // Default profile picture
//         profileImage.alt = "Profilkép";
//         profileImage.style.width = "80px";
//         profileImage.style.height = "80px";
//         profileImage.style.borderRadius = "50%";
//         profileImage.style.objectFit = "cover";

//         userNameLink.appendChild(profileImage);
//         header.appendChild(userNameLink);
//     } else {
//         loginProfile = document.getElementById('loginProfile');

//         loginProfile.innerHTML;

//         // Display login and reg buttons
//         // const loginButton = document.createElement("button");
//         // loginButton.textContent = "Bejelentkezés";
//         // loginButton.style.marginRight = "10px";
//         // loginButton.addEventListener("click", () => {
//         //     window.location.href = "login";
//         // });

//         // const registerButton = document.createElement("button");
//         // registerButton.textContent = "Regisztráció";
//         // registerButton.addEventListener("click", () => {
//         //     window.location.href = "register";
//         // });

//         // header.appendChild(loginButton);
//         // header.appendChild(registerButton);
//     }
// }
