let select = document.getElementsByTagName("select")[0];
let select2 = document.getElementsByTagName("select")[1];
let tables = [];
let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");
// switch (select.selectedIndex){
//     case 0:
// }
select.addEventListener("change",addAndDelete ,false);

//根据第一个选择框进行不同的操作功能设定
function addAndDelete() {
    switch (select.selectedIndex) {
        case 0:deleteSecond();break;
        case 1:deleteAndAppear();break;
        case 2:howToAddRow();break;
        case 3:addDeleteRowAndRemove();break;
        case 4:commitForDeleteTable();
    }
}

//第一部分开始
// part 1 for case 0 - 1
//在选择第一个选择框的第一个选项“SELECT ONE”的时候调用，删除页面的其他表单和表格元素
function deleteSecond() {
    document.getElementById("information").innerHTML = "";//将提示信息清空
    for (let i = 1, len = document.forms[0].elements.length; i < len; i++) {//清除form1下的所有除了选择框外的元素对象
        form1.removeChild(document.forms[0].elements[1]);
    }
    for (let i = 1, len = document.forms[1].elements.length; i < len; i++) {//清除form2下的所有除了选择框外的元素对象
        form2.removeChild(document.forms[1].elements[1]);
    }
}

//先按照deleteSecond删除form1和form2中的非选择框元素，然后加入可输入 表格名 和 输入数目 的input输入框
function deleteAndAppear() {
    document.getElementById("information").innerHTML = "";//将提示信息清空
    deleteSecond();
    appearSecond();
}

//创建 表格名 和 输入数目 的input输入框 appear the table when you choose the second one
function appearSecond() {
    //创建 表格名 输入框并加入form1
    let input1 = document.createElement("input");
    input1.id = "tableName";
    input1.type = "text";
    input1.placeholder = "Table Name";
    form1.appendChild(input1);

    //创建 输入数目 输入框并加入form1
    let number = document.createElement("input");
    number.id = "number";
    number.type = "number";
    number.placeholder = "Columns Numbers";
    form1.appendChild(number);

    //给 输入数目 输入框 添加一旦改变就产生相应数目 Attribut 输入框的事件
    number.addEventListener("change", addAttrInput, false);
}

//添加相应数目的需要输入的 Attribute 输入框 add the input about Attribute
function addAttrInput(ths = []){
    let numberOfAttr = document.getElementById("number").value;//获取 数目值
    addInputs(numberOfAttr,ths);//清除旧的 Attribute输入框 创建新的数目的并加入
    let commit = document.getElementsByTagName("button")[0];

    //如果原本有按钮扭了，就先去除（主要是避免在其他时候调用这个方法时 文档中没有按钮 导致 移除错误）
    if(commit) {
        form1.removeChild(commit);
    }
    addCommit();
}

//addAttrInput的辅助方法
function addInputs(number,ths = []){
    let attrs = document.getElementsByName("attr");
    for (let i = 0,len=attrs.length; i < len; i++) {//先将原先已经生成的相应数目的 Attribute 输入框清除
        form1.removeChild(attrs[0]);
    }

    //若输入值大于零，根据输入数字再生成相应输入框，并且将其placeholder设置为 相应table的ths数组的 内部内容，若无内容，则设为Attribute
    if(number>0) {
        for (let i = 0; i < number; i++) {
            let attr = document.createElement("input");
            attr.placeholder = ths[i]? ths[i].innerHTML : "Attribute";
            attr.type = "text";
            attr.name = "attr";
            form1.appendChild(attr);
        }
        let commit = document.getElementsByTagName("button")[0];

        //若commit按钮存在，则先移除原本这个带事件的按钮，加入一个纯净的无功能按钮
        if(commit) {
            form1.removeChild(commit);
            pureCommit();
        }
    }
}

//创建添加按钮并加入
function addCommit() {
    let commit = document.createElement("button");

    commit.type = "button";
    commit.innerText = "commit";
    form1.appendChild(commit);
    commit.removeEventListener("click",addAttrToTable,false);
    commit.removeEventListener("click",deleteRow,false);
    commit.addEventListener("click",updateForm2,false);
}


