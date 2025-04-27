console.log();
const $_GET = window.location.search;


fetch("/SzMDB/public/kapcsolat/movie.php" + $_GET)
.then(response =>{
    if(!response.ok){
        response.json()
        .then(error =>{
            throw new Error(error.error || "Szerver hiba!");
        })
    }
    return response.json();
})
.then(movie => {
    console.log(movie[0].title);
    
    document.getElementById("title").innerHTML = movie[0].title;    
    document.getElementById("description").innerHTML = movie[0].description;

    document.getElementById("posterPlace").innerHTML = `<img id="poster" src="SzMDB/public/uploads/moviePoster/${movie[0].pictureURL}" alt="${movie[0].title}">`;

})
.catch(error => {
    console.log(error.message);
    window.location.href = "/SzMDB/404";
});