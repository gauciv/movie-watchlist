// selectors
const search_input = document.querySelector("#search-input");
const search_btn = document.querySelector("#search-btn");
const placeholder = document.querySelector("#placeholder-results");
const search_results = document.querySelector("#search-results");
const movie_container = document.querySelector("#movie-container");
const loading = document.querySelector("#loading");

let movies_id = []
let get_input;

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
    search_btn.disabled = true;
    movies_id=[]
    const title = search_input.value
    const url = `${CONFIG.API_KEY}&s=${encodeURIComponent(title)}`
    get_input = search_input.value;
    search_input.value = "";
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
        movies_id = data.Search.slice(0, 5).map(movie => movie.imdbID);   
        console.log(movies_id)
        getFullMovieDetails(movies_id)
    } catch (error) {
        console.log(`Caught error 1: ${error}`);
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
            console.log(`Caught error 2: ${error}`);
        }
    }
   
    renderMovies(movies)
}

function renderMovies(arr) {
    let render = ""
    let show_header = true;

    arr.forEach((movie, index) => {
        if (show_header) {
            render = `
                <p id="search-header">
                Showing search results for "${get_input}"
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
                        <button class="watchlist" data-index="${index}" data-obj='${JSON.stringify(movie)}'>
                            <img class="add-icon" src="assets/icons/add-icon.png">
                            Watchlist
                        </button>
                    </div>
                    <p class="plot">${movie.plot}</p>
                </div>
            </div>
        `
    });
    arr.length = 0;
    loading.style.display = "none";
    search_btn.disabled = false;
    movie_container.innerHTML = render;

    document.querySelectorAll(".watchlist").forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn.dataset.index);
            let movie = JSON.parse(btn.dataset.obj)
            
            btn.textContent = "Added to Watchlist ✔️"
            btn.disabled = true;
        });
    });
    render = "";
}
