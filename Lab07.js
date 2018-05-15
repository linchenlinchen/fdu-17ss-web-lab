let select = document.getElementsByTagName("select")[0];
let select2 = document.getElementsByTagName("select")[1];
let tables = [];
switch (select.selectedIndex){
    case 0:
}

select.addEventListener("change",addAndDelete ,false);

function addAndDelete() {
    switch (select.selectedIndex) {
        case 0:deleteSecond();break;
        case 1:deleteAndAppear();break;
        case 2:deleteNameAndNumber();break;
        case 3:addDeleteRowAndRemove();break;
        case 4:commitForDeleteTable();
    }
}


//part 1 for case 0~1
function deleteAndAppear() {
    document.getElementById("information").innerHTML = "";
    deleteSecond();
    appearSecond();
}

//appear the table when you choose the second one
function appearSecond() {
        let form = document.getElementsByTagName("form")[0];
        // let lineBreak2 = document.createElement("br");
        let input1 = document.createElement("input");
        input1.id = "tableName";
        input1.type = "text";
        input1.placeholder = "Table Name";
        form.appendChild(input1);
        let number = document.createElement("input");
        number.id = "number";
        number.type = "number";
        number.placeholder = "Columns Numbers";
            form.appendChild(number);
            // form.appendChild(lineBreak2);
            number.addEventListener("change", addAttrInput, false);
}

function deleteSecond() {
    document.getElementById("information").innerHTML = "";
    if(document.getElementById("form1")!== null) {
        let form1 = document.getElementById("form1");
        let form2 = document.getElementById("form2");
        for (let i = 1 , len = document.forms[0].elements.length; i < len; i++) {
            form1.removeChild(document.forms[0].elements[1]);
        }
        for (let i = 1 ,len = document.forms[1].elements.length; i < len; i++) {
            form2.removeChild(document.forms[1].elements[1]);
        }
        // if(document.getElementsByTagName("table") != undefined && document.getElementsByTagName("table")!= null) {
        //     document.removeChild(document.getElementsByTagName("table")[0]);
        // }
        // form1.normalize();
    }
}

select2.onchange = function() {
    alert(select2.value);
    let form2 = document.getElementsByTagName("form")[1];
    if(select2.value === "select" && form2.childNodes.length > 2){
        form2.removeChild(form2.lastChild);
        return;
    }
    if(form2.getElementsByTagName("table").length) {
        form2.removeChild(form2.lastChild);
    }
    form2.appendChild(tables[select2.value]);
}
//add the input about Attribute
function addAttrInput(ths = []){
    let form = document.forms[0];
    let numberOfAttr = document.getElementById("number").value;
    let attrs = document.getElementsByName("attr");
    let commit = document.getElementsByTagName("button")[0];
    for (let i = 0,len=attrs.length; i < len; i++) {
        form.removeChild(attrs[0]);
    }
    if(numberOfAttr>0) {
        for (let i = 0; i < numberOfAttr; i++) {
            let attr = document.createElement("input");
            attr.placeholder = ths[i]? ths[i].innerHTML : "Attribute";
            attr.type = "text";
            attr.name = "attr";
            form.appendChild(attr);
        }
    }
    if(commit) {
        form.removeChild(commit);
    }
    addCommit();
}
function addCommit() {
    let form1 = document.forms[0];
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
    if(document.getElementsByTagName("form")[1].getElementsByTagName("table").length > 1) {
        document.getElementsByTagName("form")[1].removeChild(document.getElementsByTagName("form")[1].lastChild);
    }
    if(document.getElementById("tableName") !== null) {
        let newOptionInformation = document.getElementById("tableName").value;
        let newOption = document.createElement("option");
        let selectBoxTwo = document.forms[1].elements[0];
        // for (let i = 0; i < selectBoxTwo.childNodes.length; i++) {
        //     if(newOptionInformation == selectBoxTwo.childNodes[i].value){
        //         return 0;
        //     }
        // }//不允许同名表格
        newOption.appendChild(document.createTextNode(newOptionInformation));
        newOption.value = setName(newOptionInformation);
        selectBoxTwo.appendChild(newOption);
        selectBoxTwo.options[selectBoxTwo.options.length - 1].selected = true;
    }
    let table = document.createElement("table");
    let numberOfAttr;
    if(document.getElementById("number") !== null) {
        numberOfAttr = document.getElementById("number").value;
    }
    for (let i = 0; i < numberOfAttr ; i++) {
        let thead = document.createElement("th");

        let attrs = document.getElementsByName("attr");
        if(attrs[i] != undefined) {
            if (attrs[i].value == "") {
                return 0;
            }
            thead.appendChild(document.createTextNode(attrs[i].value));
        }
        table.appendChild(thead);

    }
    tables[setName(document.getElementById("tableName").value)] = table;//加入表格数组
    let form2 = document.getElementById("form2");
    if(document.getElementsByTagName("table"))
        form2.removeChild(form2.lastChild);
    form2.appendChild(table);
    document.getElementById("information").innerHTML = "";
}
//part1 finish

