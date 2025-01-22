document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (response.ok) {
    alert("Sikeres bejelentkezés!");
    // További műveletek, pl. átirányítás
  } else {
    document.getElementById("error-message").textContent = result.message;
  }
});

// "Regisztráció" gombra kattintva átirányítás
document.getElementById("register-link").addEventListener("click", () => {
  window.location.href = "register.html"; // Regisztrációs oldal betöltése
});
