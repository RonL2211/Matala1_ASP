document.addEventListener("DOMContentLoaded", async () => {
    const wishlistContainer = document.getElementById("wishlist-container");

    // Render wishlist movies
    function renderWishlist(movies) {
        wishlistContainer.innerHTML = ""; // Clear previous content
        if (movies.length === 0) {
            wishlistContainer.innerHTML = "<p>No movies in your Wish List yet.</p>";
            return;
        }

        movies.forEach(movie => {
            const movieDiv = document.createElement("div");
            movieDiv.className = "movie";
            movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.rating}</p>
                <p>Duration: ${movie.duration} mins</p>
            `;
            wishlistContainer.appendChild(movieDiv);
        });
    }

    // Fetch wishlist movies from the server
    try {
        const response = await fetch("https://localhost:7171/api/Movie");
        const movies = await response.json();
        renderWishlist(movies);
    } catch (error) {
        console.error("Failed to load wishlist:", error);
    }
});
