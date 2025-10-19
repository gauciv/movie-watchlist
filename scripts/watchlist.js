const standby = document.querySelector("#placeholder");
const watchlist_container = document.querySelector("#watchlist-container");
const clear_btn = document.querySelector("#clear");

document.querySelectorAll(".search-movies").forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("button clicked")
        window.location.href = "../index.html";
    });
})

let display = "";
let storage = JSON.parse(localStorage.getItem   ("movie"));

if (storage) {
    standby.disabled = true;
    standby.style.display = "none";
}

displayWatchlist();

function displayWatchlist() {
    storage.forEach((movie) => {
    display += `
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
    storage = [];
    watchlist_container.innerHTML = display;
    clear_btn.style.display = "flex";

}

clear_btn.addEventListener("click", () => {
    localStorage.clear();
    displayWatchlist();
    watchlist_container.innerHTML = "";
    clear_btn.style.display = "none";
    placeholder.style.display = "flex";
});