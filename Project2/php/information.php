<!DOCTYPE html>
<html>
<?php
session_start();
$userName = $_SESSION['userName'];
$logout = $_SESSION['logout'];
$numOfFootprint =++$_SESSION['numOfFootprint'];
for($i=1;$i<$numOfFootprint;$i++){
    if($_SESSION["$i"."A"] == "<a class='foot' href='information.php'>个人信息 》</a>"){
        $_SESSION['numOfFootprint'] = $i;
        $numOfFootprint = $_SESSION['numOfFootprint'];
    }
}
$_SESSION["$numOfFootprint"."A"] = "<a class='foot' href='information.php'>个人信息 》</a>";
try{
    $db = new PDO('mysql:local=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db -> exec('SET NAMES utf8');
}

catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}

$result = $db->query("SELECT tel,email,address,balance,userID FROM users WHERE name='$userName'");
while($row = $result->fetch()){
    $tel = $row['tel'];
    $email = $row['email'];
    $address = $row['address'];
    $balance = $row['balance'];
    $userID = $row['userID'];
}
if(!isset($userID)){
    print "<a href='login.php'>请登录！</a>";
    exit();

}
?>
<head>
    <meta charset="utf-8">
    <title>21 Art Store</title>
    <link rel="stylesheet" href="../css/information.css">
    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/project2.js"></script>
    <script src="../js/information.js"></script>
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
            <p><a href="#" id="logout" onclick="logoutOrRegister()"><?=$logout?></a></p>
            </span>
    </div>
    <div>
            <span>
            <img src="../sucai/images/icon/cart.png">
            </span>
        <span>
            <p><a href="cart.php">购物车</a></p>
            </span>
    </div>
    <div>
            <span>
            <img src="../sucai/images/icon/user.png">
            </span>
        <span>
            <p><a href="#" id="login" onclick="loginOrInformation()"><?=$userName?></a></p>
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
            <li><a href="research.php" id="researchPage">搜索</a></li>
            <li><a href="#">发布艺术品</a></li>
        </ul>
    </div>
</nav>
<main>
    <div id="divOne">
        <section id="secOne">
            <p>您的足迹：</p> <?php
            $i = 1;
            for ($i;$numOfFootprint >= $i ;$i++){
                $temp = $_SESSION["$i"."A"];
                echo "$temp";
            }
            ?>
        </section>
        <section id="secTwo">
            <div id="largeOne">
                <p>用户：<?=$userName?></p>
                <p>电话：<?=$tel?></p>
                <p>邮箱：<br/><br/><?=$email?></p>
                <p>地址：<?=$address?></p>
                <p id="fund">余额：￥<span><?=$balance?></span></p>
                <p><a  id="money" onclick="chongzhi()">充值信仰</a></p>
            </div>
            <form id="chong">
                <p>输入您充值的金额￥：</p>
                <input type="number" placeholder="输入充值金额" id="recharge"><br/>
                <button type="submit" id="sure"><a onclick="chongzhi();sure()" href="#">确认</a></button>
                <button type="button" id="cancel" onclick="chongzhi()"><a>取消</a></button>
            </form>
            <div id="largeTwo">
                <div id="one">
                    <p>我上传的艺术品：</p><br/>
                    <table>
                        <tr>
                            <td class="namel">商品名称</td>
                            <td class="date">上传日期</td>
                            <td class="des">作品描述</td>
                        </tr>
                        <?php
                        $work = $db->query("SELECT * FROM artworks WHERE ownerID=$userID");
                        while ($row=$work->fetch()){
                            $title = $row['title'];
                            $date = $row['timeReleased'];
                            $des = substr($row['description'],0,50)."...";
                            $fileName = $row['imageFileName'];
                            echo "<tr>
                                        <td class='namel'><a href='detail.php?href=../resources/img/$fileName'>$title</a></td>
                                        <td class='date'>$date</td>
                                        <td class='des'>$des</td>
                                        <td><a class='decorate' href='upload.php?fileName=$fileName'>修改</a><a class='del' onclick='deleteArt(this)'>删除</a></td>
                                </tr>";
                        }
                        ?>
                    </table>
                </div>
                <div id="two">
                    <p>我购买的艺术品：</p><br/>
                    <table>
                        <tr>
                            <td>订单编号</td>
                            <td>商品名称</td>
                            <td>订单时间</td>
                            <td>订单金额</td>
                        </tr>
                        <?php
                        $work = $db->query("SELECT * FROM orders WHERE ownerID=$userID");
                        while ($row = $work->fetch()){
                            for ($num = 1;!isset($title_array) || (isset($title_array) &&$num<count($title_array));$num++){
                            $orderID = $row['orderID'];
                            $sum = $row['sum'];
                            $time = $row['timeCreated'];
                            $titles = $row['title'];
                            $title_array = explode("??",$titles);
                            $title = $title_array[$num];
                            $artwork = $db->query("SELECT imageFileName FROM artworks WHERE title='$title'");
                            while ($row1=$artwork->fetch()){
                                $href = $row1['imageFileName'];
                            }
                            echo "<tr>
                                    <td>$orderID</td>
                                    <td><a href='detail.php?href=../resources/img/$href'>$title</a></td>
                                    <td>$time</td>
                                    <td>$sum</td>
                                   </tr>";
                            }
                        }
                        ?>
