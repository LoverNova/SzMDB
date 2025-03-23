// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("login-form").addEventListener("submit", async (e) => {
//     e.preventDefault();
  
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
  
//     const response = await fetch("/SzMDB/public/kapcsolat/login.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ 
//         email: email, 
//         passwor: password 
//       }),
//     });
  
//     const result = await response.json();
  
//     if (response.ok) {
//       alert("Sikeres bejelentkezés!");
//       // További műveletek, pl. átirányítás
//     } else {
//       document.getElementById("error-message").textContent = result.message;
//     }
//   });
  
//   // "Regisztráció" gombra kattintva átirányítás
//   document.getElementById("register-link").addEventListener("click", () => {
//     window.location.href = "register"; // Regisztrációs oldal betöltése
//   });
// })

// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById("login-form").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const response = await fetch("/SzMDB/public/kapcsolat/login.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         "email": email,
//         "password": password
//       })
//     });

//     const result = await response.json();

//     if (response.ok) {
//       alert("Sikeres bejelentkezés!");
//     } else {
//       document.getElementById("error-message").textContent = result.message;
//     }
//   });

//   // "Bejelentkezés" link kattintása
//   document.getElementById("login-link").addEventListener("click", () => {
//     window.location.href = "login";
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email);
    console.log(password);
    
    const response = await fetch("/SzMDB/public/kapcsolat/login.php", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })

    const result = await response.json();

    if(response.ok){
      alert("Sikeres bejelentkezés!");
    }
    else{
      document.getElementById("error-message").textContent = result.message;
    }
  })
})

// "Bejelentkezés" link kattintása
document.getElementById("register-link").addEventListener("click", () => {
  window.location.href = "register";
});