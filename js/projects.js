const API_BASE_URL = "http://localhost:5001/api";

document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.getElementById("project-container");
    const addProjectForm = document.getElementById("add-project-form");
    const formMessage = document.getElementById("form-message");

    // Pobieranie listy projektów z API
    async function fetchProjects() {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`);
            const projects = await response.json();
            renderProjects(projects);
        } catch (error) {
            console.error("Błąd podczas pobierania projektów:", error);
        }
    }

    // Renderowanie listy projektów
    function renderProjects(projects) {
        projectContainer.innerHTML = "";
        projects.forEach((project) => {
            const card = document.createElement("div");
            card.className = "project-card";

            const title = document.createElement("h2");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const link = document.createElement("a");
            link.textContent = "Zobacz projekt";
            link.href = project.link;
            link.target = "_blank";
            link.className = "button";

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(link);
            projectContainer.appendChild(card);
        });
    }

    // Obsługa dodawania projektu
    addProjectForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const file = document.getElementById("file").files[0];

        if (!title || !description || !file) {
            formMessage.textContent = "Wypełnij wszystkie pola!";
            formMessage.style.color = "red";
            return;
        }

        const formData = new FormData();
        formData.append("Name", title);
        formData.append("Description", description);
        formData.append("file", file);

        try {
            const response = await fetch(`${API_BASE_URL}/Projects/add`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                formMessage.textContent = "Projekt został dodany!";
                formMessage.style.color = "green";
                fetchProjects(); // Odśwież listę projektów
                addProjectForm.reset();
            } else {
                throw new Error("Nie udało się dodać projektu.");
            }
        } catch (error) {
            formMessage.textContent = "Błąd podczas dodawania projektu!";
            formMessage.style.color = "red";
            console.error(error);
        }
    });

    fetchProjects(); // Wczytaj listę projektów przy załadowaniu strony
});
