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
    queriedTitle.replace(" ", "+");
    //Encode special characters
    queriedTitle.replace("$", "%24");
    queriedTitle.replace("&", "%26");
    queriedTitle.replace("+", "%2B");
    queriedTitle.replace(",", "%2C");
    queriedTitle.replace("/", "%2F");
    queriedTitle.replace(":", "%3A");
    queriedTitle.replace(";", "%3B");
    queriedTitle.replace("=", "%3D");
    queriedTitle.replace("?", "%3F");
    queriedTitle.replace("@", "%40");
    queriedTitle.replace("<", "%3C");
    queriedTitle.replace(">", "%3E");
    queriedTitle.replace("#", "%23");
    queriedTitle.replace("%", "%25");
    queriedTitle.replace("{", "%7B");
    queriedTitle.replace("}", "%7D");
    queriedTitle.replace("|", "%7C");
    queriedTitle.replace("\\", "%5C");  //double backslash because escape character is necessary here
    queriedTitle.replace("^", "%5E");
    queriedTitle.replace("~", "%7E");
    queriedTitle.replace("[", "%5B");
    queriedTitle.replace("]", "%5D");
    queriedTitle.replace("`", "%60");
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