function tipUserEmpty() {
    let x=document.getElementById("user");
    let y=document.getElementById("pass");
    let a=document.getElementById("tipUser");
    let b=document.getElementById("tipPassword");
    if(x.value== ""){
        a.innerHTML="！用户名不能为空";
        b.innerHTML="";
    }
    else if(y.value==""){
        a.innerHTML="";
        b.innerHTML="！密码不能为空";
    }else{
        a.innerHTML="";
        b.innerHTML="";
    }
    if(a.innerHTML == "" && b.innerHTML == ""){
        return true;
    }
    else {
        return false;
    }
}
// function show(information) {
//     $("#dialog h4").html(information);
//     $("#dialog").dialog({
//         height:200,
//         width:300,
//         show:{
//             effect:"blind",
//             duration:500
//         },
//         hide:{
//             effect:"slide",
//             duration:500
//         }
//     },"draggable");
// }