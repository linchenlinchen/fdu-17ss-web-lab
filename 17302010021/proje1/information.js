    function chongzhi() {
        $("#chong").toggle();
    }
    function sure() {
        alert("恭喜你成功充值！");
        // var a=document.getElementById("fund");
        // document.getElementById("fund").innerHTML=a - "余额：￥" + (3000)
        var b=parseInt($("#recharge").val());
        var a=parseInt($('#fund span').text());
        var c=(a+b).toString();
        $("#fund span").text(a+b);
    }

