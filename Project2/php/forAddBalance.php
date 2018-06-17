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
$userID = $_GET['userID'];
$money = $_GET["money"];
$user = $db->query("SELECT * FROM users WHERE userID=$userID");
while ($row = $user->fetch()){
    $newBalance = $row['balance'] + $money;
    echo "$money,$newBalance";
    $db->exec("UPDATE users SET balance=$newBalance WHERE userID=$userID");
}
?>
<!--///**-->
<!--// * Created by PhpStorm.-->
<!--// * User: L2595-->
<!--// * Date: 2018/6/15-->
<!--// * Time: 23:11-->
<!--// */-->