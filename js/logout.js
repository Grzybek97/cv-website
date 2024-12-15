function clearToken() {
    localStorage.removeItem('token'); // Usuwanie tokenu z localStorage
    alert('Zostałeś wylogowany!');
    window.location.href = 'index.html'; // Przekierowanie na stronę główną
}