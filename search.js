const searchButton = document.getElementById("button");
const resultsContainer = document.getElementById("results-container");
searchButton.addEventListener("click", parseInput);
let previousSearch = "";

function parseInput(event) {
    event.preventDefault();
    let queriedTitle = document.getElementById("title-query").value;
    queriedTitle = queriedTitle.trim();
    if (queriedTitle === previousSearch || queriedTitle === "")
        return;
    previousSearch = queriedTitle;
    //Encode special characters
    queriedTitle = queriedTitle.replace("$", "%24");
    queriedTitle = queriedTitle.replace("&", "%26");
    queriedTitle = queriedTitle.replace("+", "%2B");
    queriedTitle = queriedTitle.replace(",", "%2C");
    queriedTitle = queriedTitle.replace("/", "%2F");
    queriedTitle = queriedTitle.replace(":", "%3A");
    queriedTitle = queriedTitle.replace(";", "%3B");
    queriedTitle = queriedTitle.replace("=", "%3D");
    queriedTitle = queriedTitle.replace("?", "%3F");
    queriedTitle = queriedTitle.replace("@", "%40");
    queriedTitle = queriedTitle.replace("<", "%3C");
    queriedTitle = queriedTitle.replace(">", "%3E");
    queriedTitle = queriedTitle.replace("#", "%23");
    //queriedTitle = queriedTitle.replace("%", "%25"); No one is going to search for a title with % in it anyways, this breaks shit
    queriedTitle = queriedTitle.replace("{", "%7B");
    queriedTitle = queriedTitle.replace("}", "%7D");
    queriedTitle = queriedTitle.replace("|", "%7C");
    queriedTitle = queriedTitle.replace("\\", "%5C");  //double backslash because escape character is necessary here
    queriedTitle = queriedTitle.replace("^", "%5E");
    queriedTitle = queriedTitle.replace("~", "%7E");
    queriedTitle = queriedTitle.replace("[", "%5B");
    queriedTitle = queriedTitle.replace("]", "%5D");
    queriedTitle = queriedTitle.replace("`", "%60");
    //End of encode
    queriedTitle = queriedTitle.replace(/ /g, "+"); //replaces spaces with +, must be done after encoding
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
    let totalResults = response.totalResults;
    for (let i = 2; (i - 1) * 10 < Math.min(60, totalResults); i++) {
        promise = await fetch(url + "&page=" + i);
        response = await promise.json();
        showSearchResults(response.Search);
    }
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