
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
        console.log(formData.get('moviePoster')['name']);
        formData.append('poster', formData.get('moviePoster')['name'])
    
        fetch("/SzMDB/public/kapcsolat/movie.php", {
            method: 'POST',
            body: formData
        })
    });
})
.catch(Error => {
    console.log(Error.message);
    window.location.href = "/SzMDB/"
})