//part2 for case 2
function deleteNameAndNumber() {
    document.getElementById("information").innerHTML = "";
    let name = document.getElementById("tableName");
    let number = document.getElementById("number");
    let form1 = document.getElementById("form1");
    if(number !== null) {
        form1.removeChild(number);
    }
    if(name !== null) {
        form1.removeChild(name);
    }
    for (let i = 0; i < document.getElementsByName("attr").length; i++) {
        document.getElementsByName("attr")[i].placeholder = document.getElementsByName("attr")[i].value;
        document.getElementsByName("attr")[i].value = "";
    }

    if(select.selectedIndex == 2){
        let commit = document.getElementsByTagName("button")[0];
        commit.removeEventListener("click",updateForm2,false);
        commit.removeEventListener("click",deleteRow,false);
        commit.addEventListener("click",addAttrToTable,false);
    }
}
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
    document.getElementById("information").innerHTML = "";
    adjustColorOfTable();
}
function addDeleteRowAndRemove() {
    for (let i = 0; i < document.getElementsByName("attr").length; i++) {
        document.getElementsByName("attr")[i].value = "";
    }
    document.getElementById("information").innerHTML = "";
    let commit = document.getElementsByTagName("button")[0];
    if(commit){
        commit.removeEventListener("click",addAttrToTable,false);
        commit.removeEventListener("click",updateForm2,false);
        commit.addEventListener("click",deleteRow,false);
    }
}
function deleteRow() {
    let ts = [] ;
    let table = document.getElementsByTagName("table")[0];
    let trLength = document.getElementsByTagName("tr").length ? document.getElementsByTagName("tr").length : 0;
    let trs = document.getElementsByTagName("tr");
    let tdLength = document.getElementsByTagName("tr")[0]? document.getElementsByTagName("tr")[0].childNodes.length:0;
    for (let i = 0; i < tdLength; i++) {
        ts[i] = document.getElementsByName("attr")[i].value;
    }
    // for (let i = 0; i < document.getElementsByName("attr").length; i++) {
    //     document.getElementsByName("attr")[i].value = "";
    // }
    for (let j = 0; j < trLength; j++) {
        let times = 0;
        for (let i = 0; i < ts.length; i++) {
            if(ts[i] == trs[j].childNodes[i].value ){
                times++;
                alert(-2);
            }
            alert(-1);
        }
        alert(0);
        if(tdLength == times){
            document.getElementsByTagName("table")[0].removeChild(document.getElementsByTagName("tr")[j]);
            alert(1);
            return 0;
        }
    }
    document.getElementById("information").innerHTML = "";
    // if(document.getElementsByTagName("tr").length > 0 ) {
    //     table.removeChild(document.getElementsByTagName("tr")[document.getElementsByTagName("tr").length - 1]);
    // }
}

function commitForDeleteTable() {
    for (let i = 0; i < document.getElementsByName("attr").length; i++) {
        document.getElementsByName("attr")[i].value = "";
    }
    let commit = document.getElementsByTagName("button")[0];
    commit.removeEventListener("click",updateForm2,false);
    commit.removeEventListener("click",addAttrToTable,false);
    commit.removeEventListener("click",addDeleteRowAndRemove,false);
    commit.addEventListener("click",deleteTable,false);
}
function deleteTable() {
    // let inputValue = new Array();
    let name = document.getElementById("tableName");
    let number = document.getElementById("number");
    let form1 = document.getElementById("form1");
    if(number !== null) {
        form1.removeChild(number);
    }
    if(name !== null) {
        form1.removeChild(name);
    }
    let length = document.getElementsByName("attr").length;
    // for (let i = 0; i < length; i++) {
    //     inputValue[i] = document.getElementsByName("attr")[i].value;
    // }
    let selectBox2 = document.forms[1].elements[0];
    let form2 = document.getElementsByTagName("form")[1];
    let table = document.getElementsByTagName("table")[0];
    if(table) {
        form2.removeChild(table);
        selectBox2.removeChild(selectBox2.options[selectBox2.options.length - 1]);
        document.getElementById("information").innerHTML = "WARNING: You cannot undo this action!";
    }
    for (let i = 0; i < document.getElementsByName("attr").length; i++) {
        document.getElementsByName("attr")[i].value = "";
    }
}

function adjustColorOfTable() {
    let trs = document.getElementsByTagName("tr");
    for (let i = 0; i < trs.length; i++) {
        let j = i + 1;
        if (j % 2 === 0) { //偶数行
            trs[i].className = "grey";
        }
    }
}

function setName(tableName){
    let count = 0;
    for(let table in tables){
        if(tableName.replace(/\d+/,"") === table.replace(/\d+/,""))
            count++;
    }
    return tableName + count;
}


