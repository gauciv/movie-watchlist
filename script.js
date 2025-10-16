// selectors
const search_input = document.querySelector("#search-input");
const search_btn = document.querySelector("#search-btn");

search_input.addEventListener("input", () => {
    const search_value = search_input.value.trim()
    search_btn.disabled = !search_value;
});

search_btn.addEventListener("click", async () => {
    const api = CONFIG.API_KEY;
    const title = search_input.value
    const url = `${api}&s=${encodeURIComponent(title)}`
    console.log(url)
    try {
        const res = fetch(url);
        const data = (await res).json()
        console.log(data)
    } catch (error) {
        console.log(`Caught error: ${error.message}`);
    }
    
});

