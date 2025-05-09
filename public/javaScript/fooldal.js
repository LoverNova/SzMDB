
// checkLoginStatus();

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
    fetch('public/kapcsolat/movies.php')
    .then(response => {
        if(!response.ok){
            response.json()
            .then(error => {throw new Error(error.error || "Szerver hiba!")})
        }
        return response.json();
    })
    .then(movies => {
        displayMovies(movies)
    })

    // const movieResponse = await fetch('public/kapcsolat/movies.php');
    // console.log(movieResponse.json());
    
    // if (!movieResponse.ok) {
    //     console.error("Error fetching movies:", movieResponse.statusText);
    //     return;
    // }
    // const movies = await movieResponse.json();
    // console.log();
    
    displayMovies(movies);
}

async function loadGenres() {
    const genreResponse = await fetch('public/kapcsolat/genre.php');
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

    // Define and create the yearDropdown element
    const yearDropdown = document.createElement("select");
    yearDropdown.id = "yearFilter";

    fetch('public/kapcsolat/year.php')
    .then(response => {
        if(!response.ok){
            throw new Error(response.json().error);
        }
        return response.json();
    })
    .then(years => {     
        html = `<option value="">Minden év</option>`

        years.forEach(year => {
            html += `<option value="${year['Year']}">${year['Year']}</option>`
        })
        yearDropdown.innerHTML = html;
    })

    document.querySelector(".filters").appendChild(yearDropdown);
    yearDropdown.addEventListener("change", filterMovies);

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
}

function displayMovies(movies) {
    movieList.innerHTML = "";

    movies.forEach(movie => {
        html = 
        `<div class="movie">
            <div onclick="location.href='/SzMDB/moviePage?movieId=${movie.id}'">
                <img src="public/uploads/moviePoster/${movie.pictureURL}" alt="Film poszter" class="movie-poster">
                <div class="movie-title" style="color: white;">${movie.title}</div>
            </div>
            <button class="favorite-button" style="align-content: left;" onclick="addFavorite(${movie.id})">&#9733;</button>
        </div>`;

        movieList.innerHTML += html;
    });
}

function moviePageRedirect(movieId){
    // window.location.href = "/SzMDB/moviePage?movieId=" + movie.id;
    console.log(movieId);
    
}

async function addFavorite(movieId) {
    formData = new FormData();
    formData.append("movieId", movieId);

    fetch('public/kapcsolat/favorite.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(!response.ok){            
            response.json().then(error => {
                throw new Error("Ismeretlen hiba" || error);
            })
        }
        return response.json();
    })
    .then(data => {
        alert(data['message']);
    })
    .catch(error => {
        alert(error);
    })

    // try {
    //     const response = await fetch('public/kapcsolat/favorite.php', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ movieId })
    //     });

    //     if (response.ok) {
    //         alert("A film hozzáadva a kedvencekhez!");
    //     } else {
    //         alert("Nem sikerült hozzáadni a filmet a kedvencekhez.");
    //     }
    // } catch (error) {
    //     console.error("Hiba a kedvenc hozzáadásakor:", error);
    //     alert("Hiba történt a film kedvencekhez adása során.");
    // }
}

async function filterMovies() {
    const selectedGenre = document.getElementById("genreFilter").value;
    const selectedSeries = document.getElementById("seriesFilter").value;
    const selectedYear = document.getElementById("yearFilter").value;

    const movieResponse = await fetch('public/kapcsolat/movies.php');
    const allMovies = await movieResponse.json();

    let filteredMovies = allMovies;

    if (selectedGenre) {
        const movieGenreResponse = await fetch('public/kapcsolat/movieGenre.php');
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
    const movieResponse = await fetch('public/kapcsolat/movies.php');
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

loadMovies();
loadGenres();
