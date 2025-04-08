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