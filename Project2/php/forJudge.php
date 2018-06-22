<?php
try{
    $db = new PDO('mysql:local=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}

catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
$src1 = $_GET['src'];
$artwork = $db->query("SELECT * FROM artworks WHERE imageFileName='$src1'");
while ($row = $artwork->fetch()){
    $title = $row['title'];
    $artist = $row['artist'];
    $description = $row['description'];
    $year = $row['yearOfWork'];
    $genre = $row['genre'];
    $width = $row['width'];
    $height = $row['height'];
    $price = $row['price'];
//    $art = array(
//        "title"=>$title,
//        "artist"=>$artist,
//        "description"=>$description,
//        "year"=>$year,
//        "genre"=>$year,
//        "width"=>$width,
//        "height"=>$height,
//        "price"=>$price
//    );
//    $json = json_encode($art);
//    print $json;
    print "$title&$artist&$description&$year&$genre&$width&$height&$price";
}
?>