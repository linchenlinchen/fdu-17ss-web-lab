<?php
session_start();
$userName = $_SESSION['userName'];
$logout = $_SESSION['logout'];
try{
    $db = new PDO('mysql:local=localhost;dbname=artworks','root','');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
    print ("cannot connect!". $e->getMessage());
    exit();
}
if($_SERVER["REQUEST_METHOD"] == 'GET'){
    if(isset($_GET["name"])){
        $name = $_GET["name"];
        $users = $db->query("SELECT * FROM users WHERE name='$name'");
        $row = $users->fetchAll();
        if(count($row) > 0){
            echo "0";
        }else{
            echo "1";
        }
        exit();
    }
}
//<!--php判断是否提交表单且提交成功，若提交成功（满足注册要求）则将注册用户加入数据库-->
else if($_SERVER["REQUEST_METHOD"] == 'POST'){
    $allUsers = $db->query("SELECT * FROM users");
    $allRows = $allUsers->fetchAll();
    $id = count($allRows) + 1;
    $stmt = $db->prepare("INSERT INTO users (userID,name,password,tel,email,address,balance) 
                                VALUES (?,?,?,?,?,?,?)");
    $stmt->execute(array($id,$_POST['user'],$_POST['password'],$_POST['tel'],$_POST['mail'],$_POST['addr'],0));
    $cartNew = $db->prepare("INSERT INTO carts (cartID,userID) VALUES (?,?)");
    $cartNew->execute(array($id,$id));
    $_SESSION["login"] = "true";
    $_SESSION["userName"] = $_POST['user'];
    header("Location:project2.php");

    exit();
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>21 Art Store</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/register.css">
</head>

<body>
<!--//登录界面头部，有购物logo和标语，并且提示绑定手机哈哈-->
<header>
    <div id="nav" class="fixed-top row navbar">
        <span class="navbar-text">
           <h1 id="logo">21 Art Store</h1>
       </span>
        <span>
          <ul>
              <li><a class="navbar-item" href="#" id="logout" onclick="logoutOrRegister()"><?=$logout?> </a></li>
              <li><a class="navbar-item" href="#" id="login" onclick="loginOrInformation()"><?=$userName?></a> </li>
              <li><a class="navbar-item" href="research.php">搜索</a></li>
              <li><a class="navbar-item" href="project2.php">首页</a></li>
          </ul>
       </span>
    </div>
</header>
    <p id="slogan">Shopping for love</p>
    <p id="advice">为确保您账户的安全及正常使用，
        依《网络安全法》相关要求，
        6月1日起会员账户需绑定手机。
        如您还未绑定，请尽快完成，感谢您的理解及支持！</p>

<!--//注册页面主要部分-->
<section>
<!--    //注册页面左部装饰转角度图片-->
    <div>
        <img src="../sucai/images/works/small/063020.jpg" id="imgOne">
        <img src="../sucai/images/works/small/063030.jpg" id="imgTwo">
        <img src="../sucai/images/works/small/063010.jpg" id="imgThree">
    </div>
<!--    //注册页面右部注册表单及注册按钮-->
    <form method="post" name="registerForm">
<!--        //注册框部分-->
        <span id="register">注册</span><br/><br/><br/>
        <div class="row">
            <p class="short">昵称</p>
            <input type="text" name="user" value=""placeholder="昵称" onchange="checkNIcheng()" id="nicheng">
            <p id="Cnicheng"></p>
            <br/>
        </div>
        <div class="row">
            <p class="short">密码</p>
            <input type="password" name="password" placeholder="密码" onchange="checkMima()" id="mima">
            <p id="Cmima"></p>
            <br/>
        </div>
        <div class="row">
            <p class="long">确认密码</p>
            <input type="password" name="conPassword" placeholder="确认密码" onchange="checkQue()" id="queren">
            <p id="Cqueren"></p>
            <br/>
        </div>
        <div class="row">
            <p class="short">电话</p>
            <input type="tel" name="tel" placeholder="电话" onchange="checkDian()"  id="dianhua">
            <p id="Cdianhua"></p>
            <br/>
        </div>
        <div class="row">
            <p class="short">邮箱</p>
            <input type="email" name="mail" placeholder="邮箱" onchange="checkMail()"  id="mail">
            <p id="Cmail"></p>
            <br/>
        </div>
        <div class="row">
            <p class="short">地址</p>
            <input type="text" name="addr" placeholder="地址（选填）" id="address" onchange="checkAddress()">
            <p id="Caddress"></p>
            <br/>
        </div>
        <br/>
        <button type="submit" id="register" onclick="return canRegister()">注册</button>

        <?php
        ?>
    </form>
</section>
</body>
<script src="../js/jquery-3.3.1.min.js"></script>
<script src="../js/project2.js"></script>
<script src="../js/register.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/popper.js/1.12.5/umd/popper.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</html>

<!--/**-->
<!-- * Created by PhpStorm.-->
<!-- * User: L2595-->
<!-- * Date: 2018/6/10-->
<!-- * Time: 16:30-->
<!-- */-->