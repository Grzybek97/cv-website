// Obsługa formularza
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Zapobiega domyślnej akcji formularza

    console.log("Formularz został przesłany"); // Sprawdzamy, czy nasz event działa

    // Pobranie danych z formularza
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log(`Dane z formularza: Imię: ${name}, Email: ${email}, Wiadomość: ${message}`);

    // Przygotowanie wiadomości do wysłania
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    // Wysłanie wiadomości e-mail
    emailjs.send("service_t9s23kv", "template_ruelrkb", templateParams)
        .then(function(response) {
            console.log("Wiadomość wysłana", response);
            document.getElementById('form-message').textContent = "Wiadomość została wysłana!";
        }, function(error) {
            console.log("Błąd wysyłania wiadomości", error);
            document.getElementById('form-message').textContent = "Wystąpił błąd. Spróbuj ponownie.";
        });
});
