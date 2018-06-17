<?php
$sell = false;
$add = false;
try{
    $db = new PDO('mysql:host=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}
catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
//若已售出
$result1 = $db->query("SELECT * FROM orders");
while ($row = $result1->fetch()){
    if(isset($_GET['artworkID'])){
        $t = $_GET['artworkID'];
        $sellOrNot = $db->query("SELECT * FROM artworks WHERE artworkID=$t");
        while ($row1 = $sellOrNot->fetch()){
            if($row1['sell'] == 1){
                $sell = true;
                print "sell";
                exit();
            }
        }
    }
}
//若未售出
$result2 = $db->query("SELECT * FROM carts WHERE userID='".$_GET['userID']."'");
while ($row = $result2->fetch()){
    for($i=0;$i<10;$i++){
        if (isset($_GET['artworkID']) && $row['artworkID'."$i"] == $_GET['artworkID'] && $row['userID'] == $_GET['userID']){
            $add = true;
            print "add";
            exit();
            break;
        }
    }
    for ($i=0;$i<10;$i++){
        $name = 'artworkID'."$i";
        $t = $_GET['artworkID'];
        if($row[$name] == 0){
            $db->exec("UPDATE carts SET $name=$t WHERE userID='".$_GET['userID']."'");
            break;
        }
    }
}

?>