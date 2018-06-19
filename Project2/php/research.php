
<?php
session_start();
$current = $_SESSION['currentPage']=0;
if (isset($_GET['currentPage'])){
    $_SESSION['currentPage'] = $_GET['currentPage'];
    $current = $_SESSION['currentPage'];
}
$userName = $_SESSION['userName'];
$logout = $_SESSION['logout'];
$numOfFootprint =++$_SESSION['numOfFootprint'];
for($i=1;$i<$numOfFootprint;$i++){
    if($_SESSION["$i"."A"] == "<a class='foot' href='research.php'>搜索 》</a>"){
        $_SESSION['numOfFootprint'] = $i;
        $numOfFootprint = $_SESSION['numOfFootprint'];
    }
}
$_SESSION["$numOfFootprint"."A"] = "<a class='foot' href='research.php'>搜索 》</a>";
try{
    $db = new PDO('mysql:local=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}
catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}

?>

<?php
if($_SERVER['REQUEST_METHOD'] = 'GET' && isset($_GET['research'])){
$researchInform = '';
$totalCount = 0;
if(isset($_GET['research'])){
    $researchInform = $_GET['research'];
    $artist = $_GET['authors'];
    $work = $_GET['works'];
}
if(trim($researchInform) == "" && $artist!='作者' && $work!="艺术品名"){
    $sqlWords1 = "SELECT * FROM artworks WHERE sell=0 AND 
        (((artist='$artist') AND title LIKE '%$work%'))";
}
elseif (trim($researchInform) == "" && $artist!='作者' && $work=="艺术品名"){
    $sqlWords1 = "SELECT * FROM artworks WHERE sell=0 AND artist='$artist'";
}
else{
    $sqlWords1 ="SELECT * FROM artworks WHERE sell=0 AND 
        ((description LIKE '%$researchInform%' OR title LIKE '%$researchInform%' OR artist LIKE '%$researchInform%') 
        OR ((artist='$artist') AND title LIKE '%$work%')) ";
}
$mark = ($_GET['page'] - 1) * 6;
$number = $db->query($sqlWords1);
$number1 = count($number->fetchAll());
echo "$number1???";
if($number1-$mark>=6) {
    $sqlWords2 = $sqlWords1 . "LIMIT $mark,6";
}
else{
    $left = $number1%6;
    $sqlWords2 = $sqlWords1 . "LIMIT $mark,$left";
}
$good = $db->query($sqlWords2);
//若未填写搜索信息
    while (($row1=$good->fetch())){
            $href = "../resources/img/" . $row1['imageFileName'];
            $titleLen = strlen($row1['title']) > 25 ? 25 : $row1['title'];
            $view = $row1['view'];
            $prices = $row1['price'];
            $goodBlock = "<div class='block'  name='$view' title='$prices' >
                                        <div class=\"divOne\">
                                            <span><img src=\"$href\"></span>
                                            <span>
                                                    <h3>" . ($titleLen == 25 ? (substr($row1['title'], 0, 25) . "...") : $row1['title']) . "</h3><br/>
                                                    <p class='artist' name='$prices'>" . $row1['artist'] . "<br/>￥" . $row1['price'] . "</p>
                                            </span>
                                        </div>
                                        <div class=\"divTwo\">
                                            <p>" . substr($row1['description'], 0, strlen($row1['description']) > 300 ? 300 : strlen($row1['description'])) . "..." . "</p>
                                        </div>
                                        <div class='divAdd'>
                                          <p class='checkP'><a href='detail.php?href=$href' class='check'>查看</a></p>
                                         <p class='hotP'><a href='#' class='hot'>热度" . $row1['view'] . "</a></p>
                                        </div>
                                    </div>";
                print $goodBlock;
        }
        exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>21 Art Store</title>
    <link rel="stylesheet" href="../css/research.css">
    <script src="../js/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
</head>
<body>
<!--提示框-->
<div id="dialog" title="小可爱贴士(●'◡'●)">
    <h4 id="information"></h4>
</div>

<!--黑灰色头部，含有用户，购物车，返回等等-->
<header class="fixed-top">
    <div class="right">
            <span>
            <img src="../sucai/images/icon/login.png">
            </span>
            <span>
            <a id="logout" href="#" onclick="logoutOrRegister()"><?= $logout ?></a>
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
        <p>欢迎来到 <span>21Are Store </span></p>
    </div>
</header>

<!--logo与搜索 其余导航-->
<nav>
    <div id="top">
<!--logo-->
        <h1>21Art Store</h1>
        <span>
            <form method="post" action="research.php"><input type="text" placeholder="搜索" name="research" id="research"
              <?php if(isset($_GET['research'])){print "value='".$_GET['research']."'";}?>
                ><button type="submit" onclick="return changePageTo(1)">搜索</button><br/><br/>

<!--选择作者的下拉列表-->
                    <select type="submit" name="authors" id="authors" onchange="changeWorks()">
<!--辅助的提示选项-->
                        <option selected value="作者">作者</option>
                        //php连接数据库打印作者选项
                        <?php
                        $authors = $db->query("SELECT artist From artworks");
                        $author = '';
                        while ($row = $authors->fetch()){
                            if($author != $row['artist']){
                                if(isset($_GET["authors"]) && $row['artist'] === $_GET["authors"] ){
                                    print "<option selected value='".$row['artist']."'>".$row['artist']."</option>";
                                }
                                else{
                                    print "<option value='".$row['artist']."'>".$row['artist']."</option>";
                                }
                            }
                            $author=$row['artist'];
                        }
                        ?>
                    </select>

<!--选择作品的下拉列表-->
                    <select name="works" id="works">
<!--辅助的提示选项-->
                        <option selected value="艺术品名">艺术品名</option>
<!--php连接数据库打印作品名-->
                    </select>
            </form>
        </span>
    </div>

    <div id="bottom">
        <ul>
            <li><a href="project2.php">首页</a></li>
            <li><a href="research.php" id="researchPage">搜索</a></li>
            <li><a href="#">发布艺术品</a></li>
        </ul>
    </div>
</nav>

<main>
    <section id="secOne">
        <p>您的足迹：</p>
        <?php
        $i = 1;
        for ($i;$numOfFootprint >= $i ;$i++){
            $temp = $_SESSION["$i"."A"];
            echo "$temp";
        }
        ?>
    </section>
    <section id="secTwo">
        <p id="one">搜索结果：</p>
        <form method="get" ><p id="two"><span>排序方式：</span><span>价格</span><span><input type="radio" id="prices" name="sort" value="1" onclick="price()"></span>
            <span>热度</span><span><input type="radio" id="views" name="sort" value="2" onclick="view()" checked></span></p></form>
    </section>
    <section id="secThree">



    </section>
</main>
<footer>
    <div class="page">
        <a id="head" onclick="turnHead()"><<</a>
        <a id="last" onclick="lastPage()"><</a>
        <a id="current">1</a>
        <a id="next" onclick="nextPage()">></a>
        <a id="tail" onclick="turnTail()">>></a>
    </div>
</footer>
</body>
<script src="../js/project2.js"></script>
<script src="../js/research.js"></script>

</html>






<!--$works = $db->query('SELECT title,artist From artworks WHERE sell=0');-->
<!--$work = '';-->
<!--while ($row = $works->fetch()){-->
<!--    if($work != $row['title']){-->
<!--        if(isset($_GET["works"]) && $row['title'] === $_GET["works"] ){-->
<!--            print "<option selected value='".$row['title']."'>". (strlen($row['title']) > 30 ? (substr($row['title'], 0, 30) . '...') : $row['title']) . "</option>";-->
<!--        }-->
<!--        else{-->
<!--            print "<option value='".$row['title']."'>". (strlen($row['title']) > 30 ? (substr($row['title'], 0, 30) . '...') : $row['title']) . "</option>";-->
<!--        }-->
<!--    }-->
<!--    $work = $row['title'];-->
<!--}-->



