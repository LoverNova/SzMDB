document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    if (document.getElementById("password1").value === document.getElementById("password2").value) {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password1").value;

      const response = await fetch("/SzMDB/public/kapcsolat/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Sikeres regisztráció! Most jelentkezz be.");
        window.location.href = "login"; // Visszairányítás a bejelentkezési oldalra
      } else {
        document.getElementById("error-message").textContent = result.message;
      }
    } else {
      document.getElementById("error-message").textContent = "Nem megegyező jelszavak!";
    }
  });

  // "Bejelentkezés" link kattintása
  document.getElementById("login-link").addEventListener("click", () => {
    window.location.href = "login";
  });
  document.getElementById("main-page").addEventListener("click", () => {
    window.location.href = "/SzMDB/";
  }); 
});
