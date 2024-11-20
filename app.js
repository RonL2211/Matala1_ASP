import items from './movie.js';

// Generate Menu
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const menuItems = [
        { name: "Home", link: "index.html" },
        { name: "Wish List", link: "wishlist.html" }
    ];

    menuItems.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.link;
        a.textContent = item.name;
        li.appendChild(a);
        menu.appendChild(li);
    });
});

// Fetch and render movies
document.addEventListener("DOMContentLoaded", async () => {
    const moviesContainer = document.getElementById("movies-container");

    // Render movies in the container
    function renderMovies(movies) {
        moviesContainer.innerHTML = ""; // Clear previous content
        movies.forEach(movie => {
            const movieDiv = document.createElement("div");
            movieDiv.className = "movie";
            movieDiv.innerHTML = `
                <img src="${movie.photoUrl}" alt="${movie.title}" class="movie-img">
                <h3>${movie.title}</h3>
                <p><strong>Rating:</strong> ${movie.rating}</p>
                <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
                <p><strong>Duration:</strong> ${movie.duration} minutes</p>
                <p><strong>Language:</strong> ${movie.language}</p>
                <p>${movie.description}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <button class="wishlist-btn" data-id="${movie.id}">Add to Wish List</button>
            `;
            moviesContainer.appendChild(movieDiv);
        });

        // Add event listeners to "Add to Wish List" buttons
        document.querySelectorAll(".wishlist-btn").forEach(button => {
            button.addEventListener("click", async (e) => {
                const movieId = e.target.getAttribute("data-id");
                const selectedMovie = movies.find(m => m.id == movieId);

                if (selectedMovie) {
                    try {
                        const response = await fetch("https://localhost:7171/api/Movie", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(selectedMovie),
                        });

                        if (response.ok) {
                            alert("Movie added to Wish List!");
                        } else {
                            alert("Failed to add movie to Wish List.");
                        }
                    } catch (error) {
                        console.error("Error adding movie to Wish List:", error);
                    }
                }
            });
        });
    }

    // Call the renderMovies function with the imported items
    renderMovies(items);

    // Fetch movies from the server
    try {
        const response = await fetch("https://localhost:7171/api/Movie");
        if (!response.ok) throw new Error("Failed to fetch movies from server");
        const movies = await response.json();
        console.log("Movies fetched from server:", movies);
        renderMovies(movies);
    } catch (error) {
        console.error("Failed to load movies:", error);
    }
});
