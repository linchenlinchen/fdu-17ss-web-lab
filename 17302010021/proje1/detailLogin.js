function addToCart() {
    alert("已成功加入购物车！");
}
function addToWish() {
    alert("已成功加入意愿清单！");
}


//页面加载完毕后执行
window.onload = function () {
    //找六个个元素：demo，smallBox,foatBox,mark,bigfloatBox,imgs,
    var objDemo=document.getElementById("demo");
    var objSmallBox=document.getElementById("small-box");
    var objMarkBox=document.getElementById("mark");
    var objFloatBox=document.getElementById("float-box");
    var objBigBox=document.getElementById("big-box");
    var objBigBoxImg = objBigBox.getElementsByTagName("img")[0];

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
        var _event=ev||window.event;//做兼容性，兼容IE
        //1计算值：
        var left=_event.pageX-objDemo.offsetLeft-objSmallBox.offsetLeft-objFloatBox.offsetWidth/2;
        var top=_event.pageY-objDemo.offsetTop-objSmallBox.offsetTop-objFloatBox.offsetHeight/2;

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
        var percentX=left/(objMarkBox.offsetWidth-objFloatBox.offsetWidth);
        var percentY=top/(objMarkBox.offsetHeight-objFloatBox.offsetHeight);

        //4利用这个比例计算距离后赋值给右侧的图片
        objBigBoxImg.style.left=-percentX*(objBigBoxImg.offsetWidth-objBigBox.offsetWidth)+"px";
        objBigBoxImg.style.top=-percentY*(objBigBoxImg.offsetHeight-objBigBox.offsetHeight)+"px";
    }

};

//页面加载完毕后执行
// window.onload = function () {
//     //找六个个元素：demo，smallBox,foatBox,mark,bigfloatBox,imgs,
//     var objDemo=$("#demo").eq(0);
//     var objSmallBox=$("#small-box").eq(0);//展示图的小盒子
//     var objMarkBox=$("#mark").eq(0);
//     var objFloatBox=$("#float-box").eq(0);
//     var objBigBox=$("#big-box").eq(0);
//     var objBigBoxImg=$("#big-box").find("img").eq(0);
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
