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

    function deleteArt(mythis){
        // alert($(mythis).parents("td").children("a")[0]);
        let src = ($(mythis).parents("td").children("a")[0]).toString().substring(56,$(mythis).parents("td").children("a")[0].length);
        // alert(src);
    var del = window.confirm("客官，你确定要删除这个艺术品吗？");
    if(del){
        $.ajax({
            url:"forDeleteArt.php",
            data:{"src":src},
            type:"get",
            success(msg){
                // alert(msg);
                if(msg == "sold"){
                    show("客官，这宝贝已经被人拿走了，删不了了<br/>(；´д｀)ゞ");
                }
                else {
                    show("客官，这个宝贝删除了<br/>(￣３￣)a ")
                }
            }
        })
    }
    else {

    }
    }

