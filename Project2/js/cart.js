function togg() {
    $("#form4").hide();
    $("#form3").toggle();
}
function toggle() {
    $("#form3").hide();
    $("#form4").toggle();
}

$(document).ready(function () {
    $(".delete").click(function () {
        let t = $(this).parents(".good")[0].id;
        $.ajax({
            url:"forDelete.php",
            data:{"artworkID":$(this).parents(".good").find("img")[0].name,"userID":document.getElementById("head").name},
            type:"get",
            success(msg){
                if(msg == "delete"){
                    show("客官，宝贝已经移出购物车啦啦啦<br/>(～￣▽￣)～");
                    var parent = document.getElementById("divThree");
                    var children = document.getElementById(t);
                    parent.removeChild(children);
                }
            }
        })
    });

    // $.ajax({
    //
    // })
});

function account() {
    alert((document.getElementById("head").name),(document.getElementsByClassName("money")[0].id));
    $.ajax({
        url:"forAccount.php",
        data:{"userID":document.getElementById("head").name,"account":document.getElementsByClassName("money")[0].id},
        type:"get",
        success(msg){
            alert(msg);
            if(msg == "enough"){
                show("客官，这个宝贝已经乖乖地躺着等你了<br>(◕ᴗ◕✿)");
                window.location.href="cart.php";
            }
            else if(msg == "notEnough"){
                show("客官，您的钱袋不够鼓哦<br/>⁄(⁄⁄•⁄ω⁄•⁄⁄)⁄");
            }
        }
    })
}





