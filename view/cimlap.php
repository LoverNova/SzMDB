<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"></script>
    <title>Document</title>
    <style>
        <?php include 'css/style.css' ?>
    </style>
</head>
<body>
    <ul class="navbar">
        <li class="navbar"><a href="#home">Home</a></li>
        <li class="navbar"><a href="#news">News</a></li>
        <li class="navbar"><a href="#contact">Contact</a></li>
        <li class="navbar right"> <a href="#about">About</a></li>
    </ul> 
    
    <h1>Cimlap</h1>
    <p>Ez a SzMDB Címlapja</p>
    <p>Itt lesznek találhatók top filmekket, a keresőt és a felhasználó fület</p>

    <h2 id="besorolas">Újónnan kiadott filmek</h2>
    
    <table id="moviesTable">
        <tr>
            <th>Title</th>
            <th>Release Date</th>
            <th>Genre</th>
        </tr>
    </table>

    <script>
        
        async function loadTableData() {
            try {
           
                const response = await fetch('movies.json');
                const data = await response.json(); 

                const table = document.getElementById('moviesTable');

           
                data.forEach(movie => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${movie.title}</td>
                        <td>${movie.release_date}</td>
                        <td>${movie.genre}</td>
                    `;
                    table.appendChild(row);
                });
            } catch (error) {
                console.error('Error loading table data:', error);
            }
        }

       
        window.onload = loadTableData;
    </script>

</body>
</html>

