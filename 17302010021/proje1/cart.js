var a=new Array();
b=0;
function togg() {
    $("#form3").toggle();
}

$(document).ready(function () {
    $(".delete").click(function () {
        $(this).parents(".good").css("display","none");
        alert("成功删除");
        a[b]=$(this).parents(".good").attr("id");
        b++;
        var templ0= a[b-1];
        var templ1="#"+templ0+" h3";
        if($("#close").innerHTML!="最近有一删除:") {
            var tex=$(templ1).text();
            var t = "<div><a onclick='back()' id='close'>" + "最近有一删除:"+tex+ "</a></div>";
            $("main").after(t).css("float", "left");
        }
    });
});
function back() {
    if(b>0) {
        var templ2 = a[b-1];
        var templ3="#"+templ2;
        $(templ3).css("display", "block");
        $("#close").remove();
        b--;
    }
}




