
fetch('public/kapcsolat/session.php')
.then(data => {
    if(!data.ok){
        throw new Error("Nem vagy bejelentkezve!");
    }
    return data.json()
})
.then(result => {
    if(!result["admin"] === 1){
        throw new Error("Nincs adminisztrátori privilégumod!")
    }
    
    
    
    
    document.getElementById('addMovieForm').addEventListener('submit', function(event){
        event.preventDefault();
        
        
        fetch("/SzMDB/public/kapcsolat/movies.php")
        .then(response => {
            if(!response.ok){
                response.json()
                .then(error => {
                    throw new Error(error.error || "Szerver hiba!")
                })
            }
            return response.json();
        })
        .then(movies => {
            id = movies.length - 1
            console.log(parseInt(id));
            
            newId =  parseInt(movies[parseInt(id)]['id']) + 1;
            moviePosterFileName = "moviePoster" + newId
            console.log(moviePosterFileName);
            
            const formData = new FormData(this);
            // console.log(formData);
            moviePosterExtension = "." + formData.get('moviePoster')['name'].split('.')[1]
            
            formData.append('poster', moviePosterFileName + moviePosterExtension)
            
            console.log(moviePosterFileName + moviePosterExtension);
            
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
            .then(id => {
                
                moviePosterUpload = new FormData();
                moviePosterUpload.append('movieId', newId);
                moviePosterUpload.append('moviePoster', formData.get('moviePoster'));

                fetch('/SzMDB/public/kapcsolat/uploadMoviePoster.php', {
                    method: 'POST',
                    body: moviePosterUpload
                })

            //     // window.location.href = "/SzMDB/moviePage?movieId=" + id["id"]
            });
        });
    });
})
.catch(Error => {
    console.log(Error.message);
    window.location.href = "/SzMDB/"
})