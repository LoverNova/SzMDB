let header = document.querySelector("header"); 
if (!header) {
    header = document.createElement("header");
    document.body.prepend(header);
}

const userNameLink = document.createElement("a");
userNameLink.textContent = "Név";
userNameLink.style.textAlign = "center";
userNameLink.style.cursor = "pointer";
userNameLink.href = "profile";
userNameLink.style.padding = "10px";
userNameLink.style.textDecoration = "line-through";
header.appendChild(userNameLink);

const profile = document.createElement("div");
profile.textContent = "Profil és menüpontok";
profile.style.fontSize = "0.9em";

const filters = document.createElement("div");
filters.classList.add("filters");
filters.style.position = "fixed";
filters.style.left = "-250px";
filters.style.top = "0";
filters.style.width = "250px";
filters.style.height = "100%";
filters.style.background = "rgb(78, 78, 107)";
filters.style.transition = "left 0.3s ease-in-out";
filters.style.padding = "10px";
filters.style.boxShadow = "2px 0 5px rgb(52, 52, 71)";
filters.style.overflowY = "auto";

document.body.appendChild(filters);

const filterTitle = document.createElement("h3");
filterTitle.textContent = "Szűrés";
filters.appendChild(filterTitle);

const filterList = document.createElement("ul");
const exampleFilters = ["Akció", "Vígjáték", "Dráma"]; // Placeholder filters
exampleFilters.forEach((filter) => {
    const listItem = document.createElement("li");
    listItem.textContent = filter;
    filterList.appendChild(listItem);
});
filters.appendChild(filterList);

document.addEventListener("mousemove", (event) => {
    if (event.clientX < 50) {
        filters.style.left = "0px";
    } else if (event.clientX > 300) {
        filters.style.left = "-250px";
    }
});

const profileSection = document.createElement("div");
profileSection.classList.add("profile");
profileSection.appendChild(profile);

const searchBar = document.createElement("div");
searchBar.classList.add("search-container");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Cím kereső";
searchBar.appendChild(searchInput);

const searchButton = document.createElement("button");
searchButton.textContent = "Keresés";
searchBar.appendChild(searchButton);

document.body.appendChild(searchBar);

const movieList = document.createElement("div");
movieList.classList.add("movie-list");
document.body.appendChild(movieList);

async function loadMovies() {
    const movieResponse = await fetch('public/kapcsolat/movieTemp.json');
    if (!movieResponse.ok) {
        console.error("Error fetching movies:", movieResponse.statusText);
        return;
    }
    const movies = await movieResponse.json();
    displayMovies(movies);
}

async function loadGenres() {
    const genreResponse = await fetch('public/kapcsolat/genreTemp.json');
    if (!genreResponse.ok) {
        console.error("Error fetching genres:", genreResponse.statusText);
        return;
    }
    const genres = await genreResponse.json();
    populateGenreDropdown(genres);
}

function populateGenreDropdown(genres) {
    const genreDropdown = document.createElement("select");
    genreDropdown.id = "genreFilter";
    genreDropdown.innerHTML = `<option value="">Minden műfaj</option>`;
    
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.genre;
        genreDropdown.appendChild(option);
    });
    
    document.querySelector(".filters").appendChild(genreDropdown);
    genreDropdown.addEventListener("change", filterMovies);
}

function displayMovies(movies) {
    movieList.innerHTML = "";

    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.dataset.movieId = movie.id;

        const poster = document.createElement("img");
        poster.src = movie.pictureURL;
        poster.alt = "Film poszter";
        poster.classList.add("movie-poster");

        movieDiv.appendChild(poster);

        const title = document.createElement("div");
        title.textContent = movie.title;
        title.classList.add("movie-title");

        movieDiv.appendChild(title);

        const favoriteButton = document.createElement("button");
        favoriteButton.textContent = "Kedvenc";
        favoriteButton.classList.add("favorite-button");
        favoriteButton.addEventListener("click", () => addFavorite(movie.id));

        movieDiv.appendChild(favoriteButton);

        movieList.appendChild(movieDiv);
    });
}

async function addFavorite(movieId) {
    try {
        const response = await fetch('public/kapcsolat/favorite.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId })
        });

        if (response.ok) {
            alert("A film hozzáadva a kedvencekhez!");
        } else {
            alert("Nem sikerült hozzáadni a filmet a kedvencekhez.");
        }
    } catch (error) {
        console.error("Hiba a kedvenc hozzáadásakor:", error);
        alert("Hiba történt a film kedvencekhez adása során.");
    }
}

async function filterMovies() {
    const selectedGenre = document.getElementById("genreFilter").value;
    const movieResponse = await fetch('public/kapcsolat/movieTemp.json');
    const allMovies = await movieResponse.json();
    
    if (!selectedGenre) {
        displayMovies(allMovies);
        return;
    }
    
    const movieGenreResponse = await fetch('public/kapcsolat/movieGenreTemp.json');
    const movieGenres = await movieGenreResponse.json();
    
    const filteredMovieIds = movieGenres
        .filter(mg => mg.genreId === selectedGenre)
        .map(mg => mg.movieId);
    
    const filteredMovies = allMovies.filter(movie => filteredMovieIds.includes(movie.id));
    displayMovies(filteredMovies);
}

async function searchMovies() {
    const query = searchInput.value.toLowerCase().trim();
    const movieResponse = await fetch('public/kapcsolat/movieTemp.json');
    if (!movieResponse.ok) {
        console.error("Hiba a filmek lekérésekor:", movieResponse.statusText);
        return;
    }

    const movies = await movieResponse.json();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(query)
    );

    if (filteredMovies.length === 0) {
        alert("Nincs találat.");
        location.reload(); // Optional: Reload the page if no results
    } else {
        displayMovies(filteredMovies);
    }
}

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchMovies();
    }
});

searchButton.addEventListener("click", searchMovies);

loadMovies();
loadGenres();
