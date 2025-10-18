// selectors
const search_input = document.querySelector("#search-input");
const search_btn = document.querySelector("#search-btn");
const placeholder = document.querySelector("#placeholder-results");
const search_results = document.querySelector("#search-results");
const movie_container = document.querySelector("#movie-container");
const loading = document.querySelector("#loading");

let movies_id = []

// event listeners
search_input.addEventListener("input", () => {
    const search_value = search_input.value.trim()
    search_btn.disabled = !search_value;
});

search_input.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !search_btn.disabled) {
        e.preventDefault();
        search_btn.click();
    }
});

search_btn.addEventListener("click", async () => {
    search_input.value = "";
    search_btn.disabled = true;
    movies_id=[]
    const title = search_input.value
    const url = `${CONFIG.API_KEY}&s=${encodeURIComponent(title)}`
    console.log(url)

    placeholder.style.display = "none";
    movie_container.innerHTML = "";
    loading.style.display = "flex";

    try {
        const res = await fetch(url);
        const data = await res.json()
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`)
        }
        for (let i=0;i<5;i++) {
            movies_id.push(data.Search[i].imdbID);
        }   
        console.log(movies_id)
        getFullMovieDetails(movies_id)
    } catch (error) {
        console.log(`Caught error: ${error.message}`);
    } finally {
        
    }
    
});

// functions
async function getFullMovieDetails(arr) {
    let movies = []
    for (const id of arr) {
        const url = `${CONFIG.API_KEY}&i=${id}`
        
        try{
            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status}`);
            }  
            movies.push ({
                title: data.Title,
                rating: data.imdbRating,
                runtime: data.Runtime,
                genre: data.Genre,
                poster: data.Poster,
                plot: data.Plot
            });
        } catch(error) {
            console.log(`Caught error: ${error.message}`);
        }
    }
    console.log(movies)
    renderMovies(movies)
}

function renderMovies(arr) {
    let render = ""
    let show_header = true;
    for (const movie of arr) {
        if (show_header) {
            render = `
                <p id="search-header">
                Showing search results for "${search_input.value}"
                </p>
                `
            show_header = false;
        }
        render += `
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
                        <div class="watchlist">
                            <img class="add-icon" src="assets/icons/add-icon.png">
                            <p class="watchlist-text">Watchlist</p>
                        </div>
                    </div>
                    <p class="plot">${movie.plot}</p>
                </div>
            </div>
        `
    };
    arr.length = 0;
    loading.style.display = "none";
    search_btn.disabled = false;
    movie_container.innerHTML = render;
    render = "";
}
