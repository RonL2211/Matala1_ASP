document.addEventListener("DOMContentLoaded", async () => {
    const castContainer = document.getElementById("cast-container");
    const castForm = document.getElementById("add-cast-form");

    // Function to render cast members
    function renderCast(castMembers) {
        castContainer.innerHTML = ""; // Clear previous members
        castMembers.forEach(member => {
            const castDiv = document.createElement("div");
            castDiv.className = "cast-member";

            castDiv.innerHTML = `
                <h3>${member.name}</h3>
                <p>Role: ${member.role}</p>
                <p>Date of Birth: ${member.date}</p>
                <p>Country: ${member.country}</p>
            `;

            castContainer.appendChild(castDiv);
        });
    }

    // Fetch and render all cast members
    async function fetchAndRenderCast() {
        try {
            const response = await fetch("https://localhost:7171/api/Cast");
            const castMembers = await response.json();
            renderCast(castMembers);
        } catch (error) {
            console.error("Failed to fetch cast members:", error);
        }
    }

    await fetchAndRenderCast(); // Load all cast members initially

    // Handle form submission
    castForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(castForm);
        const castMember = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://localhost:7171/api/Cast", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(castMember),
            });

            if (response.ok) {
                alert("Cast member added successfully!");
                castForm.reset(); // Clear form
                await fetchAndRenderCast(); // Refresh the list
            } else {
                alert("Failed to add cast member. Please try again.");
            }
        } catch (error) {
            console.error("Failed to add cast member:", error);
        }
    });
});
