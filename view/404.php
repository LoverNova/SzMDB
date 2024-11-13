<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        <?php include 'css/style.css' ?>
    </style>
</head>
<body>
    <ul class="navbar">
        <li class="navbar"><a href="<?php echo($defaultPath) ?>">Főoldal</a></li>
        <li class="navbar"><a href="#news">News</a></li>
        <li class="navbar"><a href="#contact">Contact</a></li>
        <li class="navbar right"> <a href="#about">About</a></li>
    </ul> 
    <h1>404</h1>
    <p>Page not found<p>
    <p><a href = <?php echo($defaultPath) ?>>Ugrás a címlapra</a></p>
</body>
</html>