//update the table.First ,delete the used theads ,and then get the new number of theads and then apply it.
function updateForm2() {
    //移除表格
    if(form2.getElementsByTagName("table").length > 1) {
        form2.removeChild(form2.lastChild);
    }
    
    //根据 表格名 的输入框内容创建添加第二个选择框的新选项
    if(document.getElementById("tableName")) {
        let newOptionInformation = document.getElementById("tableName").value;
        let newOption = document.createElement("option");
        let selectBoxTwo = document.forms[1].elements[0];
        newOption.appendChild(document.createTextNode(newOptionInformation));
        newOption.value = setName(newOptionInformation);
        selectBoxTwo.appendChild(newOption);
        selectBoxTwo.options[selectBoxTwo.options.length - 1].selected = true;
    }
    
    let table = document.createElement("table");
    let numberOfAttr;
    if(document.getElementById("number")) {
        numberOfAttr = document.getElementById("number").value;
    }
    
    //创建添加表头
    for (let i = 0; i < numberOfAttr ; i++) {
        let thead = document.createElement("th");
        let attrs = document.getElementsByName("attr");
        if(attrs[i] != undefined) {
            if (attrs[i].value == "") {
                document.getElementById("information").innerHTML = "Tips : the table head cannot be empty!";
                return 0;
            }
            thead.appendChild(document.createTextNode(attrs[i].value));
        }
        table.appendChild(thead);
    }
    //加入表格数组
    tables[setName(document.getElementById("tableName").value)] = table;
    
    //如果原本form2下方正在显示一个表格，那么先清除
    if(document.getElementsByTagName("table")) {
        form2.removeChild(form2.lastChild);
    }
    form2.appendChild(table);
    document.getElementById("information").innerHTML = "";//信息提示清空
}

//创建并加入纯净按钮
function pureCommit() {
    let commit = document.createElement("button");

    commit.type = "button";
    commit.innerText = "commit";
    form1.appendChild(commit);
}

