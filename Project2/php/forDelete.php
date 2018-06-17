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
if (isset($_GET["artworkID"]) && isset($_GET['userID'])){
    $artworkID = $_GET["artworkID"];
    $userID = $_GET['userID'];
    //从数据库找到当前用户的购物车所有信息
    $cart = $db->query("SELECT * FROM carts WHERE userID='".$userID."'");
    while ($row = $cart->fetch()){
        for($i=0;$i<10;$i++){
            $t = "artworkID"."$i";
            if($row["$t"] == $artworkID){
                $db->exec("UPDATE carts SET $t=0 WHERE userID='".$userID."'");
                print "delete";
                exit();
                break;
            }
        }

    }
}
?>