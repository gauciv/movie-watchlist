// selectors
const search_input = document.querySelector("#search-input");
const search_btn = document.querySelector("#search-btn");
const placeholder = document.querySelector("#placeholder-results");
const search_results = document.querySelector("#search-results");

// vars

let movies_id = []
if (movies_id) {
    placeholder.disabled = true;
    placeholder.style.display = "none";
}



// event listeners
search_input.addEventListener("input", () => {
    const search_value = search_input.value.trim()
    search_btn.disabled = !search_value;
});

search_btn.addEventListener("click", async () => {
    const title = search_input.value
    const url = `${CONFIG.API_KEY}&s=${encodeURIComponent(title)}`
    console.log(url)
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
    }
    
});

// functions
async function getFullMovieDetails(arr) {
    let movies = []
    for (const id of arr) {
        const url = `${CONFIG.API_KEY}&i=${id}`
        
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
        
    }
    console.log(movies)
}
