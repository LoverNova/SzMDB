let header = document.querySelector("header");
if (!header) {
  header = document.createElement("header");
  document.body.prepend(header);
}

// Név (link) hozzáadása a jobb felső sarokhoz, és link a profil1.html oldalra
const userNameLink = document.createElement("a");
userNameLink.textContent = "Név";
userNameLink.style.textAlign = "center";
userNameLink.style.cursor = "pointer"; // Mutatja, hogy kattintható
userNameLink.href = "profil1.html"; // Profil oldal link
userNameLink.style.padding = "10px";
userNameLink.style.textDecoration = "line-through"; // Áthúzza a szöveget
header.appendChild(userNameLink);

// Profil menüpontok hozzáadása (jobb oldal)
const profile = document.createElement("div");
profile.textContent = "Profil és menüpontok";
profile.style.fontSize = "0.9em";

// Bal oldali szűrők sáv
const filters = document.createElement("div");
filters.classList.add("filters");

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

// Profil sáv (jobb oldal)
const profileSection = document.createElement("div");
profileSection.classList.add("profile");
profileSection.appendChild(profile);

// Kereső sáv
const searchBar = document.createElement("div");
searchBar.classList.add("search-container");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Cím kereső";
searchBar.appendChild(searchInput);

const searchButton = document.createElement("button");
searchButton.textContent = "Keresés";
searchBar.appendChild(searchButton);

// Container létrehozása (filmek tartalmazásához)
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
document.body.appendChild(container);

container.appendChild(searchBar);

// Filmek listája
const movieList = document.createElement("div");
movieList.classList.add("movie-list");

// Filmek hozzáadása
const movies = ["Film 1", "Film 2", "Film 3", "Film 4", "Film 5", "Film 6", "Film 7", "Film 8"];
const movieElements = movies.map((movieTitle) => {
  const movie = document.createElement("div");
  movie.classList.add("movie");

  const poster = document.createElement("div");
  poster.classList.add("poster");
  poster.textContent = "Poszter"; // Helyettesíthető valódi képpel
  movie.appendChild(poster);

  const title = document.createElement("div");
  title.textContent = movieTitle;
  title.classList.add("movie-title");
  movie.appendChild(title);

  movieList.appendChild(movie);
  return { element: movie, title: movieTitle.toLowerCase() };
});

container.appendChild(movieList);

// CSS osztály a rejtéshez
const style = document.createElement("style");
style.textContent = `
  .hidden {
    display: none !important;
  }
`;
document.head.appendChild(style);

// Keresési funkció gombra kattintva
searchButton.addEventListener("click", () => {
  const keresendo = searchInput.value.toLowerCase().trim();
  let found = false;

  movieElements.forEach(({ element, title }) => {
    if (title.includes(keresendo)) {
      element.classList.remove("hidden");
      found = true;
    } else {
      element.classList.add("hidden");
    }
  });

  // Ha nincs találat, felugró ablak megjelenítése
  if (!found && keresendo) {
    alert(`A "${keresendo}" nem található az oldalon`);
  }
});
