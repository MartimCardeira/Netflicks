const searchButton = document.getElementById("button");
searchButton.addEventListener("click", searchForMovies);
let previousSearch = "";
function searchForMovies(event) {
    event.preventDefault();
    let queriedTitle = document.getElementById("title-query").value;
    queriedTitle = queriedTitle.trim();
    if (queriedTitle === previousSearch || queriedTitle === "")
        return;
    previousSearch = queriedTitle;
    let url = "http://www.omdbapi.com/?apikey=2253932&s=" + queriedTitle;
    let queryResult = fetch(url).then((response) => {console.log(response.json().toString())});
    console.log(queriedTitle);
}