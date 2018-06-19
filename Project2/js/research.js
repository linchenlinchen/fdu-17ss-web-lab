function price() {
    // alert(1);
    let divTestJQ = $("#secThree"); //取得容器对象
    let divJQ = $(">div.block", divTestJQ); //取容器需要重排的对象
    let EntityList = []; //定义一个数组用于存放要排序的对象
    divJQ.each(function () {
        let thisJQ = $(this);
        EntityList.push({Name: parseInt(thisJQ.attr("title"), 10), JQ: thisJQ}); //把要排序的对象和排序的值一起放到一个新的对象里，并存入到数组
    });
    EntityList.sort(function (a, b) { //利用数组的排序方法重新排序对象
        return a.Name - b.Name; //从小到大
    });
    for (let i = 0; i < EntityList.length; i++) {
        EntityList[i].JQ.appendTo(divTestJQ); //把排序完的对象重新插入到容器对象
    }
}
function view(){
    // alert(2);
    let divTestJQ = $("#secThree"); //取得容器对象
    let divJQ = $(">div.block", divTestJQ); //取容器需要重排的对象
    let EntityList = []; //定义一个数组用于存放要排序的对象
    divJQ.each(function () {
        let thisJQ = $(this);
        EntityList.push({Name: parseInt(thisJQ.attr("name"), 10), JQ: thisJQ}); //把要排序的对象和排序的值一起放到一个新的对象里，并存入到数组
    });
    EntityList.sort(function (a, b) { //利用数组的排序方法重新排序对象
        return b.Name - a.Name; //从大到小
        // return a.Name - b.Name; //从小到大
    });
    for (let i = 0; i < EntityList.length; i++) {
        EntityList[i].JQ.appendTo(divTestJQ); //把排序完的对象重新插入到容器对象
    }
}

document.onload=function () {

}

function showSix(page) {

    let number = document.getElementsByClassName("block").length;
    for(let i= 0;i<6 * (page - 1);i++){
        $(".block")[i].css("display","hidden");
    }
    for (let j = 6 * page;j< number;j++){
        $(".block")[j].css("display","hidden");
    }
    for (let m=6 * (page - 1);m < 6 * page;m++){
        $(".block")[j].css("display","block");
    }
}

function changeWorks() {
    let artist = document.getElementsByName("authors")[0].value;
    // alert(artist);
    $.ajax({
        url:"forResearch.php",
        data:{"artist":artist},
        type:"get",
        success(msg){
            // alert(msg);
            // alert(document.getElementById("works").childNodes.length);
            var titles = msg.split("???");
            var length = titles.length;
            var list = document.getElementById("works");
            var oldNum =  list.childNodes.length;
            for (let i = 0; i < oldNum; i++) {
                list.removeChild(list.childNodes[0]);
            }
            for (let i = 0; i < length; i++) {
                var node = document.createElement("option");
                var textNode =document.createTextNode("艺术品名");
                if(i!=0) {
                    textNode = document.createTextNode(titles[i]);
                }
                node.appendChild(textNode);
                document.getElementsByName("works")[0].appendChild(node);
                //加块
                // var block = document.createElement("div");
                // var secOne = document.createElement("div");
                //
                // document.getElementById("secThree");
            }


        }
    })
}

document.ready=function(){
    changePageTo(1);
};

function changePageTo(page) {
    $.ajax({
        url:"research.php",
        data:{"page":page,"research":document.getElementById("research").value,"authors":document.getElementById("authors").value,
                "works":document.getElementById("works").value},
        type:"get",
        success(msg){
            let html = msg.split("???");
            localStorage.setItem('number',html[0]);
            alert(html[0]);
            $("#secThree").html(html[1]);
        }
    });
    return false;
}

function nextPage() {
    if((document.getElementById("current").innerText) + 1<parseInt(localStorage.getItem('number') / 6 + 1)) {
        changePageTo(parseInt(document.getElementById("current").innerText) + 1);
        let page = parseInt(document.getElementById("current").innerText) + 1;
        document.getElementById("current").innerText = page.toString();
    }
    else {
        show("客官，没有下一页了呢<br/>Σ(っ°Д°;)っ")
    }
}
function lastPage() {
    if(parseInt(document.getElementById("current").innerText)>1){
        changePageTo(parseInt(document.getElementById("current").innerText) - 1);
        let page = parseInt(document.getElementById("current").innerText) - 1;
        document.getElementById("current").innerText = page.toString();
    }
}
function turnHead() {
    changePageTo(1);
    document.getElementById("current").innerText = '1';
}
function turnTail() {
    let tail = 0;
    if(parseInt(localStorage.getItem('number')%6)==0) {
        tail = parseInt(localStorage.getItem('number') / 6);
    }
    else {
        tail = parseInt(localStorage.getItem('number') / 6)+1;
    }
    changePageTo(tail);
    document.getElementById("current").innerText = tail.toString();
}
// function hold() {
//     let work = document.getElementById("works").value;
//     $.ajax({
//         url:"research.php",
//         data:{"work":work},
//         type:"get",
//         success(msg){
//
//         }
//     })
// }

// <!--//        $goodBlock = "<div class='block'  name='$view' title='$prices' >-->
// <!--//                                <div class=\"divOne\">-->
// <!--//                                    <span><img src=\"$href\"></span>-->
// <!--//                                    <span>-->
// <!--//                                            <h3>" . ($titleLen == 25 ? (substr($row1['title'], 0, 25) . "...") : $row1['title']) . "</h3><br/>-->
// <!--//                                            <p class='artist' name='$prices'>" . $row1['artist'] . "<br/>￥" . $row1['price'] . "</p>-->
// <!--//                                    </span>-->
// <!--//                                </div>-->
// <!--//                                <div class=\"divTwo\">-->
// <!--//                                    <p>" . substr($row1['description'], 0, strlen($row1['description']) > 300 ? 300 : strlen($row1['description'])) . "..." . "</p>-->
// <!--//                                </div>-->
// <!--//                                <div class='divAdd'>-->
// <!--//                                  <p class='checkP'><a href='detail.php?href=$href' class='check'>查看</a></p>-->
// <!--//                                 <p class='hotP'><a href='#' class='hot'>热度".$row1['view']."</a></p>-->
// <!--//                                </div>-->
// <!--//                            </div>";-->