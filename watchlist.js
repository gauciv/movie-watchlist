const standby = document.querySelector("#placeholder");
const watchlist_container = document.querySelector("#watchlist-container");

document.querySelectorAll(".search-movies").forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("button clicked")
        window.location.href = "index.html";
    });
})

let display = "";
let storage = JSON.parse(localStorage.getItem("movie"));

if (storage) {
    standby.disabled = true;
    standby.style.display = "none";
}

displayWatchlist(storage, display);

function displayWatchlist(storage, str) {
    storage.forEach((movie) => {
    str += `
            <div class="movie-details">
                <img class="poster" src="${movie.poster}">
                <div class="description">
                    <div class="movie-header">
                        <p class="header-text">${movie.title}</p>
                        <p class="rating">⭐ ${movie.rating}</p>
                    </div>
                    <div class="movie-stats">
                        <p class="runtime">${movie.runtime}</p>
                        <p class="genre">${movie.genre}</p>
                    </div>
                    <p class="plot">${movie.plot}</p>
                </div>
            </div>
        `
    });

    watchlist_container.innerHTML = str;
}