<!--                        <tr>-->
<!--                            <td>订单编号：20180407482</td>-->
<!--                            <td>商品名称：WAngly</td>-->
<!--                            <td>订单时间：2018.04.07</td>-->
<!--                            <td>订单金额：￥100</td>-->
<!--                        </tr>-->
                    </table>
                </div>
                <div id="three">
                    <p>我卖出的艺术品：</p><br/>
                    <table>
                        <tr>
                            <td>客户信息</td>
                            <td>商品名称</td>
                            <td>订单时间</td>
                            <td>订单金额</td>
                        </tr>
                        <?php
                        //①找到自己上传且被购买的所以艺术品，这些艺术品信息存在在$row2里面
                            $sell = $db->query("SELECT * FROM artworks WHERE ownerID=$userID AND sell=1");
                            $times = 1;
                            while ($row2 = $sell->fetch()){
                                //搜索所有订单，获取所有订单的新主人id和旧主人id。将所有订单信息存在$row3里面  、、注意，order里面的ownerID是买的人的id
                                $order = $db->query("SELECT * FROM orders");
                                while ($row3 = $order->fetch()){
                                    $newOwnerID = $row3['ownerID'];
                                    $oldID = explode("??",$row3['oldOwnerID']);
                                    //对每个订单的旧主人id进行拆分，
                                    for ($m = 0;$m<count($oldID);$m++){
                                        //找到与当前登录用户符合的旧主人 id
                                        if($oldID[$m]==$row2['ownerID']){
                                            $buyer = $row3['ownerID'];
                                            //找出相应订单的新主人信息
                                            $userBuy = $db->query("SELECT * FROM users WHERE userID=$buyer");
                                            while ($row4=$userBuy->fetch()){
                                                $buyerName = $row4['name'];
                                                $buyerMail = $row4['email'];
                                                $buyerTel = $row4['tel'];
                                                $buyerAddress = $row4['address'];
                                            }
                                            //找到订单的时间 和 标题，再找到标题
                                            $order1 = $db->query("SELECT * FROM orders WHERE ownerID=$buyer");
                                            while ($row5 = $order1->fetch()){
                                                $timeBought = $row5['timeCreated'];
                                                $titles1 = $row5['title'];
                                                $title_array1 = explode("??",$titles1);
                                                $title1 = $title_array1[$m];
                                                $detail1 = $db->query("SELECT * FROM artworks WHERE title='$title1'");
                                                while ($row6 =$detail1->fetch()){
                                                    $href1 = $row6['imageFileName'];
                                                    $price = $row6['price'];
                                                }
                                            }
                                            if($times < 2){
                                                echo"<tr>
                                                    <td>$buyerName,$buyerMail,$buyerTel,$buyerAddress</td>
                                                    <td><a href='detail.php?href=../resources/img/$href1'>$title1</a></td>
                                                    <td>$timeBought</td>
                                                    <td>$price</td>
                                            </tr>";
                                            }

                                        }
                                    }
                                }
                                $times++;
                            }

                        ?>
<!--                        <tr>-->
<!--                            <td>20180412442</td>-->
<!--                            <td>Cindy Sheme's Death</td>-->
<!--                            <td>2018.04.12</td>-->
<!--                            <td>￥700</td>-->
<!--                        </tr>-->
                    </table>
                </div>
            </div>
        </section>
    </div>
</main>
</body>
</html>