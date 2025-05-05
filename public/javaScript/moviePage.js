const $_GET = window.location.search;
console.log($_GET);

fetch("/SzMDB/public/kapcsolat/movie.php" + $_GET)
.then(response => {
    if(!response.ok){
        response.json()
        .then(error => {
            throw new Error(error.error || "Szerver hiba!");
        })
    }
    return response.json();
})
.then(movie => {
    document.getElementById("title").innerHTML = movie[0].title;    
    document.getElementById("description").innerHTML = movie[0].description;

    document.getElementById("posterPlace").innerHTML = `<img id="poster" src="SzMDB/public/uploads/moviePoster/${movie[0].pictureURL}" alt="${movie[0].title}">`;

    fetch("/SzMDB/public/kapcsolat/movieGenre.php" + $_GET)
    .then(responde => {
        if(!responde.ok){
            responde.json()
            .then(error => {
                throw new Error(error.error || "Szerver hiba!")
            })
        }
        return responde.json();
    })
    .then(genres => {
        var html = ``;
        genres.forEach(genre => {
            html += `<div class="card genre">${genre['genre']}</div>`;
        });

        document.getElementById("genre").innerHTML = html;
    })
    
    fetch('public/kapcsolat/session.php')
    .then(data => {
        if(!data.ok){
            throw new Error("Nem vagy bejelentkezve!");
        }
        return data.json()
    })
    .then(result => {
        fetch("/SzMDB/public/kapcsolat/genre.php")
        .then(responde => {
            if(!responde.ok){
                responde.json()
                .then(error => {
                    throw new Error(error.error || "Szerver hiba!")
                })
            }
            return responde.json();
        })
        .then(genres => {
            var html = ``;
            genres.forEach(genre => {
                html += `<option value="${genre['id']}">${genre['genre']}</option>`; 
            });
            document.getElementById('selectGenre').innerHTML = html;
        })

        if(!result["admin"] == 1){
            document.getElementById("admin").innerHTML = ``;
        }
    })
})
.catch(error => {
    console.log(error.message);
    window.location.href = "/SzMDB/404";
});

document.getElementById('addNewGenre').addEventListener('submit', function(e){
    e.preventDefault();

    var genre = prompt("Adjon meg egy műfajt: ")    
    formData = new FormData();
    
    formData.append('genre', genre)
    fetch('/SzMDB/public/kapcsolat/genre.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(!response.ok){
            response.json().then(error => {
                throw new Error("Ismeretlen hiba" || error.error);
            })
        }
        return response.json();
    })
    .then(data => {        
        movieGenreForm = new FormData();
        movieGenreForm.append('movieId', $_GET.substring(9));
        movieGenreForm.append('genreId', data['id']);
        console.log(movieGenreForm);
        
        fetch('/SzMDB/public/kapcsolat/movieGenre.php', {
            method: 'POST',
            body: movieGenreForm
        })
        .then(response => {
            if(!response.ok){
                response.json().then(error => {
                    throw new Error("Ismeretlen hiba" || error.error);
                })
            }
        })
        .then(data => {
            window.location.href = "/SzMDB/moviePage" + $_GET;
        });
    })
})

document.getElementById("addGenre").addEventListener('submit', function(e){
    e.preventDefault();

    const formData = new FormData(this);
    formData.append('movieId', $_GET.substring(9));
    
    fetch('/SzMDB/public/kapcsolat/movieGenre.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(!response.ok){
            response.json().then(error => {
                throw new Error("Ismeretlen hiba" || error.error);
            })
        }
    })
    .then(data => {
        window.location.href = "/SzMDB/moviePage" + $_GET;
    });
});