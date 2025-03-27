let header = document.querySelector("header");
if (!header) {
    header = document.createElement("header");
    document.body.prepend(header);
}

// Check if the user is logged in
async function checkLoginStatus() {
    const response = await fetch('public/kapcsolat/session.php');
    const result = await response.json();

    if (result.loggedIn) {
        // Display user profile picture
        const userNameLink = document.createElement("a");
        userNameLink.href = "profile"; 
        userNameLink.style.display = "inline-block";
        userNameLink.style.padding = "10px";
        userNameLink.style.cursor = "pointer";

        const profileImage = document.createElement("img");
        profileImage.src = result.profilePicture || "public/img/default-profile.png"; // Default profile picture 
        profileImage.alt = "Profilkép";
        profileImage.style.width = "80px";
        profileImage.style.height = "80px";
        profileImage.style.borderRadius = "50%";
        profileImage.style.objectFit = "cover";

        userNameLink.appendChild(profileImage);
        header.appendChild(userNameLink);
    } else {
        // Display login and reg buttons
        const loginButton = document.createElement("button");
        loginButton.textContent = "Bejelentkezés";
        loginButton.style.marginRight = "10px";
        loginButton.addEventListener("click", () => {
            window.location.href = "login";
        });

        const registerButton = document.createElement("button");
        registerButton.textContent = "Regisztráció";
        registerButton.addEventListener("click", () => {
            window.location.href = "register";
        });

        header.appendChild(loginButton);
        header.appendChild(registerButton);
    }
}

checkLoginStatus();

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

const profile = document.createElement("div");
profile.classList.add("profile-content");


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

    // Is it a series dropdown
    const seriesDropdown = document.createElement("select");
    seriesDropdown.id = "seriesFilter";
    seriesDropdown.innerHTML = `
        <option value="">Minden típus</option>
        <option value="series">Sorozat</option>
        <option value="movie">Film</option>
    `;
    document.querySelector(".filters").appendChild(seriesDropdown);
    seriesDropdown.addEventListener("change", filterMovies);

    // Releaseyear dropdown
    const yearDropdown = document.createElement("select");
    yearDropdown.id = "yearFilter";
    yearDropdown.innerHTML = `
        <option value="">Minden év</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
    `;
    document.querySelector(".filters").appendChild(yearDropdown);
    yearDropdown.addEventListener("change", filterMovies);
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
        title.style.color="white";
        title.classList.add("movie-title");

        movieDiv.appendChild(title);

        const favoriteButton = document.createElement("button");
        
        favoriteButton.innerHTML = "&#9733;"; // Unicode for a star icon
        favoriteButton.classList.add("favorite-button");
        favoriteButton.style.alignContent = "left";
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
    const selectedSeries = document.getElementById("seriesFilter").value;
    const selectedYear = document.getElementById("yearFilter").value;

    const movieResponse = await fetch('public/kapcsolat/movieTemp.json');
    const allMovies = await movieResponse.json();

    let filteredMovies = allMovies;

    if (selectedGenre) {
        const movieGenreResponse = await fetch('public/kapcsolat/movieGenreTemp.json');
        const movieGenres = await movieGenreResponse.json();
        const filteredMovieIds = movieGenres
            .filter(mg => mg.genreId === selectedGenre)
            .map(mg => mg.movieId);
        filteredMovies = filteredMovies.filter(movie => filteredMovieIds.includes(movie.id));
    }

    if (selectedSeries) {
        filteredMovies = filteredMovies.filter(movie => 
            (selectedSeries === "series" && movie.isItASeries === "1") ||
            (selectedSeries === "movie" && movie.isItASeries === "0")
        );
    }

    if (selectedYear) {
        filteredMovies = filteredMovies.filter(movie => movie.releaseYear === selectedYear);
    }

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
        location.reload(); 
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


const bannerContainer = document.createElement("div");
bannerContainer.classList.add("movie-banner");

const bannerTrack = document.createElement("div");
bannerTrack.classList.add("banner-track");
bannerContainer.appendChild(bannerTrack);

const arrowLeft = document.createElement("button");
arrowLeft.classList.add("arrow-button", "arrow-left");
arrowLeft.textContent = "<";
bannerContainer.appendChild(arrowLeft);

const arrowRight = document.createElement("button");
arrowRight.classList.add("arrow-button", "arrow-right");
arrowRight.textContent = ">";
bannerContainer.appendChild(arrowRight);

document.body.prepend(bannerContainer);

let currentIndex = 0;

async function loadMovieBanners() {
    try {
        const response = await fetch("public/kapcsolat/movieTemp.json");
        if (!response.ok) {
            throw new Error("Hiba a filmek betöltésekor");
        }
        const movies = await response.json();
        displayMovieBanners(movies);
    } catch (error) {
        console.error(error);
    }
}

function displayMovieBanners(movies) {
    bannerTrack.innerHTML = ""; // Töröljük az előző filmeket

    const movie = movies[currentIndex];
    const img = document.createElement("img");
    img.src = movie.pictureURL;
    img.alt = movie.title;
    img.classList.add("banner-image");
    bannerTrack.appendChild(img);

    // Automatikus váltás 7,5 másodpercenként
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % movies.length;
        displayMovieBanners(movies);
    }, 5000); // 7,5 másodperc

   /* // Nyilak kezelése
    arrowLeft.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + movies.length) % movies.length;
        displayMovieBanners(movies);
    });

    arrowRight.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % movies.length;
        displayMovieBanners(movies);
    });*/
}

loadMovieBanners();





loadMovies();
loadGenres();
