<!DOCTYPE html>
<html>
<?php
session_start();
$userName = $_SESSION['userName'];
$logout = $_SESSION['logout'];
$numOfFootprint =++$_SESSION['numOfFootprint'];
for($i=1;$i<$numOfFootprint;$i++){
    if($_SESSION["$i"."A"] == "<a class='foot' href='cart.php'>购物车 》</a>"){
        $_SESSION['numOfFootprint'] = $i;
        $numOfFootprint = $_SESSION['numOfFootprint'];
    }
}
$_SESSION["$numOfFootprint"."A"] = "<a class='foot' href='cart.php'>购物车 》</a>";

//连接数据库
try{
    $db = new PDO('mysql:host=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}

catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
$user = $db->query("SELECT userID FROM users WHERE name='".$userName."'");
while ($row=$user->fetch()){
    $userID = $row['userID'];
}

?>
<head>
    <meta charset="utf-8">
    <title>21 Art Store</title>
    <link rel="stylesheet" href="../css/cart.css">
    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/cart.js"></script>
    <script src="../js/project2.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
</head>
<body>
<div id="dialog" title="小可爱贴士(●'◡'●)">
    <h4 id="information"></h4>
</div>
<header class="fixed-top">
    <div>
            <span>
            <img src="../sucai/images/icon/login.png"  id="head" name="<?=$userID?>">
            </span>
        <span>
            <p><a id="logout" href="#" onclick="logoutOrRegister()"><?=$logout?></a></p>
            </span>
    </div>
    <div>
            <span>
            <img src="../sucai/images/icon/cart.png">
            </span>
        <span>
            <p id="cart"><a href="cart.php">购物车</a></p>
            </span>
    </div>
    <div>
            <span>
            <img src="../sucai/images/icon/user.png">
            </span>
        <span>
            <p><a id="login" href="#" onclick="loginOrInformation()"><?=$userName?></a></p>
            </span>
    </div>
</header>
<nav>
    <div id="top">
        <h1>21 Art Store</h1>
    </div>
    <div id="bottom">
        <ul>
            <li><a href="project2.php">首页</a></li>
            <li><a href="research.php">搜索</a></li>
            <li><a href="#">发布艺术品</a></li>
        </ul>
    </div>
</nav>
<main>
    <div id="divOne">
        <section id="secOne">
            <p>您的足迹：</p> <?php
            $i = 1;
            for ($i = 1;$numOfFootprint >= $i ;$i++){
                $temp = $_SESSION["$i"."A"];
                echo "$temp";
            }
            ?>
        </section>
        <section id="secTwo">
            <p>购物车</p>
        </section>

        <section id="secThree">
            <div id="divThree">
                <?php
                //获取该用户的购物车内所有信息
                $result = $db->query("SELECT * FROM carts WHERE userID=$userID");
                $account = 0;
                while($row = $result->fetch()){
                    //根据该用户的carts行的对应信息循环打印
                    for ($i=0;$i<10;$i++){
                        //将artworkID0 - artworkID9 在循环不同次数时分布赋值给$t
                        $t = 'artworkID'."$i";
                        //即当存在该值时
                        if($row["$t"] != 0){
                            $artworkID = $row["$t"];
                            //去数据库找到对应的商品
                            $result1 = $db->query("SELECT * FROM artworks WHERE artworkID=$artworkID AND sell=0");
                            $soldout = $db->query("SELECT * FROM artworks WHERE artworkID=$artworkID AND sell=1");
                            while ($row1=$result1->fetch()){
                                $src = $row1['imageFileName'];
                                $title = $row1['title'];
                                $artist = $row1['artist'];
                                $description = $row1['description'];
                                $price = $row1['price'];
                                $account = $account + (int)($price);
                            }
                            echo "
                <div class=\"good\" id=\"pic$i\">
                    <span><img src=\"../resources/img/$src\" name='$artworkID'></span>
                    <span id='inform'>
                        <div class=\"hh3\">
                            <h3><a href=\"detail.php?href='../resources/img/$src'\">$title</a></h3>
                        </div>
                        <div>
                            <p class=\"namel\"><a href=\"detail.php?href=../resources/img/$src\">$artist--$description</a></p>
                        </div>
                        <div>
                            <span class=\"price\">
                                <p>♥ 价格:￥$price</p>
                            </span>
                            <span class=\"delete\">
                                <p>♐删除</p>
                            </span>
                        </div>
                    </span>
                </div>";
                        }
                    }

                }
                ?>
                <div id="account" >
                    <p onclick="account()" class="money" id="<?=$account?>">➷结账(￥<?=($account)?>)</p>
                </div>
            </div>
        </section>
    </div>
    <section id="buttonS">
        <button type="button">←</button>
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">...</button>
        <button type="button">→</button>
    </section>
</main>
</body>
</html>
<?php
?>
<!--/**-->
<!-- * Created by PhpStorm.-->
<!-- * User: L2595-->
<!-- * Date: 2018/6/11-->
<!-- * Time: 17:09-->
<!-- */-->
<!--//while ($row2 = $soldout->fetch()){-->
<!--//-->
<!--//}-->
<!--//-->