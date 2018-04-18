function tipUserEmpty() {
    var x=document.getElementById("user");
    var y=document.getElementById("pass");
    if(x.value== ""){
        document.getElementById("tipUser").innerHTML="！用户名不能为空";
        document.getElementById("tipPass").innerHTML="";
    }
    else if(x.value=="zhang"){
        document.getElementById("tipUser").innerHTML="！用户名不存在";
        document.getElementById("tipPass").innerHTML="";
    }
    else if(y.value==""){
        document.getElementById("tipUser").innerHTML="";
        document.getElementById("tipPass").innerHTML="！密码不能为空";
    }
    else if(y.value=="123456"){
        document.getElementById("tipUser").innerHTML="";
        document.getElementById("tipPass").innerHTML="！密码错误";
    }
    else {
        window.location.href="pj1Login.html";
        alert("登录成功！")
    }
}