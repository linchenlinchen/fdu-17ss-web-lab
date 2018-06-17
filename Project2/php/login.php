
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
if($_SERVER["REQUEST_METHOD"] == 'POST'){
    if (isset($_POST["user"])) {
        $name = $_POST['user'];
        $password = $_POST['password'];
        $users = $db->query("SELECT name From users WHERE name ='$name' AND password ='$password'");
        $matchNum = count($users->fetchAll());
        if ($matchNum > 0) {
            $login = true;
            $_SESSION["login"] = true;
            $_SESSION["userName"] = $_POST['user'];
            header("Location:project2.php?login=true");
            exit();
        } else {
            $login = false;
        }
    }
}

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>21 Art Store</title>
    <script src="../js/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/login.css">
</head>
<body>
<div class="alert alert-success alert-dismissable fade show">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>客官!</strong>您输入信息有问题哦╰(￣ω￣ｏ)。
</div>
<header>
    <div id="nav" class="fixed-top row navbar">
        <span class="navbar-text">
           <h1 id="logo">21 Art Store</h1>
       </span>
        <span>
          <ul>
              <li><a class="navbar-item" href="#" id="logout" onclick="logoutOrRegister()"><?=$logout?> </a></li>
              <li><a class="navbar-item" href="#" id="login" onclick="loginOrInformation()"><?=$userName?></a> </li>
              <li><a class="navbar-item" href="research.php">搜索 </a></li>
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
<section>
    <div>
        <img src="../sucai/images/works/small/063020.jpg" id="imgOne">
        <img src="../sucai/images/works/small/063030.jpg" id="imgTwo">
        <img src="../sucai/images/works/small/063010.jpg" id="imgThree">
    </div>
    <form method="post" name="loginForm" action="login.php">
        <span>密码登录</span>
        <div>
            <p>Your name:</p>
            <img src="../sucai/images/icon/user.png">
            <input type="text" name="user" value="" placeholder="用户名/账号" id="user">
            <p id="tipUser"><?php
                if(isset($login) && $login===false){
                    echo "用户不存在或密码错误";
                }else{
                    echo "";
                }
                ?></p>
        </div>
        <div>
            <br/><br/><br/>
            <p>Your password:</p>
            <img src="../sucai/images/icon/lock.png">
            <input type="password" placeholder="密码" id="pass" name="password">
            <p id="tipPass"></p>
        </div>
        <br/><br/><br/>

        <button type="submit" onclick="return tipUserEmpty()">登录</button>

    </form>
</section>
<script src="../js/login.js"></script>
<script src="../js/project2.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/popper.js/1.12.5/umd/popper.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</body>
</html>

<!--加入提示框告诉和用户问好或者慢走-->
<?php if(isset($login) && !$login)
    print "<style>
.alert{
display: block;
}
</style>";?>