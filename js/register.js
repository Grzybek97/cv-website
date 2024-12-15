const API_BASE_URL = "http://localhost:5001/api";

document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value.trim();

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert("Rejestracja zakończona pomyślnie. Możesz się zalogować.");
            window.location.href = 'login.html';
        } else if (response.status === 409) {
            alert("Użytkownik o takiej nazwie już istnieje.");
        } else {
            alert("Wystąpił problem podczas rejestracji.");
        }
    } catch (error) {
        console.error("Błąd podczas rejestracji:", error);
        alert("Wystąpił problem podczas rejestracji.");
    }
});
