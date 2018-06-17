//检查昵称即用户名的合法性
function checkNIcheng() {
    let x=document.getElementById("nicheng");
    // this two line and the relative else if is get from the internet,i don't know why
    let reg=/^[a-zA-Z]+$/;
    let str = document.getElementById("nicheng").value;
    if(x.value==""){
        document.getElementById("Cnicheng").innerHTML="！昵称不能为空";
    }
    else if(x.value.length<6){
        document.getElementById("Cnicheng").innerHTML="！昵称至少有六位";
    }
    else if(!isNaN(x.value)){
        document.getElementById("Cnicheng").innerHTML="！昵称不能全为数字";
    }
    else if(reg.test(str)){
        document.getElementById("Cnicheng").innerHTML="！昵称不能全为字母";
    }
    else{
        document.getElementById("Cnicheng").innerHTML="";
    }
    $.ajax({
        url:"register.php",
        data:{"name":str},
        type:"get",
        success(msg){
            // console.log(msg);
            if(parseInt(msg)==0){
                document.getElementById("Cnicheng").innerHTML="!用户名已存在";
            }
        }
    });
}
//检查密码的合法性
function checkMima() {
    let x=document.getElementById("mima");
    if(x.value==""){
        document.getElementById("Cmima").innerHTML="！密码不能为空";
    }
    else if(x.value.length<6){
        document.getElementById("Cmima").innerHTML="！密码至少有六位";
    }
    else if(!isNaN(x.value)){
        document.getElementById("Cmima").innerHTML="！密码不能全为数字";
    }
    else {
        document.getElementById("Cmima").innerHTML="";
    }
}
//检查确认密码的合法性
function checkQue() {
    let x=document.getElementById("mima");
    let y=document.getElementById("queren");
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
//检查电话的合法性
function checkDian() {
    let x=document.getElementById("dianhua");
    if(x.value.length!=11){
        document.getElementById("Cdianhua").innerHTML="！请输入合法电话";
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
//检查邮箱的合法性
function checkMail() {
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    let obj = document.getElementById("mail"); //要验证的对象
    if(!reg.test(obj.value)){ //正则验证不通过，格式不对
        document.getElementById("Cmail").innerHTML="!请输入正确格式邮箱！";
    }
    else if(obj.value == ''){
        document.getElementById("Cmail").innerHTML="!邮箱不能为空";
    }
    else {
        document.getElementById("Cmail").innerHTML="";
    }
}
//检查地址的合法性
function checkAddress() {
    let x = document.getElementById("address");
    if(x.value==""){
        document.getElementById("Caddress").innerHTML="！地址不能为空";
    }else {
        document.getElementById("Caddress").innerHTML="";
    }
}

//检查判断是否可以成功注册
function canRegister() {
    let x=document.getElementById("Cnicheng");
    let y=document.getElementById("Cmima");
    let a=document.getElementById("Cqueren");
    let b=document.getElementById("Cdianhua");
    let c=document.getElementById("Cmail");
    let d=document.getElementById("Caddress");
    let x1=document.getElementById("nicheng");
    let y1=document.getElementById("mima");
    let a1=document.getElementById("queren");
    let b1=document.getElementById("dianhua");
    let c1=document.getElementById("mail");
    let d1=document.getElementById("address");
    let e=x.innerHTML==""&&y.innerHTML==""&& a.innerHTML==""&&b.innerHTML==""&&c.innerHTML==""&&d.innerHTML=="";
    let e1=x1.value!=""&&y1.value!=""&&a1.value!=""&&b1.value!=""&&c1.value!=""&&d1.value!="";
    if(e==true&&e1==true){
        return true;
    }
    else {
        checkNIcheng();
        checkMima();
        checkQue();
        checkDian();
        checkMail();
        checkAddress();
        return false;
    }

}