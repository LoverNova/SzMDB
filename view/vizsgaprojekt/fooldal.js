// Header létrehozása, ha nem létezik
let header = document.querySelector("header");
if (!header) {
  header = document.createElement("header");
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "space-between";
  header.style.padding = "10px";
  header.style.backgroundColor = "#f4f4f4";
  document.body.prepend(header);
}

// Név (link) hozzáadása
const name = document.createElement("a");
name.textContent = "Név";
name.style.flexGrow = "1";
name.style.textAlign = "center";
name.style.cursor = "pointer"; // Mutatja, hogy kattintható
name.href = "#"; // Adj meg egy valódi URL-t, ha szükséges
header.appendChild(name);

// Profil menüpontok hozzáadása
const profile = document.createElement("div");
profile.textContent = "Profil és profil menüpontok";
profile.style.fontSize = "0.9em";
header.appendChild(profile);

// Container létrehozása
const container = document.createElement("div");
container.style.display = "flex";
container.style.padding = "20px";
document.body.appendChild(container);

// Filters (Oldalsáv)
const filters = document.createElement("aside");
filters.style.width = "200px";
filters.style.marginRight = "20px";

// Szűrő cím
const filterTitle = document.createElement("h3");
filterTitle.textContent = "Szűrők";
filterTitle.style.marginBottom = "10px";
filters.appendChild(filterTitle);

// Szűrő lista
const filterList = document.createElement("ul");
filterList.style.listStyle = "none";
["Színészek", "Rendezők", "Stb..."].forEach((filter) => {
  const listItem = document.createElement("li");
  listItem.textContent = filter;
  listItem.style.marginBottom = "5px";
  filterList.appendChild(listItem);
});
filters.appendChild(filterList);
container.appendChild(filters);

// Content (Fő tartalom)
const content = document.createElement("main");
content.style.flexGrow = "1";

// Kereső
const searchBar = document.createElement("div");
searchBar.style.marginBottom = "20px";
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Cím kereső";
searchInput.style.width = "100%";
searchInput.style.padding = "10px";
searchInput.style.fontSize = "1em";
searchInput.style.border = "1px solid #ccc";
searchInput.style.borderRadius = "5px";
searchBar.appendChild(searchInput);
content.appendChild(searchBar);

// Filmek listája
const movieList = document.createElement("div");
movieList.style.display = "flex";
movieList.style.gap = "20px";
movieList.style.flexWrap = "wrap";

// Filmek hozzáadása
const movies = ["Film 1", "Film 2", "Film 3", "Film 4"];
movies.forEach((movieTitle) => {
  const movie = document.createElement("div");
  movie.style.width = "200px";
  movie.style.textAlign = "center";

  const poster = document.createElement("div");
  poster.textContent = "Poszter";
  poster.style.width = "100%";
  poster.style.height = "300px";
  poster.style.backgroundColor = "#ddd";
  poster.style.marginBottom = "10px";
  movie.appendChild(poster);

  const title = document.createElement("div");
  title.textContent = movieTitle;
  title.style.fontSize = "1em";
  title.style.fontWeight = "bold";
  movie.appendChild(title);

  movieList.appendChild(movie);
});

content.appendChild(movieList);
container.appendChild(content);
