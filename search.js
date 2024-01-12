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
    quereidTitle = queriedTitle.replace(" ", "+");
    //Encode special characters
    quereidTitle = queriedTitle.replace("$", "%24");
    quereidTitle = queriedTitle.replace("&", "%26");
    quereidTitle = queriedTitle.replace("+", "%2B");
    quereidTitle = queriedTitle.replace(",", "%2C");
    quereidTitle = queriedTitle.replace("/", "%2F");
    quereidTitle = queriedTitle.replace(":", "%3A");
    quereidTitle = queriedTitle.replace(";", "%3B");
    quereidTitle = queriedTitle.replace("=", "%3D");
    quereidTitle = queriedTitle.replace("?", "%3F");
    quereidTitle = queriedTitle.replace("@", "%40");
    quereidTitle = queriedTitle.replace("<", "%3C");
    quereidTitle = queriedTitle.replace(">", "%3E");
    quereidTitle = queriedTitle.replace("#", "%23");
    quereidTitle = queriedTitle.replace("%", "%25");
    quereidTitle = queriedTitle.replace("{", "%7B");
    quereidTitle = queriedTitle.replace("}", "%7D");
    quereidTitle = queriedTitle.replace("|", "%7C");
    quereidTitle = queriedTitle.replace("\\", "%5C");  //double backslash because escape character is necessary here
    quereidTitle = queriedTitle.replace("^", "%5E");
    quereidTitle = queriedTitle.replace("~", "%7E");
    quereidTitle = queriedTitle.replace("[", "%5B");
    quereidTitle = queriedTitle.replace("]", "%5D");
    quereidTitle = queriedTitle.replace("`", "%60");
    //End of encode
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
    //TODO: Add the ability to show more than one page of results (Cap it at 100)
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