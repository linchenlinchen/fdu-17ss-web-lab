function checkNIcheng() {
    var x=document.getElementById("nicheng");
    // this two line and the relative else if is get from the internet,idont know why
    var reg=/^[a-zA-Z]+$/;
    var str = document.getElementById("nicheng").value;
    if(x.value==""){
        document.getElementById("Cnicheng").innerHTML="！昵称不能为空";
    }
    else if(x.value.length<6){
        document.getElementById("Cnicheng").innerHTML="！昵称至少有六位,例如:abc123";
    }
    else if(!isNaN(x.value)){
        document.getElementById("Cnicheng").innerHTML="！昵称不能全为数字,例如:abc123";
    }
    else if(reg.test(str)){
        document.getElementById("Cnicheng").innerHTML="！昵称不能全为字母,例如:abc123";
    }
    else{
        document.getElementById("Cnicheng").innerHTML="";
    }
}
function checkMima() {
    var x=document.getElementById("mima");
    var y=document.getElementById("nicheng");
    if(x.value==""){
        document.getElementById("Cmima").innerHTML="！密码不能为空";
    }
    else if(x.value.length<6){
        document.getElementById("Cmima").innerHTML="！密码至少有六位,例如:123456";
    }
    else if(x.value==y.value){
        document.getElementById("Cmima").innerHTML="！密码不能与用户名相同,如不可同为abc123";
    }
    else {
        document.getElementById("Cmima").innerHTML="";
    }

}
function checkQue() {
    var x=document.getElementById("mima");
    var y=document.getElementById("queren");
    if(y.value==""){
        document.getElementById("Cqueren").innerHTML="！确认密码不能为空";
    }
    else if(x.value!=y.value){
        document.getElementById("Cqueren").innerHTML="！两次密码不一致";
    }
    else {
        document.getElementById("Cqueren").innerHTML="";
    }
}
function checkDian() {
    var x=document.getElementById("dianhua");
    if(x.value.length!=11){
        document.getElementById("Cdianhua").innerHTML="！请输入合法电话,例如:13321331333";
    }
    else if(isNaN(x.value)){
        document.getElementById("Cdianhua").innerHTML="！电话不能含非数字";
    }
    else if(x.value==""){
        document.getElementById("Cdianhua").innerHTML="";
    }
    else {
        document.getElementById("Cdianhua").innerHTML="";
    }
}
function canRegister() {

    var x=document.getElementById("Cnicheng");
    var y=document.getElementById("Cmima");
    var a=document.getElementById("Cqueren");
    var b=document.getElementById("Cdianhua");
    var x1=document.getElementById("nicheng");
    var y1=document.getElementById("mima");
    var a1=document.getElementById("queren");
    var b1=document.getElementById("dianhua");
    var c=x.innerHTML==""&&y.innerHTML==""&& a.innerHTML==""&&b.innerHTML=="";
    var c1=x1.value!=""&&y1.value!=""&&a1.value!=""&&b1.value!="";
    if(c==true&&c1==true&&x1.value!="林晨林晨林晨"){
        alert("注册成功，现在请你登录本网站");
        window.location.href="login.html";
    }
    else if(x1.value=="林晨林晨林晨"){
        alert("注册失败,该用户已存在！")
    }
    else {
        checkNIcheng() ;
        checkMima();
        checkQue();
        checkDian();
        alert("注册失败，请按照要求填写信息！")
    }
}