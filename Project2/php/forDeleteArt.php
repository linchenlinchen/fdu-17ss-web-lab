<?php
try{
    $db = new PDO('mysql:host=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}

catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
$src = $_GET['src'];
$artwork =$db->exec("DELETE FROM artworks WHERE sell=0 AND imageFileName='$src'");
if($artwork){
    print "$artwork";
    if (file_exists("../resources/img/" . $src)){
        unlink("../resources/img/".$src);
    }
}
else{
    print "sold";
}
?>