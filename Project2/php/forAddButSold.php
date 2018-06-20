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
$userID=$_GET['userID'];
$information = $db->query("SELECT * FROM users WHERE userID=$userID AND information=1");
while ($row = $information->fetch()){
    print "information";
    $db->exec("UPDATE users SET information=0 WHERE userID=$userID");
}
?>