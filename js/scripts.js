const API_BASE_URL = "http://localhost:5001/api";

document.addEventListener("DOMContentLoaded", () => {
    // Obsługa dynamicznego przełączania sekcji umiejętności (tylko gdy istnieje)
    const toggleSkills = document.querySelector(".skills");
    if (toggleSkills) {
        toggleSkills.addEventListener("click", () => {
            toggleSkills.style.display = toggleSkills.style.display === "none" ? "block" : "none";
        });
    }

    // Animacje sekcji (tylko gdy istnieją sekcje)
    const sections = document.querySelectorAll("section");
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = "fadeIn 1.5s ease-in-out forwards";
                }
            });
        });

        sections.forEach((section) => {
            observer.observe(section);
        });
    }

    // Dynamiczna lista projektów (tylko gdy istnieje kontener projektów)
    const container = document.getElementById("project-container");
    if (container) {
        const projects = [
            {
                title: "Projekt 1: Analiza Pogody",
                description: "System przetwarzania danych pogodowych wykorzystujący Apache NiFi i wizualizacje w Power BI.",
                links: [
                    { text: "Zobacz kod", url: "https://github.com/link-do-projektu" },
                    { text: "Raport", url: "resources/raport.pdf" },
                ],
            },
            {
                title: "Projekt 2: Strona Portfolio",
                description: "Minimalistyczna strona portfolio z ciemnym motywem i responsywnym designem.",
                links: [
                    { text: "Zobacz kod", url: "https://github.com/link-do-portfolio" },
                    { text: "Podgląd", url: "#" },
                ],
            },
        ];

        projects.forEach((project, index) => {
            const card = document.createElement("div");
            card.className = "project-card";

            const title = document.createElement("h2");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            card.appendChild(title);
            card.appendChild(description);

            project.links.forEach((link) => {
                const a = document.createElement("a");
                a.className = "button";
                a.textContent = link.text;
                a.href = link.url;
                a.target = "_blank";
                card.appendChild(a);
            });

            setTimeout(() => {
                card.classList.add("loaded");
            }, index * 200);

            container.appendChild(card);
        });
    }

    // Obsługa formularza kontaktowego (tylko gdy formularz istnieje)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            const formMessage = document.getElementById("form-message");

            if (!name || !email || !message) {
                formMessage.textContent = "Wypełnij wszystkie pola!";
                formMessage.style.color = "red";
                return;
            }

            if (!validateEmail(email)) {
                formMessage.textContent = "Podaj prawidłowy adres email!";
                formMessage.style.color = "red";
                return;
            }

            formMessage.textContent = "Wiadomość została wysłana!";
            formMessage.style.color = "green";
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }
});
