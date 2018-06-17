//下方的最新艺术品区域图片在移入鼠标后放大（由于历史原因，没有改变叫workHot的类名）
$(document).ready(function () {
    $(".workHot").mouseover(function () {
       $(this).animate({
            height:'12em',
            width:'10em',
        },100)
    })

});

//下方的最新艺术品区域图片在移除鼠标后变回原样（由于历史原因，没有改变叫workHot的类名）
$(document).ready(function () {
    $(".workHot").mouseout(function () {
        $(this).animate({
            height: '10em',
            width: '8em',
        },100)
    })
});

//根据用户的登录与否判断点击 登录/用户名 分布跳转到不同页面
function loginOrInformation() {
    if(document.getElementById("login").innerText=="登录"){
        window.location.href="login.php";
    }
    else {
        window.location.href="information.php"
    }
}

//根据导航栏的 注册/登出 来判断是否能让用户进入购物车页面
function cartOrNot() {
    if(document.getElementById("logout").innerText=="注册"){
        show("客官，请先登录才能查看购物车哟<br/>(＾Ｕ＾)ノ~ＹＯ")
    }
    else {
        window.location.href = "cart.php";
    }
}

////根据导航栏的 注册/登出 来判断让用户进入注册页面还是登出返回首页
function  logoutOrRegister() {
    if(document.getElementById("logout").innerText=="注册"){
        window.location.href="register.php";

    }
    else {
        window.location.href="project2.php?login=false";
    }
}

//用jquey的ui框架做的通用的信息提示
function show(information) {
    $("#dialog h4").html(information);
    $("#dialog").dialog({
        height:200,
        width:300,
        show:{
            effect:"blind",
            duration:500
        },
        hide:{
            effect:"slide",
            duration:500
        }
    },"draggable");
}

//给forSearch.php传值来判断给按钮的显示文字和功能
function addOrNot() {
    $.ajax({
        url:"forSearch.php",
        //我在详情页面端把图片的name设置成了商品id了
        data:{"artworkID":document.getElementById("small").name,"userID":document.getElementById("head").name},
        type:"get",
        success(msg){
            alert(msg);
            if(msg == "add"){
                changeButtonWords("已加入购物车");
                show("客官，这个宝贝已经在您的购物车咯<br/>（づ￣3￣）づ╭❤～");
            }
            else if(msg == "sell"){
                changeButtonWords("已售出");
                show("客官，这个宝贝被别人拿走了，再找一个吧<br/>(╥╯^╰╥)");
            }
        }
    });
}
//被 addOrNot方法调用为按钮 “加入购物车” 改显示的文字
function changeButtonWords(words) {
    document.getElementById("toCart").innerHTML = words;
}

//被按钮调用根据情况处理判断
function addToCartOrNot() {
    if(document.getElementById("logout").innerText=="注册"){
        show("客官，要先登录才能把小可爱加入购物车呢<br/>(✺ω✺)");
    }
    else {
        addOrNot();
    }
}

// function addFootprint(url) {
//     $.ajax({
//         url:url,
//         data:{"objects":document.getElementsByClassName("road")},
//         type:"get",
//         success(msg){
//
//         }
//     })
// }
// function dealImgSrc1() {
//     window.location.href="detail.php?href="+document.getElementById("bg").src;
// }
// function getImgSrc2() {
//     $.ajax({
//         url:"project2.php",
//         data:{"src":document.getElementById("bg1").src},
//         type:"get",
//         success(msg){
//
//         }
//     })
//    // return document.getElementById("bg1").src;
// }

//自动画廊
// function autoChangePicRight(src1,src2,src3,src4,src5,des1,des2,des3,des4,des5) {
//     setTimeout(changePicRight(src1,src2,src3,src4,src5,des1,des2,des3,des4,des5), 7000);
// }
//
// function changePicRight(src1,src2,src3,src4,src5,des1,des2,des3,des4,des5) {
//     let picture=[src1,src2,src3,src4,src5];
//     let descriptions = [des1,des2,des3,des4,des5];
//     $(document).ready(function () {
//         $("#bg").animate({left:'1270px'},5000);
//         $("#bg1").animate({left:'0px'},{
//             duration:5000,
//             complete:function () {
//                 if(index<3) {
//                     index=index+1;
//                 }
//                 else {
//                     index = -1;
//                 }
//                 $("#bg").css("left","-1270px");
//                 $("#bg").attr({"id":"temp","src":picture[index+1],"left":"-1270px"});
//                 $("#bg1").attr("id","bg");
//                 $("#temp").attr("id","bg1");
//                 document.getElementById("description").innerHTML = descriptions[index+1];
//                 setTimeout(changePicRight(src1,src2,src3,src4,src5,des1,des2,des3,des4,des5), 2000);
//             }
//         })
//     });
// }