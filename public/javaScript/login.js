document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form").addEventListener("submit", async(e) => {
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
    });

     const result = await response.json();

     if(response.ok){
      alert("Sikeres bejelentkezés!");
     }
     else{
       
       console.log();
       document.getElementById("error-message").textContent = result.message;
     }
  });
  // "Bejelentkezés" link kattintása
  document.getElementById("register-link").addEventListener("click", () => {
    window.location.href = "register";
  });
})

