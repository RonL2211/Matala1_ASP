import items from "./movie.js";

document.addEventListener("DOMContentLoaded", () => {
    const moviesContainer = document.getElementById("movies-container");

    function renderMovies(movies) {
        console.log("Movies loaded:", movies); // Debugging step
        moviesContainer.innerHTML = ""; // Clear the container
        movies.forEach(movie => {
            const movieDiv = document.createElement("div");
            movieDiv.className = "movie";
            movieDiv.style.border = "1px solid #ccc";
            movieDiv.style.padding = "15px";
            movieDiv.style.margin = "10px";
            movieDiv.style.borderRadius = "8px";
            movieDiv.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            movieDiv.innerHTML = `
                <img src="${movie.photoUrl}" alt="${movie.title}" style="width:100%; border-radius: 8px;">
                <h3>${movie.title}</h3>
                <p><strong>Rating:</strong> ${movie.rating}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
                <p><strong>Duration:</strong> ${movie.duration} min</p>
                <p><strong>Language:</strong> ${movie.language}</p>
                <p><strong>Description:</strong> ${movie.description}</p>
                <p><strong>Income:</strong> $${movie.income.toLocaleString()}</p>
                <button class="wishlist-btn" data-id="${movie.id}">Add to Wish List</button>
            `;
            moviesContainer.appendChild(movieDiv);
        });
    }

    renderMovies(items); // Call the function with your movies data
});
