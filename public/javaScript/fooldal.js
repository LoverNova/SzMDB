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
userNameLink.href = "profile"; // Profil oldal link
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
  return { 
    element: movie, 
    title: movieTitle.toLowerCase().replace(/\s+/g, "") // Megváltozott: szóközök eltávolítása a filmcímekből
  };
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

//"Levenshtein distance" jobb kereséshez/elirások ellenére is legyen esélye megtalálni a filmet
function levenshteinDistance(a, b) {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

// Javitott kereső rendszer => keresés a gombra kattintva
searchButton.addEventListener("click", () => {
  const keresendo = searchInput.value.toLowerCase().trim().replace(/\s+/g, "");
  let found = false;

  movieElements.forEach(({ element, title }) => {
    const distance = levenshteinDistance(title, keresendo);
    console.log(`Comparing: ${title} with ${keresendo}, Distance: ${distance}`);
    
    if (title.includes(keresendo) || distance <= 2) { //Felhasználói hibahatár (distance <= 2 )
      element.classList.remove("hidden");
      found = true;
    } else {
      element.classList.add("hidden");
    }
  });
//Felugró ablak ha nincs találat
  if (!found && keresendo) {
    alert(`A "${keresendo}" nem található az oldalon`);
  }
});