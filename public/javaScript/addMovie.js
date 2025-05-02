
fetch('public/kapcsolat/session.php')
.then(data => {
    if(!data.ok){
        throw new Error("Nem vagy bejelentkezve!");
    }
    return data.json()
})
.then(result => {
    if(!result["admin"] == 1){
        throw new Error("Nincs adminisztrátori privilégumod!")
    }
    
    
    
    
    document.getElementById('addMovieForm').addEventListener('submit', function(event){
        event.preventDefault();
    
        const formData = new FormData(this);
        console.log(formData);
        formData.append('poster', formData.get('moviePoster')['name'])
    
        fetch("/SzMDB/public/kapcsolat/movie.php", {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if(!response.ok){
                response.json()
                .then(error => {
                    throw new Error(error.error || "Szerver hiba!")
                })
            }
            return response.json();
        })
        .then(id => window.location.href = "/SzMDB/moviePage?movieId=" + id["id"]);
    });
})
.catch(Error => {
    console.log(Error.message);
    window.location.href = "/SzMDB/"
})