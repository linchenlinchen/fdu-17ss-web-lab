var sort=$('input[name="sort"]').val();
if(sort=='1'){
    alert(1);
    $(function () {
        var divTestJQ = $("#secThree"); //取得容器对象
        var divJQ = $(">div.block", divTestJQ); //取容器需要重排的对象
        var EntityList = []; //定义一个数组用于存放要排序的对象
        divJQ.each(function () {
            var thisJQ = $(this);
            EntityList.push({Name: parseInt(thisJQ.attr("name"), 10), JQ: thisJQ}); //把要排序的对象和排序的值一起放到一个新的对象里，并存入到数组
        });
        EntityList.sort(function (a, b) { //利用数组的排序方法重新排序对象
            // return b.Name - a.Name; //从大到小
            return a.Name - b.Name; //从小到大
        });
        for (var i = 0; i < EntityList.length; i++) {
            EntityList[i].JQ.appendTo(divTestJQ); //把排序完的对象重新插入到容器对象
        }
    })
}
else {
    $(function () {
        var divTestJQ = $("#secThree"); //取得容器对象
        var divJQ = $(">div.block", divTestJQ); //取容器需要重排的对象
        var EntityList = []; //定义一个数组用于存放要排序的对象
        divJQ.each(function () {
            var thisJQ = $(this);
            EntityList.push({Name: parseInt(thisJQ.attr("name"), 10), JQ: thisJQ}); //把要排序的对象和排序的值一起放到一个新的对象里，并存入到数组
        });
        EntityList.sort(function (a, b) { //利用数组的排序方法重新排序对象
            return b.Name - a.Name; //从大到小
            // return a.Name - b.Name; //从小到大
        });
        for (var i = 0; i < EntityList.length; i++) {
            EntityList[i].JQ.appendTo(divTestJQ); //把排序完的对象重新插入到容器对象
        }
    })
}