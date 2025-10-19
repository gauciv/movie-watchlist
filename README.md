# 🎬 Movie Watchlist App

A simple and elegant Movie Watchlist web app built using **HTML**, **CSS**, and **JavaScript**.  
This app allows users to search for movies, add them to their watchlist, and manage stored data using **localStorage**.

**Note: This project uses OMDB api and is meant for practice only, and it is not responsive to all screen sizes**

---

## 🚀 Features

- **Add to Watchlist** — Save your favorite movies locally with one click.  
- **Persistent Storage** — Movies remain stored even after refreshing or closing the browser using `localStorage`.  
- **Render Watchlist** — Dynamically display all saved movies on the Watchlist page.  
- **Clear Watchlist** — Remove all movies instantly and reset the page.

---

## ⚙️ Setup

> **Note:** In order for this to work locally, create a `config.js` file in the project root and insert your OMDb API key.

```js
// config.js
const CONFIG = {
    API_KEY: "<insert your OMDb API key here>"
};

```

Get your own key here:
https://www.omdbapi.com/apikey.aspx
