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
            // alert(html[0]);
            $("#secThree").html(html[1]);
        }
    });
    if(!isNaN(parseInt(localStorage.getItem('number')))){
        if(parseInt(localStorage.getItem('number')%6)==0){
            document.getElementById("totalPage").innerText=(parseInt(localStorage.getItem('number')/6)).toString();
        }
        else {
            document.getElementById("totalPage").innerText=(parseInt(localStorage.getItem('number')/6) + 1).toString();
        }
    }
    document.getElementById("current").innerText=page.toString();
    return false;
}

function nextPage() {
    if(parseInt(localStorage.getItem('number')%6)==0) {
        if((document.getElementById("current").innerText) <parseInt(localStorage.getItem('number') / 6 )) {
            changePageTo(parseInt(document.getElementById("current").innerText) + 1);
        }
        else {
            show("客官，没有下一页了呢<br/>Σ(っ°Д°;)っ")
        }
    }
    else {
        if((document.getElementById("current").innerText) <parseInt(localStorage.getItem('number') / 6 + 1)) {
            changePageTo(parseInt(document.getElementById("current").innerText) + 1);
        }
        else {
            show("客官，没有下一页了呢<br/>Σ(っ°Д°;)っ")
        }
    }


}
function lastPage() {
    if(parseInt(document.getElementById("current").innerText)>1){
        changePageTo(parseInt(document.getElementById("current").innerText) - 1);
    }
}
function turnHead() {
    changePageTo(1);
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
}

function directToPage() {
    let toPage = document.getElementById("toPage").value;
    let totalPage = parseInt(document.getElementById("totalPage").innerText);
    if(toPage>0&&toPage<=totalPage) {
        changePageTo(toPage)
    }
    else {
        show("客官，你这页数有点彪啊<br/>(*/ω＼*)")
    }
}