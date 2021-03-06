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

if(isset($_GET['userID']) && isset($_GET['account'])) {
    $userID = $_GET['userID'];
    $account = $_GET['account'];
    //给用户判断钱够不够，够的话就扣用户数据库里面的钱并打印“enough”
    $user = $db->query("SELECT * FROM users WHERE userID=$userID");
    while ($row = $user->fetch()) {
        if ((int)$row['balance'] < (int)$account) {
            print "notEnough";
            exit();
        } else {
            $newBalance = $row['balance'] - $account;
            $db->exec("UPDATE users SET balance=$newBalance WHERE userID=$userID");
            print "enough";
        }
    }
    //形成新订单
    $stmt = $db->prepare("INSERT INTO orders (ownerID,sum,timeCreated,oldOwnerID) VALUES (?,?,?,?)");
    $time = new DateTime();
    $timeStr = $time->format('c');
    $getOldOwnerFromCarts = $db->query("SELECT * FROM carts WHERE userID=$userID");
    $oldOwenerID="0";
    while ($row3 = $getOldOwnerFromCarts->fetch()){
        for ($t=0;$t<10;$t++){
            $temp = "artworkID"."$t";
            if($row3["$temp"]!=0){
                $artworkID1 = $row3["$temp"];
                $artwork1 = $db->query("SELECT * FROM artworks WHERE artworkID=$artworkID1");
                while ($row4 = $artwork1->fetch()){
                    $oldOwenerID = $oldOwenerID."??".$row4['ownerID'];
                }
                $other = $db->query("SELECT * FROM carts WHERE userID!=$userID");
                while ($row5 = $other->fetch()){
                    $anotherUserID=$row5['userID'];
                    for ($m=0;$m<10;$m++){
                        $temper = "artworkID"."$m";
                        if($row5["$temper"]==$row3["$temp"]){
                            $db->exec("UPDATE carts SET $temp=0 WHERE userID=$anotherUserID");
                            $otherUser = $row5['userID'];
                            $db->exec("UPDATE users SET information=1 WHERE userID=$otherUser");
                        }
                    }
                }
            }
        }
    }
    $stmt->execute(array($userID, $account, $timeStr,$oldOwenerID));


    //给相应艺术品标记已售出，即sell设置为1
    $cart = $db->query("SELECT * FROM carts WHERE userID=$userID");
    while ($row = $cart->fetch()) {
        $title="";
        for ($i = 0; $i < 10; $i++) {
            $t = "artworkID" . "$i";
            if ($row["$t"] != 0) {
                $artworkID = $row["$t"];
                $db->exec("UPDATE artworks SET sell=1 WHERE artworkID=$artworkID");
                $db->exec("UPDATE artworks SET changeOrNot=1 WHERE artworkID=$artworkID");
                //有问题。。。。。。。。。。。。。。。。。。。。。。。。。。
                $art = $db->query("SELECT title FROM artworks WHERE artworkID=$artworkID");
                //加入标题
                while ($row1 = $art->fetch()) {
                    $title =$title. "??".$row1['title'];
//                    $oldTitle = $db->query("SELECT title FROM orders  WHERE ownerID=$userID ORDER BY timeCreated DESC");
//                    while ($row2 = $oldTitle->fetch()){
//                        $title = $row2['title']."$title";
//                        break;
//                    }
                }

            }
        }
           $stmt = $db->exec("UPDATE orders SET title='$title' WHERE ownerID=$userID ORDER BY timeCreated DESC LIMIT 1");

//        }
    }
    //删除该用户购物车一行
    $cart1 = $db->query("SELECT * FROM carts WHERE userID=$userID");
    while ($row = $cart1->fetch()) {
        for ($i = 0; $i < 10; $i++) {
            $t = "artworkID" . "$i";
            $db->exec("UPDATE carts SET $t=0 WHERE userID=$userID");
        }
    }
}
?>