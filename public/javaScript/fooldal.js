let header = document.querySelector("header"); 
if (!header) {
    header = document.createElement("header");
    document.body.prepend(header);
}

const userNameLink = document.createElement("a");
userNameLink.textContent = "Név";
userNameLink.style.textAlign = "center";
userNameLink.style.cursor = "pointer"; // Mutatja, hogy kattintható
userNameLink.href = "profile"; // Profil oldal link
userNameLink.style.padding = "10px";
userNameLink.style.textDecoration = "line-through"; // Áthúzza a szöveget
header.appendChild(userNameLink);

const profile = document.createElement("div");
profile.textContent = "Profil és menüpontok";
profile.style.fontSize = "0.9em";

const filters = document.createElement("div");
filters.classList.add("filters");
filters.style.position = "fixed";
filters.style.left = "-250px"; //Alapértelmezetten elrejtve
filters.style.top = "0";
filters.style.width = "250px";
filters.style.height = "100%";
filters.style.background = "#f8f9fa";
filters.style.transition = "left 0.3s ease-in-out";
filters.style.padding = "10px";
filters.style.boxShadow = "2px 0 5px rgba(0,0,0,0.2)";
filters.style.overflowY = "auto";

document.body.appendChild(filters);

const filterTitle = document.createElement("h3");
filterTitle.textContent = "Szűrők";
filters.appendChild(filterTitle);

const filterList = document.createElement("ul");
["Színészek", "Rendezők", "Stb..."].forEach((filter) => {
    const listItem = document.createElement("li");
    listItem.textContent = filter;
    filterList.appendChild(listItem);
});
filters.appendChild(filterList);

document.addEventListener("mousemove", (event) => {
    if (event.clientX < 50) {
        filters.style.left = "0px"; // Szűrősáv előugrik
    } else if (event.clientX > 300) { // Ha elhagyja a sávot
        filters.style.left = "-250px";  // Visszacsúszik
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

// Filmek lekérése és betöltése
async function loadMovies() {
    const movieResponse = await fetch('public/kapcsolat/movieTemp.json');
    if (!movieResponse.ok) {
        console.error("Error fetching movies:", movieResponse.statusText);
        return;
    }
    const movies = await movieResponse.json();
    displayMovies(movies);
}
//Müfaj adatok lekérés és betöltés
async function loadGenres() {
    const genreResponse = await fetch('public/kapcsolat/genreTemp.json');
    if (!genreResponse.ok) {
        console.error("Error fetching genres:", genreResponse.statusText);
        return;
    }
    const genres = await genreResponse.json();
    populateGenreDropdown(genres);
}

// Legördülő menü feltöltése
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

// Filmek megjelenitése
function displayMovies(movies) {
    movieList.innerHTML = "";
    
    movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.dataset.movieId = movie.id;
        
        const poster = document.createElement("img");
        poster.src = movie.pictureURL;
        poster.alt = "Movie Poster";
        poster.style.width = "150px"; 
        poster.style.height = "225px";
        poster.style.objectFit = "cover"; 
        
        movieDiv.appendChild(poster);
        
        const title = document.createElement("div");
        title.textContent = movie.title;
        title.classList.add("movie-title");
        movieDiv.appendChild(title);
        
        movieList.appendChild(movieDiv);
    });
}

// Filter
async function filterMovies() {
    const selectedGenre = document.getElementById("genreFilter").value;
    const movieResponse = await fetch('public/kapcsolat/movieTemp.json'); //Lekérés
    const allMovies = await movieResponse.json();
    
    if (!selectedGenre) {
        displayMovies(allMovies);
        return;
    }
    
    const movieGenreResponse = await fetch('public/kapcsolat/movieGenreTemp.json'); //Lekérés
    const movieGenres = await movieGenreResponse.json();
    
    const filteredMovieIds = movieGenres
        .filter(mg => mg.genreId === selectedGenre)
        .map(mg => mg.movieId);
    
    const filteredMovies = allMovies.filter(movie => filteredMovieIds.includes(movie.id));
    displayMovies(filteredMovies);
}
// Include Fuse.js
const script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/fuse.js@6.4.6";
document.head.appendChild(script);

// Modositott kereső funkcio
async function searchMovies() {
    const query = searchInput.value.toLowerCase().trim();
    const movieResponse = await fetch('public/kapcsolat/movieTemp.json'); //Lekérés
    
    if (!movieResponse.ok) {
        console.error("Error fetching movies:", movieResponse.statusText);
        
        return;
    }
    else{

        
        
    }

    const movies = await movieResponse.json();

    // Initialize Fuse.js
    const options = {
        keys: ['title'],
        threshold: 0.4
    };
    const fuse = new Fuse(movies, options);

    const result = fuse.search(query);
    const filteredMovies = result.map(({ item }) => item);

    if (filteredMovies.length === 0) {
        
        location.reload()
    }

    displayMovies(filteredMovies);
}

searchButton.addEventListener("click", searchMovies);


// Betöltés
loadMovies();
loadGenres();