document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  
    const result = await response.json();
  
    if (response.ok) {
      alert("Sikeres regisztráció! Most jelentkezz be.");
      window.location.href = "login"; // Visszairányítás a bejelentkezési oldalra
    } else {
      document.getElementById("error-message").textContent = result.message;
    }
  });
  
  // "Bejelentkezés" link kattintása
  document.getElementById("login-link").addEventListener("click", () => {
    window.location.href = "login";
  });
  