<!DOCTYPE html>
<html lang="en">
<?php
session_start();
$userName = $_SESSION['userName'];
$logout = $_SESSION['logout'];
$numOfFootprint =++$_SESSION['numOfFootprint'];
for($i=1;$i<$numOfFootprint;$i++){
    if($_SESSION["$i"."A"] == "<a class='foot' href='upload.php'>艺术品发布与修改 》</a>"){
        $_SESSION['numOfFootprint'] = $i;
        $numOfFootprint = $_SESSION['numOfFootprint'];
    }
}
$_SESSION["$numOfFootprint"."A"] = "<a class='foot' href='upload.php'>艺术品发布与修改 》</a>";
//开启session给相应的userName变量 （“用户名”/“登录”） 和logout （“登出”/“注册”）变量赋值
try{
    $db = new PDO('mysql:local=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}

catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
$user = $db->query("SELECT userID FROM users WHERE name='$userName'");
while ($row = $user->fetch()){
    $userID = $row['userID'];
}
if(!isset($userID)){
    print "<a href='login.php'>请登录！</a>";
    exit();

}

?>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="../css/upload.css">
    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/project2.js"></script>
    <script src="../js/upload.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script src="../js/plupload-3.1.2/js/plupload.full.min.js"></script>
</head>
<body>
<div id="blank" class="blank"></div>
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
        <!--<ul id="choose"><li><input type="radio"name="choose" id="up" checked  onclick="tog()">上传艺术品</li><li><input type="radio" name="choose" id="change" onclick="tog()">修改艺术品信息</li></ul>-->
        <form id="upload" method="post" action="forUpdateOrUpload.php" enctype="multipart/form-data">
            <?php if(isset($_GET['fileName'])) {
                $image = $_GET['fileName'];
                $art_work = $db->query("SELECT imageFileName FROM artworks WHERE imageFileName='$image' AND sell=1");
                while ($row3 = $art_work->fetch()){
                    print "该商品已售出，不可修改";
                }
            }?>
            <fieldset>
                <ul>
                    <li>艺术品名称：<input type="text" name="title" autofocus maxlength="50" placeholder="艺术品名称" id="title" onchange="cEmpty('title')"><span id="cTitle"></span></li>
                    <li>艺术品作者：<input type="text" name="artist" maxlength="50" placeholder="艺术品作者" id="artist" onchange="cEmpty('artist')"><span id="cArtist"></span></li>
                    <li>艺术品简介：<textarea name="description"  maxlength="600" placeholder="艺术品简介" id="description" onchange="cEmpty('description')"></textarea><span id="cDescription"></span></li>
                    <li>艺术品年份：<input type="number" name="year" max="2018" placeholder="艺术年份" id="year" onchange="cEmpty('year');cInt('year')"><span id="cYear"></span></li>
                    <li>艺术品流派：<input type="text" name="genre" maxlength="30" placeholder="艺术品流派" id="genre" onchange="cEmpty('genre')"><span id="cGenre"></span></li>
                    <li>艺术品尺寸：<input type="number" id="width" name="width" placeholder="宽度" onchange="cEmpty('width');cPositive('width')"><input type="number"id="height" name="height" placeholder="高度" onchange="cEmpty('height');cPositive('height')"><span id="cSize"></span></li>
                    <li>艺术品价格：<input type="number"  name="price" placeholder="艺术品价格" id="price" onchange="cEmpty('price');cInt('price');cPositive('price')"><span id="cPrice"></span></li>
                    <li>艺术品图片：<input type="file" name="file" id="img" onchange="selectFile()"><?php $_GET['fileName']?></li><img id="image"
                    <?php
                    if(isset($_GET['fileName'])){
                        $fileName=$_GET['fileName'];
                        $art1 = $db->query("SELECT sell FROM artworks WHERE imageFileName='$fileName' AND sell=0");
                        while ($row2 =$art1->fetch()){
                            echo "src='../resources/img/$fileName'";
                        }
                        }?> onclick="showImage()" class="min">
                    <li><button id="start_upload" name="submit" type="submit">确认上传</button></li>
                </ul>
            </fieldset>
        </form>
    </div>
</main>
</body>
</html>