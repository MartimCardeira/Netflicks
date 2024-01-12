const searchButton = document.getElementById("button");
const resultsContainer = document.getElementById("results-container");
searchButton.addEventListener("click", parseInput);
let previousSearch = "";

async function parseInput(event) {
    event.preventDefault();
    let queriedTitle = document.getElementById("title-query").value;
    queriedTitle = queriedTitle.trim();
    if (queriedTitle === previousSearch || queriedTitle === "")
        return;
    previousSearch = queriedTitle;
    searchForMovies(queriedTitle);
}

async function searchForMovies(title) {
    let url = "http://www.omdbapi.com/?apikey=2253932&s=" + title;
    let promise = await fetch(url);
    let response = await promise.json();
    if (response.Response == "False") {
        alert(response.Error);
        return;
    }
    resultsContainer.innerHTML = '';
    showSearchResults(response.Search);
}

function showSearchResults(searchResults) {
    for (let movie of searchResults) {
        let movieResult = document.createElement("section");
        movieResult.className = "movie";
        let moviePoster = document.createElement("img");
        moviePoster.className = "movie-poster";
        moviePoster.src = movie.Poster;
        let movieTitle = document.createElement("h2");
        movieTitle.className = "movie-title";
        movieTitle.appendChild(document.createTextNode(movie.Title));
        movieResult.appendChild(moviePoster);
        movieResult.appendChild(movieTitle);
        resultsContainer.appendChild(movieResult);
    }
}