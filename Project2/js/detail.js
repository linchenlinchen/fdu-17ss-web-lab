
function togg() {
    $("#form3").toggle();
}
function hi() {
    $("#form3").hide();
}
function toggle() {
    $("#form4").toggle();
}
function hide() {
    $("#form4").hide();
}
//页面加载完毕后执行
window.onload = function () {
    //根据情况改变按钮的内容
    $.ajax({
        url:"forSellAndAdd.php",
        //我在详情页面端把图片的name设置成了商品id了
        data:{"artworkID":document.getElementById("small").name,"userID":document.getElementById("head").name},
        type:"get",
        success(msg){
            // alert(msg);
            if(msg == "add"){
                changeButtonWords("已加入购物车");
            }
            else if(msg == "sell"){
                changeButtonWords("已售出");
            }
        }
    });
    //设置点击事件
    document.getElementById("toCart").onclick = function () {
        addToCartOrNot();
    };
    //找六个个元素：demo，smallBox,foatBox,mark,bigfloatBox,imgs,
    let objDemo=document.getElementById("demo");
    let objSmallBox=document.getElementById("small-box");
    let objMarkBox=document.getElementById("mark");
    let objFloatBox=document.getElementById("float-box");
    let objBigBox=document.getElementById("big-box");
    let objBigBoxImg = objBigBox.getElementsByTagName("img")[0];

    //给小盒子添加事件，移入和移出
    //移入：浮动的box和和bigBox显示
    objSmallBox.onmouseover=function(){
        objFloatBox.style.display="block";
        objBigBox.style.display="block";
    }
    //移除：浮动的box和bigBox隐藏
    objSmallBox.onmouseout=function(){
        objFloatBox.style.display="none";
        objBigBox.style.display="none";
    }

    //给小盒子添加鼠标移动事件
    objMarkBox.onmousemove=function(ev){
        let _event=ev||window.event;//做兼容性，兼容IE
        //1计算值：
        let left=_event.pageX-objDemo.offsetLeft-objSmallBox.offsetLeft-objFloatBox.offsetWidth/2;
        let top=_event.pageY-objDemo.offsetTop-objSmallBox.offsetTop-objFloatBox.offsetHeight/2;

        //5.优化，在前面加判断,不让其溢出，加判断
        if(left<0) left=0;
        if(top<0) top=0;
        if(left>objSmallBox.offsetWidth-objFloatBox.offsetWidth)
            left=objSmallBox.offsetWidth-objFloatBox.offsetWidth;
        if(top>objSmallBox.offsetHeight-objFloatBox.offsetHeight -4)
            top=objSmallBox.offsetHeight-objFloatBox.offsetHeight -4;

        //2把值赋值给放大镜
        objFloatBox.style.left=left+"px";
        objFloatBox.style.top=top+"px";

        //3计算比例
        let percentX=left/(objMarkBox.offsetWidth-objFloatBox.offsetWidth);
        let percentY=top/(objMarkBox.offsetHeight-objFloatBox.offsetHeight);

        //4利用这个比例计算距离后赋值给右侧的图片
        objBigBoxImg.style.left=-percentX*(objBigBoxImg.offsetWidth-objBigBox.offsetWidth)+"px";
        objBigBoxImg.style.top=-percentY*(objBigBoxImg.offsetHeight-objBigBox.offsetHeight)+"px";
    }

};




















//页面加载完毕后执行
// window.onload = function () {
//     //找六个个元素：demo，smallBox,foatBox,mark,bigfloatBox,imgs,
//     let objDemo=$("#demo").eq(0);
//     let objSmallBox=$("#small-box").eq(0);//展示图的小盒子
//     let objMarkBox=$("#mark").eq(0);
//     let objFloatBox=$("#float-box").eq(0);
//     let objBigBox=$("#big-box").eq(0);
//     let objBigBoxImg=$("#big-box").find("img").eq(0);
//
//     //给小盒子添加事件，移入和移出
//     //移入：浮动的box和和bigBox显示
//     objSmallBox.mouseover(function(){
//         objFloatBox.css("display","block");
//         objBigBox.css("display","block");
//     });
//     //移除：浮动的box和bigBox隐藏
//     objSmallBox.mouseout(function(){
//         objFloatBox.css("display","none");
//         objBigBox.css("display","none");
//     });
//
//     //给小盒子添加鼠标移动事件
//     objMarkBox.mousemove(function(ev){
//         var _event=ev||window.event;//做兼容性，兼容IE
//         //1计算值：
//         var left=_event.pageX-objSmallBox.offset().left-objFloatBox.width()/2;
//         var top=_event.pageY-objSmallBox.offset().top-objFloatBox.height()/2;
//
//         //5.优化，在前面加判断,不让其溢出，加判断
//         if(left<0) left=0;
//         if(top<0) top=0;
//         if(left > objSmallBox.offset().left-objFloatBox.offset().width + 80)
//             left = objSmallBox.offset().left-objFloatBox.offset().width + 80;
//         if(top>objSmallBox.offset().top-objFloatBox.offset().height - 20)
//             top=objSmallBox.offset().top-objFloatBox.offset().height - 20;
//
//         //2把值赋值给放大镜
//         objFloatBox.css("left", left);
//         objFloatBox.css("top", top);
//         // // //3计算比例
//         var percentX=left/(objMarkBox.offsetWidth-objFloatBox.offsetWidth);
//         var percentY=top/(objMarkBox.offsetHeight-objFloatBox.offsetHeight);
//         //
//         // //4利用这个比例计算距离后赋值给右侧的图片
//         objBigBoxImg.style.left=-percentX*(objBigBoxImg.offsetWidth-objBigBox.offsetWidth)+"px";
//         objBigBoxImg.style.top=-percentY*(objBigBoxImg.offsetHeight-objBigBox.offsetHeight)+"px";
//     });
//
// };6
