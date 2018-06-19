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
$artist = $_GET['artist'];
$artwork = $db->query("SELECT * FROM artworks WHERE sell=0");
while ($row = $artwork->fetch()){

    if($artist == $row['artist']){
        $title = $row['title'];
        print "???$title";
    }
}
?>

