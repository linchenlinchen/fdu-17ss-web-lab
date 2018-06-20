<?php
session_start();
$numOfFootprint =++$_SESSION['numOfFootprint'];
for($i=1;$i<$numOfFootprint;$i++){
    if($_SESSION["$i"."A"] == "<a class='foot' href='#'> </a>"){
        $_SESSION['numOfFootprint'] = $i;
        $numOfFootprint = $_SESSION['numOfFootprint'];
    }
}
$_SESSION["$numOfFootprint"."A"] = "<a class='foot' href='#'> </a>";
try{
    $db = new PDO('mysql:local=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}

catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
$userName = $_SESSION['userName'];
//找到数据库里面用户名和当前登录用户名匹配的用户ID
$user = $db->query("SELECT userID FROM users WHERE name='$userName'");
while ($row1 = $user->fetch()){
    $userID = $row1['userID'];
}
//当表单提交的时候
if($_SERVER['REQUEST_METHOD']=="POST"){
    if(!$_POST['title']||!$_POST['artist']||!$_POST['description']||!$_POST['year']||!$_POST['genre']||!$_POST['width']||!$_POST['height']||!$_POST['price']){
        echo "<a href='upload.php'>客官，是不是忘记填什么了呀<br/>ヾ(｡｀Д´｡)ﾉ彡<span>点击返回</span></a>";
    }
    elseif($_POST['year']%1!=0){
        echo "<a href='upload.php'>客官,输入的年份有点问题呢<br/>(꒪Д꒪)ノ<span>点击返回</span></a>";
    }
    elseif($_POST['width']<0||$_POST['height']<0){
        echo "<a href='upload.php'>客官，长度和宽度有点神奇哟<br/>┭┮﹏┭┮<span>点击返回</span></a>";
    }
    elseif ($_POST['price']<0||$_POST['price']%1!=0){
        echo "<a href='upload.php'>客官，您输入的价格是逗我吗？<br/>(๑Ő௰Ő๑)<span>点击返回</span></a>";
    }
    else {
        $title = $_POST['title'];
        $artist = $_POST['artist'];
        $description = $_POST['description'];
        $year = $_POST['year'];
        $genre = $_POST['genre'];
        $width = $_POST['width'];
        $height = $_POST['height'];
        $price = $_POST['price'];
        $fileName = $_FILES["file"]["name"];
        $time = new DateTime();
        $timeStr = $time->format("c");
        $sellOrNot = $db->query("SELECT sell FROM artworks WHERE imageFileName='$fileName'");
        while ($row2 = $sellOrNot->fetch()) {
            if ($row2['sell']==1){
                echo "<a href='upload.php'>客官，您要修改的宝贝已经被人买走了呢<br/>(^_−)☆<span>点击返回</span></a>";
            }
        else {
            //如果文件已经存在在文件夹里面，那么只是更新数据库信息--  找到文件名一致 并且 拥有者id就是当前用户id的作品（保证是该用户上传的该商品）
            if (file_exists("../resources/img/" . $_FILES["file"]["name"])) {
                $stmt = $db->prepare("UPDATE artworks SET title=?,artist=?,description=?,yearOfWork=?,
                      genre=?,width=?,height=?,price=?,timeReleased=? WHERE ownerID=$userID AND imageFileName = '$fileName'");
                $stmt->execute(array($title, $artist, $description, $year, $genre, $width, $height, $price, $timeStr));
                echo "<a href='upload.php'>客官，东西我都给你改好了呢(｀・ω・´)<span>点击返回</span></a>";
                //找到要更新的商品的artworkID
                $artworkID = $db->query("SELECT artworkID FROM artworks WHERE imageFileName = '$fileName'");
                $id=0;
                while ($row4 = $artworkID->fetch()){
                    $id = $row4['artworkID'];
                }
                //对购物车里面有该商品的用户加入提示的information=1
                $information = $db->query("SELECT * FROM users");
                while ($row3 = $information->fetch()){
                    $userIdentify = $row3['userID'];
                    $forInformation = $db->query("SELECT * FROM carts WHERE userID=$userIdentify");
                    while ($row5 = $forInformation->fetch()){
                        for ($m=0;$m<10;$m++){
                            $temper = "artworkID"."$m";
                            if($row5["$temper"]==$id){
                                $db->exec("UPDATE users SET information=1 WHERE userID=$userIdentify");
                                break;
                            }
                        }
                    }
                }

            }
            else {
                move_uploaded_file($_FILES["file"]["tmp_name"],
                    "../resources/img/" . $_FILES["file"]["name"]);
                $stmt = $db->prepare("INSERT INTO artworks (title,artist,imageFileName,description,yearOfWork,genre,width,height,price,ownerID,timeReleased) VALUES(?,?,?,?,?,?,?,?,?,?,?)");
                $stmt->execute(array($title, $artist, $fileName, $description, $year, $genre, $width, $height, $price, $userID, $timeStr));
                echo "<a href='upload.php'>客官，东西我都给你上传好了呢(｀・ω・´)<span>点击返回</span></a>";
            }
        }
        exit();
        }
            echo "<a href='upload.php'>客官，东西呢(｀・ω・´)<span>点击返回</span></a>";

    }
}
?>
