// checkLoginStatus();

const filters = document.createElement("div");
filters.classList.add("filters");
filters.style.position = "fixed";
filters.style.left = "-225px"; // Sidebar visibility
filters.style.top = "0";
filters.style.width = "250px";
filters.style.height = "100vh"; 
filters.style.background = "rgb(78, 78, 107)";
filters.style.transition = "left 0.3s ease-in-out";
filters.style.padding = "10px";
filters.style.boxShadow = "2px 0 5px rgb(52, 52, 71)";
filters.style.overflowX = "hidden"; 

// Sidebar visual indicator
const sidebarIndicator = document.createElement("div");
sidebarIndicator.style.position = "absolute";
sidebarIndicator.style.top = "50%";
sidebarIndicator.style.right = "-20px";
sidebarIndicator.style.width = "40px"; // Gray rectangle width
sidebarIndicator.style.height = "60px"; 
sidebarIndicator.style.background = "rgb(42, 42, 57)"; // Darker gray
sidebarIndicator.style.borderRadius = "0 5px 5px 0";
sidebarIndicator.style.cursor = "pointer";
sidebarIndicator.title = "Szűrés megnyitása";
sidebarIndicator.addEventListener("click", () => {
    filters.style.left = filters.style.left === "0px" ? "-225px" : "0px"; // Toggle sidebar visibility
});

filters.appendChild(sidebarIndicator);

document.body.appendChild(filters);

const filterTitle = document.createElement("h3");
filterTitle.textContent = "Szűrés";
filters.appendChild(filterTitle);

const filterList = document.createElement("ul");


filters.appendChild(filterList);


document.removeEventListener("mousemove", (event) => {
    if (event.clientX < 50) {
        filters.style.left = "0px"; 
    } else if (event.clientX > 300) {
        filters.style.left = "-200px"; //Sidebar hide
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
    genreDropdown.style.width = "200px"; 
    genreDropdown.innerHTML = `<option value="">Minden műfaj</option>`;
    
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.genre;
        genreDropdown.appendChild(option);
    });
    
    document.querySelector(".filters").appendChild(genreDropdown);
    genreDropdown.addEventListener("change", filterMovies);

   
    const yearDropdown = document.createElement("select");
    yearDropdown.id = "yearFilter";
    yearDropdown.style.width = "200px";

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
    seriesDropdown.style.width = "200px";
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

/*
//Footer on the bottom
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight ;

    if (scrollTop + windowHeight >= documentHeight) {
        footer.style.display = "block";
    } else {
        footer.style.display = "none";
    }
});*/
//Filler for the bottom
document.body.style.paddingBottom = "200px"; 

const spacer = document.createElement("div");
spacer.style.height = "200px"; 
spacer.style.visibility = "hidden"; 
document.body.appendChild(spacer);

const nav = document.querySelector("nav");

// Check if the user is logged 
fetch('public/kapcsolat/session.php')
    .then(response => {
        if (!response.ok) {
            throw new Error("Szerver hiba");
        }
        return response.json();
    })
    .then(result => {
        if (result.loggedIn) {
            // Create the logout 
            const logoutButton = document.createElement("button");
            logoutButton.textContent = "Kijelentkezés";
            logoutButton.style.marginRight = "10px";
            logoutButton.style.padding = "5px 10px";
            logoutButton.style.background = "rgb(42, 42, 57)";
            logoutButton.style.color = "white";
            logoutButton.style.border = "none";
            logoutButton.style.borderRadius = "5px";
            logoutButton.style.cursor = "pointer";
            logoutButton.addEventListener("click", () => {
                window.location.href = "/SzMDB/public/kapcsolat/logout.php";
            });

            
            const nav = document.querySelector("nav");
            nav.appendChild(logoutButton);
        }
    })
    .catch(error => {
        console.error("Error checking login status:", error);
    });
/*
//Footer
const footer = document.createElement("footer");
footer.style.background = "rgb(78, 78, 107)";
footer.style.color = "white";
footer.style.textAlign = "center";
footer.style.padding = "10px";
footer.style.position = "fixed";
footer.style.bottom = "0";
footer.style.width = "100%";
footer.style.boxShadow = "0 -2px 5px rgb(52, 52, 71)";
footer.style.display = "none"; //Hide it

footer.innerHTML = `
    <p>Kapcsolat: info@szmdb.com</p>
    <p>&copy; ${new Date().getFullYear()} SzMDB.</p>
`;

document.body.appendChild(footer);*/
loadMovies();
loadGenres();