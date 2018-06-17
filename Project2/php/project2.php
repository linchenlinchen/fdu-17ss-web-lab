<?php
session_start();
$numOfFootprint = $_SESSION['numOfFootprint']=1;
$_SESSION['project2.php'] ="首页";
$_SESSION['research.php'] = "搜索";
$_SESSION['cart.php'] = "购物车";
$_SESSION['detail.php'] = "商品详情";
$_SESSION['information.php'] = "个人信息";
$_SESSION["$numOfFootprint"."A"] = "<a class='foot' href='project2.php'>首页 》</a>";

if(isset($_GET["login"])){
    $_SESSION["login"] = $_GET["login"];
}
$userName = $_SESSION['userName'] = (isset($_SESSION["login"]) && $_SESSION["login"] . ""==="true"?$_SESSION['userName']:"登录");
$logout = $_SESSION['logout'] = (isset($_SESSION["login"]) && $_SESSION["login"].""==="true"?"登出":"注册");
try{
    $db = new PDO('mysql:host=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}
catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
$result1 = $db->query("SELECT imageFileName,description,title FROM artworks WHERE sell=0 ORDER BY view DESC LIMIT 3");
while ($row = $result1->fetch()){
    $temp =$row['imageFileName'];
    $queue[] = "../resources/img/"."$temp";
    $describe[] = str_replace('"', '', $row["description"]);
    $title[] = $row['title'];
}
$result2 = $db->query("SELECT artist,imageFileName,description,title FROM artworks WHERE sell=0 ORDER BY timeReleased DESC LIMIT 3");
while($row = $result2->fetch()){
    $tempNew =$row['imageFileName'];
    $queueNew[] = "../resources/img/"."$tempNew";
    $describeNew[] = str_replace('"', '', $row["description"]);
    $titleNew[] = $row['title'];
    $artists[] = $row['artist'];
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>21 Art Store</title>
<!--    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">-->
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/project2.css">
    <script src="../js/jquery-3.3.1.min.js"></script>
<!--    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>-->
<!--    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>-->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdn.bootcss.com/popper.js/1.12.5/umd/popper.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    <script src="../js/project2.js"></script>
</head>

<body>
<div class="alert alert-success alert-dismissable fade show">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>客官!</strong> 小可爱知道你会来的o(*￣▽￣*)ブ。
</div>
<div id="move" class="carousel slide" data-ride="carousel">
    <!-- 指示符 -->
    <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
    </ul>

    <!-- 轮播图片 -->
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img class="hot" src="<?=$queue[0]?>" onclick="window.location.href='detail.php?href=<?=$queue[0]?>'">
            <div class="carousel-caption">
                <h3>TOP1:<?=$title[0]?></h3>
                <p><?=$describe[0]?></p>
            </div>
        </div>
        <div class="carousel-item">
            <img class="hot" src="<?=$queue[1]?>" onclick="window.location.href='detail.php?href=<?=$queue[1]?>'">
            <div class="carousel-caption">
                <h3>TOP2:<?=$title[1]?></h3>
                <p><?=$describe[1]?></p>
            </div>
        </div>
        <div class="carousel-item">
            <img class="hot" src="<?=$queue[2]?>" onclick="window.location.href='detail.php?href=<?=$queue[2]?>'">
            <div class="carousel-caption">
                <h3>TOP3:<?=$title[2]?></h3>
                <p><?=$describe[2]?></p>
            </div>
        </div>
    </div>

    <!-- 左右切换按钮 -->
    <a class="carousel-control-prev" href="#move" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
    </a>
    <a class="carousel-control-next" href="#move" data-slide="next">
        <span class="carousel-control-next-icon"></span>
    </a>
</div>

<!--头部导航栏-->
<div class="header">
<!--    导航栏-->
    <div id="nav" class="fixed-top row navbar">
       <span class="navbar-text">
           <h1><span>欢迎来到</span>21 Art Store<span>Shopping for love</span></h1>
       </span>
        <span >
          <ul >
              <li class="navbar-item"><a id="logout" href="#" onclick="logoutOrRegister()"><?=$logout?> </a></li>
              <li class="navbar-item"><a id="login" href="#" onclick="loginOrInformation()"><?=$userName?></a> </li>
              <li class="navbar-item"><a href="research.php">搜索 </a></li>
              <li class="navbar-item"><a>首页</a></li>
          </ul>
       </span>
    </div>
</div>

<!--最新发布-->
<div class="recommend">
    <div>
        <img src="<?=$queueNew[0]?>" alt="Micheal" onclick="window.location.href='detail.php?href=<?=$queueNew[0]?>'" class="workHot">
        <h4><?=$titleNew[0]?></h4>
        <div class="contents">
        <p class="author">Author:<?=$artists[0]?></p>
        <p class="description"><?=(strlen($describeNew[0])>300?substr($describeNew[0],0,300)."...":$describeNew[0])?></p><br/>
        <p><a href="detail.php?href=<?=$queueNew[0]?>" class="viewDetail">View details</a></p>
        </div>
    </div>
    <div>
        <img src="<?=$queueNew[1]?>" alt="Micheal" onclick="window.location.href='detail.php?href=<?=$queueNew[1]?>'" class="workHot">
        <h4><?=$titleNew[1]?></h4>
        <div class="contents">
        <p class="author">Author:<?=$artists[1]?></p>
        <p class="description"><?=(strlen($describeNew[1])>300?substr($describeNew[1],0,300)."...":$describeNew[1])?></p><br/>
        <p><a href="detail.php?href=<?=$queueNew[1]?>" class="viewDetail">View details</a></p>
        </div>
    </div>
    <div>
        <img src="<?=$queueNew[2]?>"  alt="Micheal" onclick="window.location.href='detail.php?href=<?=$queueNew[2]?>'"  class="workHot">
        <h4><?=$titleNew[2]?></h4>
        <div class="contents">
        <p class="author">Author:<?=$artists[2]?></p>
        <p class="description"><?=(strlen($describeNew[2])>300?substr($describeNew[2],0,300)."...":$describeNew[2])?></p>
        <br/>
        <p><a href="detail.php?href=<?=$queueNew[2]?>" class="viewDetail">View details</a></p>
        </div>
    </div>
</div>
</body>
</html>
<?php
if(isset($_GET["login"]) && $_GET["login"]){
    print "<style>
.alert{
display: block;
}
</style>";
}
?>
