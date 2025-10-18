document.querySelectorAll(".search-movies").forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log("button clicked")
        window.location.href = "index.html";
    });
})