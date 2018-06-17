<!DOCTYPE html>
<html>
<?php

//开启session给相应的userName变量 （“用户名”/“登录”） 和logout （“登出”/“注册”）变量赋值
session_start();
$userName = $_SESSION['userName'];
$logout = $_SESSION['logout'];
$numOfFootprint =++$_SESSION['numOfFootprint'];

//该句需要放在后面加session语句的前面，以防在根据足迹栏返回商品详情时能够传递href参数
if(isset($_GET['href'])){
    $href = $_GET['href'];
}
for($i=1;$i<$numOfFootprint;$i++){
    if($_SESSION["$i"."A"] == "<a class='foot' href='detail.php?href=$href'>商品详情 》</a>"){
        $_SESSION['numOfFootprint'] = $i;
        $numOfFootprint = $_SESSION['numOfFootprint'];
    }
}
$_SESSION["$numOfFootprint"."A"] = "<a class='foot' href='detail.php?href=$href'>商品详情 》</a>";


$imgeFileName = substr($href,17);
try{
    $db = new PDO('mysql:local=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}

catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
$result = $db->query("SELECT * FROM artworks WHERE imageFileName = '$imgeFileName'");
$addView = $db->exec("UPDATE artworks SET view = view + 1 WHERE imageFileName = '$imgeFileName'");
while ($row = $result->fetch()){
    $artworkID = $row['artworkID'];
    $price = $row['price'];
    $description = $row['description'];
    $artist = $row['artist'];
    $date = $row['yearOfWork'];
    $width = $row['width'];
    $height = $row['height'];
    $genre = $row['genre'];
    $view = $row['view'];
    $title = $row['title'];
    $release = $row['timeReleased'];
}

$user = $db->query("SELECT userID FROM users WHERE name='$userName'");
while ($row = $user->fetch()){
    $userID = $row['userID'];
}
?>

<head>
    <meta charset="utf-8">
    <title>21 Art Store</title>
    <link rel="stylesheet" href="../css/detail.css">
    <script src="../js/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
</head>
<body onload="sellOrNot()">
<div id="dialog" title="小可爱贴士(●'◡'●)">
    <h4 id="information"></h4>
</div>
<header>
    <div class="right">
            <span>
            <img src="../sucai/images/icon/login.png"  id="head" name="<?=$userID?>">
            </span>
        <span>
            <a id="logout" href="#" onclick="logoutOrRegister()"><?=$logout?></a>
            </span>
    </div>
    <div class="right">
            <span>
            <img src="../sucai/images/icon/cart.png">
            </span>
        <span>
            <p><a onclick="cartOrNot()">购物车</a></p>
            </span>
    </div>
    <div class="right">
            <span>
            <img src="../sucai/images/icon/user.png">
            </span>
        <span>
            <p><a id="login" href="#" onclick="loginOrInformation()"><?=$userName?></a></p>
            </span>
    </div>
    <div id="left">
        <p>欢迎来到 <span>21 Are Store </span></p>
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
            <li><a href="upload.php">发布艺术品</a></li>
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
            <h2><?=$title?></h2>
            <p><a href="research.php">By <?=$artist?></a></p>
            <div id="tol">
                <div id="demo">
                    <div class="listshow-img" id="small-box">
                        <div id="mark"></div>
                        <div id="float-box"></div>
                        <img id="small" name="<?=$artworkID?>" src="<?=$href?>" alt="">
                    </div>
                    <div id="big-box">
                        <img id="big" src="<?=$href?>" alt="">
                    </div>
                </div>
            </div>
            <div id="two">
                <p id="description">&nbsp;&nbsp;&nbsp;<?=$description?></p>
                <br/>
                <p id="price">PRICE: <span> ￥<?=$price?></span></p>
                <br/>

<!--                加入购物车按钮-->
                <button type="button" id="toCart">♜Add to Shopping Cart</button>
                <br/><br/>
                <table>
                    <tr>
                        <th colspan="2">
                            <p>Product Details</p>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <p>Date:</p>
                        </td>
                        <td>
                            <p><?=$date?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Dimensions:</p>
                        </td>
                        <td>
                            <p><?=$width?>cm X <?=$height?>cm</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>View:</p>
                        </td>
                        <td>
                            <p><?=$view?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Genres:</p>
                        </td>
                        <td>
                            <p><?=$genre?></p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Subjects:</p>
                        </td>
                        <td>
                            <p>People,Family</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Released Time:</p>
                        </td>
                        <td>
                            <p><?=$release?></p>
                        </td>
                    </tr>
                </table>
            </div>
        </section>
    </div>
    <div id="divTwo">
        <section id="secThree">
            <table id="three">
                <tr>
                    <th><p>流行艺术家</p></th>
                </tr>
                <tr>
                    <td>Cnasdio</td>
                </tr>
                <tr>
                    <td>adfagg</td>
                </tr>
                <tr>
                    <td>ajhusu</td>
                </tr>
                <tr>
                    <td>ajhbas</td>
                </tr>
                <tr>
                    <td>ifhyc</td>
                </tr>
                <tr>
                    <td>qkhcu</td>
                </tr>
                <tr>
                    <td>orffhud</td>
                </tr>
            </table>
            <table id="four">
                <tr>
                    <th><p>流行流派</p></th>
                </tr>
                <tr>
                    <td>uucdx</td>
                </tr>
                <tr>
                    <td>aeydf</td>
                </tr>
                <tr>
                    <td>aiouwfu</td>
                </tr>
                <tr>
                    <td>rughvb</td>
                </tr>
                <tr>
                    <td>ydbxja</td>
                </tr>
            </table>
        </section>
    </div>
</main>
</body>
<script src="../js/project2.js"></script>
<script src="../js/detail.js"></script>
</html>