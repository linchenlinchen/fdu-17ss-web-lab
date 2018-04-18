
var picture=["sucai/images/works/large/063010.jpg","sucai/images/works/large/063030.jpg",
    "sucai/images/works/large/134040.jpg","sucai/images/works/large/140030.jpg","sucai/images/works/large/118060.jpg"]
var index=0;
var bg1_flag = 0;
var bg_flag = 0;

$(document).ready(function () {
    $(".workHot").mouseover(function () {
       $(this).animate({
            height:'12em',
            width:'10em',
        },100)
    })

})
$(document).ready(function () {
    $(".workHot").mouseout(function () {
        $(this).animate({
            height: '10em',
            width: '8em',
        },100)
    })
})
$(document).ready(function () {
    $("#learnMore").mouseover(function () {
        $("#learnMore p").css("fontSize","23px");
    });
    $("#learnMore").mouseout(function () {
        $("#learnMore p").css("fontSize","20px");
    })
});

function present1() {
    $("#form").toggle();
}
function present2() {
    $("#form1").toggle();
}
//     var curIndex = 0;
// //时间间隔(单位毫秒)，每秒钟显示一张，数组共有3张图片放在img文件夹下。
//     var timeInterval = 1000;
// //定义一个存放照片位置的数组，可以放任意个，在这里放3个
//     var arr = new Array();
//     arr[0] = "sucai/images/works/large/095010.jpg";
//     arr[1] = "sucai/images/works/large/096010.jpg";
//     arr[2] = "sucai/images/works/large/104030.jpg";
//     setInterval(changeImg, timeInterval);
//
//     function changeImg() {
//         //获得id名为d1的对象
//         var obj = document.getElementById("d1");
//         if (curIndex == arr.length - 1) {
//             curIndex = 0;
//         } else {
//             curIndex += 1;
//         }
//         //设置d1的背景图片
//         obj.style.backgroundImage = "URL(" + arr[curIndex] + ")";       //显示对应的图片
//     }
// }

// var imgSrcs = ["sucai/images/works/large/063010.jpg",
//     "sucai/images/works/large/063030.jpg",
//     "sucai/images/works/large/134040.jpg"];
// setInterval(function() {
//     $(".header").css("background", "url(" + imgSrcs[imgSrcs.push(imgSrcs.shift())-1] + ")");
//     }, 3000);


// $(".header").animate({"background-image"},5000,setInterval(function() {
//     $(".header").css("background", "url(" + imgSrcs[imgSrcs.push(imgSrcs.shift())-1] + ")");
// }, 3000);)
// function switchbox(a) {
//     a == 1 ? $(".slide.slide3 .arrowcontainer").show() : $(".slide.slide3 .arrowcontainer").hide(),
//         $(".slide.slide3").removeClass("s1").removeClass("s2").removeClass("s3").removeClass("s4").removeClass("s5"),
//         $(".slide.slide3").addClass("s" + a),
//         $(".slide.slide3 .img" + a).addClass("selected"),
//         $(".slide.slide3 .content").hide(),
//         $(".slide.slide3 .content.content" + a).show(),
//         $(".slide.slide3 .bgimg").remove()
// }


// $(document).ready(function(){
//     $(".header").mkinfinite({
//         maxZoom:       1.4,
//         animationTime: 4000,
//         imagesRatio:   (960 / 720),
//         isFixedBG:     true,
//         zoomIn:        true,
//         imagesList:    new Array(
//             'sucai/images/works/large/063010.jpg',
//             'sucai/images/works/large/063030.jpg',
//             'sucai/images/works/large/134040.jpg',
//         )
//     });
// });
$(document).ready(function () {
    $(".turn").hide();
})
$(document).ready(function () {
    $(".header").mouseover(function () {
        $(".turn").show();
    })
})
$(document).ready(function () {
    $(".header").mouseout(function () {
        $(".turn").hide();
    })
})

function autoChangePicRight() {
        setTimeout(changePicRight, 7000);
}
function changePicRight() {
    $(document).ready(function () {
        $("#bg").animate({left:'1270px'},5000)
        $("#bg1").animate({left:'0px'},{
            duration:5000,
            complete:function () {
                if(index<3) {
                    index=index+1;
                }
                else {
                    index = -1;
                }
                $("#bg").css("left","-1270px");
                $("#bg").attr({"id":"temp","src":picture[index+1],"left":"-1270px"});
                $("#bg1").attr("id","bg");
                $("#temp").attr("id","bg1");
                setTimeout(changePicRight, 2000);
            }
        })
    });
}



// $(document).ready(function () {
//     $("#bg").animate({left:'1270px'},5000)
//     $("#bg1").animate({left:'0px'},{
//         duration:5000,
//         complete:function(){
//             $("#bg").attr("src",$("#bg1").attr("src")).css("left","0px");
//         }
//     })
// });