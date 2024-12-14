const API_BASE_URL = "http://localhost:5001/api";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formularz wysłany");
    const username = document.getElementById("username").value.trim();
    const passwordHash = document.getElementById("password").value.trim();

    try {
        const response = await fetch(`${API_BASE_URL}/Auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, passwordHash }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            alert("Zalogowano pomyślnie!");
        } else {
            alert("Nieprawidłowe dane logowania.");
        }
    } catch (error) {
        console.error("Błąd podczas logowania:", error);
        alert("Wystąpił problem podczas logowania.");
    }
});