//一旦select2发生了变化，那么移除form2的最后一个子元素（即table元素），如果变化后选中的是“select”这个选项就直接跳出函数，否则继续
select2.onchange = function() {
    //选中select的情况
    if(select2.value === "select" && form2.childNodes.length > 2){
        form2.removeChild(form2.lastChild);
        return;
    }
    //一般情况
    if (form2.getElementsByTagName("table").length) {
        form2.removeChild(form2.lastChild);
    }
        //加入新选中的表格
        form2.appendChild(tables[select2.value]);

        //根据第一个选择框的不同选择给commit按钮设置事件
        if(select.value === "addRow"){
            addInputs(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
            let commit =document.getElementsByTagName("button")[0];
            commit.addEventListener("click",addAttrToTable,false);
        }
        if(select.value === "delRow"){
            addInputs(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
            let commit =document.getElementsByTagName("button")[0];
            commit.addEventListener("click",deleteRow,false);
        }
        if(select.value === "delTable"){
            addInputs(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
            let commit =document.getElementsByTagName("button")[0];
            commit.addEventListener("click",deleteTable,false);
        }
}
//第一部分结束
//part1 finish

//第二部分开始
//part2 for case 2
//加行主函数
function howToAddRow() {
    //根据第二个选择框选中选项值对应表格表头长度 和 第二个选择框选中选项值对应表格表头列表 产生 具有相应 placeholder 的输入框
    addInputs(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
    document.getElementById("information").innerHTML = "";//消息清空

    //除去createtable时产生的 表格名 和 数量 输入框
    let name = document.getElementById("tableName");
    let number = document.getElementById("number");
    if(number !== null) {
        form1.removeChild(number);
    }
    if(name !== null) {
        form1.removeChild(name);
    }

    //按钮添加加行功能
    if(select.selectedIndex === 2){
        let commit = document.getElementsByTagName("button")[0];
        commit.addEventListener("click",addAttrToTable,false);
    }
}

//加行辅助函数
//add the value of every attr to table
function addAttrToTable() {
    let attrs = document.getElementsByName("attr");
    let table = tables[select2.value];
    let length = attrs.length;
    let tr = document.createElement("tr");
    let nullTimes = 0;

    for (let i = 0; i < length; i++) {
        let attrValue = attrs[i].value;
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(attrValue));
        tr.appendChild(td);
        if(attrValue == ""){
            nullTimes++;
        }
    }
    if(nullTimes == length){
        return 0;
    }

    table.appendChild(tr);
    document.getElementById("information").innerHTML = "";//消息清空
    adjustColorOfTable();//调节颜色
}
//第二部分结束
//part2 finished

//第三部分开始
//part3 begin
//删除一行主函数
function addDeleteRowAndRemove() {
    //清除旧输入框，加入新的placeholder输入框
   addInputs(tables[select2.value].getElementsByTagName("th").length,tables[select2.value].getElementsByTagName("th"));
    document.getElementById("information").innerHTML = "";//消息清空
    //给按钮添加删除行功能
    let commit = document.getElementsByTagName("button")[0];
    if(commit){
        commit.addEventListener("click",deleteRow,false);
    }
}

//删除行辅助函数
function deleteRow() {
    //选中“select”啥事不干
    if(select2.value === "select"){
        return;
    }
    //否则储存 每个输入框的值到数组
    let ts = [];
    let table = tables[select2.value];
    let trs = table.getElementsByTagName("tr");
    let tdLength = trs[0].getElementsByTagName("td").length;
    for (let i = 0; i < tdLength; i++) {
        ts[i] = document.getElementsByName("attr")[i].value;
    }

    //比对匹配数组中值和每一行td的值
    for (let j = 0; j < trs.length; j++) {
        let tds = trs[j].getElementsByTagName("td");
        let right = false;
        for (let i = 0; i < ts.length; i++) {
            if(ts[i] == tds[i].innerHTML || !ts[i] ){//注意此时的模糊匹配，当他没东西的时候相当于可以匹配
                right = true;
            }else{
                right = false;
                break;
            }
        }
        //匹配到就删除相应的
        if(right){
            tables[select2.value].removeChild(document.getElementsByTagName("tr")[j]);
            document.getElementById("information").innerHTML = "";//消息清除
            adjustColorOfTable();
            return 0;
        }

    }
}
//第三部分结束
//part3 finished


//第四部分开始
//part4 begin
//删除表格主函数
function commitForDeleteTable() {
    document.getElementById("information").innerHTML = "WARNING: You cannot undo this action!";//消息提示

    //给按钮加入删除表格功能
    let commit = document.getElementsByTagName("button")[0];
    if(commit){commit.removeEventListener("click",updateForm2,false);
        commit.removeEventListener("click",addAttrToTable,false);
        commit.removeEventListener("click",addDeleteRowAndRemove,false);
        commit.addEventListener("click",deleteTable,false);
    }

    //删除 表格名和数量输入框
    let num = document.getElementsByName("attr").length;
    if(document.getElementById("tableName")) {
        document.getElementById("form1").removeChild(document.getElementById("tableName"));
    }
    if(document.getElementById("number")) {
        document.getElementById("form1").removeChild(document.getElementById("number"));
    }
    //删除Attribute输入框
    for (let i = 0; i < num; i++) {
        document.getElementById("form1").removeChild(document.getElementsByName("attr")[0]);
    }
}

//删除表格辅助函数
function deleteTable() {
    if(select2.value !== "select"){
        //删除第二个选择框选中值对应的表格对象
        form2.removeChild(tables[select2.value]);
        //选项中删除相应选项
        let options = select2.getElementsByTagName("option");
        for(let i = 0; i < options.length; i++){
            if(options[i].value === select2.value){
                select2.removeChild(options[i]);
            }
        }
        //若还存在剩余选项，默认选择第一个选项，并显示出相应表格
        if(select2.getElementsByTagName("option")[1]){
            select2.getElementsByTagName("option")[1].selected = true;
            form2.appendChild(tables[select2.getElementsByTagName("option")[1].value]);
        }
    }
}
//第四部分结束
//part4 finished

//第五部分
//其余辅助函数
//调整表格奇偶行颜色
function adjustColorOfTable() {
    let trs = tables[select2.value].getElementsByTagName("tr");
    for (let i = 0; i < trs.length; i++) {
        let j = i + 1;
        if (j % 2 === 0) { //偶数行
            trs[i].className = "grey";
        }
        else {
            trs[i].className = "";
        }
    }
}

//给表格对象设置名字，防止同名情况
function setName(tableName){
    let count = 0;
    for(let table in tables){
        if(tableName.replace(/\d+/,"") === table.replace(/\d+/,""))
            count++;
    }
    return tableName + count;
}


