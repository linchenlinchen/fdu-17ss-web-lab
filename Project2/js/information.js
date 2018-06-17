    function chongzhi() {
        $("#chong").toggle();
    }
    function sure() {
        let money = document.getElementById("recharge");
        let number = money.value;
        show("客官，你的钱钱我们给你管的好好的<br/>｡◕ᴗ◕｡");
        let b=parseInt($("#recharge").val());
        let a=parseInt($('#fund span').text());
        let c=(a+b).toString();
        $("#fund span").text(a+b);

        $.ajax({
            url:"forAddBalance.php",
            data:{"money":number,"userID":document.getElementById("head").name},
            type:"get",
            success(msg){
            }
        })
    }

