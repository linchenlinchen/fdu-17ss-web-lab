// 界面部分
document.getElementById("d_edit").onclick = function () {click_tab("edit");audio2.src = ''};
document.getElementById("d_show").onclick = function () {click_tab("show");selectChange();document.getElementById('audio').src='';};
function click_tab(tag) {
    for (let i = 0; i < document.getElementsByClassName("tab").length; i++) document.getElementsByClassName("tab")[i].style.backgroundColor = "transparent";
    for (let i = 0; i < document.getElementsByClassName("content").length; i++) document.getElementsByClassName("content")[i].style.display = "none";
    document.getElementById("s_" + tag).style.display = "block";
    document.getElementById("d_" + tag).style.backgroundColor = "darkgray";
}
// Edit 部分
var edit_lyric_pos = 0;
document.getElementById("edit_lyric").onmouseleave = function () {
    edit_lyric_pos = document.getElementById("edit_lyric").selectionStart;
};
// 获取所在行的初始位置。
function get_target_pos() {
    let n_pos = edit_lyric_pos;
    let value = document.getElementById("edit_lyric").value;
    let pos = 0;
    for (let i = n_pos; i >= 0; i--) {
        if (value.charAt(i) === '\n') {
            pos = i + 1;
            break;
        }
    }
    return pos;
}
// 选中所在行。
function get_target_line(n_pos) {
    let value = document.getElementById("edit_lyric").value;
    let f_pos = get_target_pos(n_pos);
    let l_pos = 0;
    for (let i = f_pos;; i++) {
        if (value.charAt(i) === '\n') {
            l_pos = i + 1;
            break;
        }
    }
    return [f_pos, l_pos];
}
function getTime(){
    let time = document.getElementById('audio').currentTime;
    let str = "[";
    let temp;
    temp = parseInt(time/3600);
    str += printf(temp)+":";
    time -= temp*3600;
    temp = parseInt(time/60);
    str += printf(temp)+":";
    time -= temp*60;
    temp = parseInt(time);
    str += printf(temp)+".";
    time -= temp;
    temp = parseInt(time*60);
    str += printf(temp);
    str+=']';
    return str;
}
function printf(number){
    if(number<10)
        return "0" + number;
    else
        return number;
}
let lrcArea = document.getElementById("edit_lyric");
let former;
let latter;
let s;
function insert(n){
    s = lrcArea.selectionStart + 13;
    former = lrcArea.value.substring(0,n);
    latter = lrcArea.value.substring(n,lrcArea.value.length);
    lrcArea.value = former + getTime() + latter;
    lrcArea.focus();
    lrcArea.selectionStart = s;
    lrcArea.selectionEnd = s;
}
function change(n){
    s = lrcArea.selectionStart;
    former = lrcArea.value.substring(0,n);
    latter = lrcArea.value.substring(n+13,lrcArea.value.length);
    lrcArea.value = former + getTime() + latter;
    lrcArea.focus();
    lrcArea.selectionStart = s;
    lrcArea.selectionEnd = s;
}
function btSubmit(){
    let name = document.getElementsByTagName('input')[0].files[0].name;
    name = name.substring(0,name.lastIndexOf('.'))+'.lrc';
}
/* HINT:
 * 已经帮你写好了寻找每行开头的位置，可以使用 get_target_pos()
 * 来获取第一个位置，从而插入相应的歌词时间。
 * 在 textarea 中，可以通过这个 DOM 节点的 selectionStart 和
 * selectionEnd 获取相对应的位置。
 *
 * TODO: 请实现你的歌词时间标签插入效果。
 */
/* TODO: 请实现你的上传功能，需包含一个音乐文件和你写好的歌词文本。
 */
/* HINT:
 * 实现歌词和时间的匹配的时候推荐使用 Map class，ES6 自带。
 * 在 Map 中，key 的值必须是字符串，但是可以通过字符串直接比较。
 * 每一行行高可粗略估计为 40，根据电脑差异或许会有不同。
 * 当前歌词请以粗体显示。
 * 从第八行开始，当歌曲转至下一行的时候，需要调整滚动条，使得当前歌
 * 词保持在正中。
 *
 * TODO: 请实现你的歌词滚动效果。
 */
let select = document.getElementById('select');
let audio2 = document.getElementById('audio2');
let lrc;
let i = 0;
let lTime = new Array();
let lWords = new Array();
let lrcOutput = '';
let lists;
let ul2 = document.getElementById('ul2');
let temp;
let temp2=0;
function showLyrics(name){
    console.log("lrc/"+name+".lrc");
    lrc = $.ajax({url:(("lrc/"+name+".lrc")),async:false});
    lrc = lrc.responseText;
    lrc = lrc.split(/(\[\d\d:\d\d:\d\d.\d\d\])/);

    while(!((/\[\d\d:\d\d:\d\d.\d\d\]/).test(lrc[i]))){
        i++;

    }
    for(;i<lrc.length-1;i=i+2){

        temp = lrc[i].substr(1,11).split(':');
        temp2 = 0;
        for(j=0;j<temp.length;j++){
            temp2 += temp[j]*Math.pow(60,temp.length - 1 - j);
        }
        lTime.push(temp2);
        lWords.push(lrc[i+1]);
    }
    for(i=0;i<lWords.length;i++){
        lrcOutput += '<li>'+lWords[i]+'</li>';
    }
    ul2.innerHTML = lrcOutput;
    i=0;
    lists = ul2.children;
}
let j = 0;
function movelrc(){
    lists[j].className = '';
    for(i=0;i<lTime.length;i++){
        if(audio2.currentTime>=lTime[i]&&audio2.currentTime<=lTime[i+1]){
            lists[i].className = 'bold';
            ul2.style.top = (210-i*45)+'px';
            j=i;
            break;
        }
    }
}
function selectChange(){
    console.log(select.value.substr(0,select.value.lastIndexOf('.')));
    showLyrics(select.value.substr(0,select.value.lastIndexOf('.')));
    audio2.src = 'upload/'+select.value;
}
function bt1Click(){
    temp = $('#select option:selected').prev();
    if(temp.length == 0){
        document.getElementById('bt1').disabled = true;
        return;
    }
    else{
        document.getElementById('bt1').disabled = false;
        return;
    }
    select.value = temp.value;
}
function bt2Click(){
    temp = $('#select option:selected').next();
    if(temp.length == 0){
        document.getElementById('bt2').disabled = true;
        return;
    }
    else{
        document.getElementById('bt2').disabled = false;
        return;
    }
    select.value = temp.value;
}
temp = $('#select option:selected').prev();
if(temp.length == 0)
    document.getElementById('bt1').disabled = true;
temp = $('#select option:selected').next();
if(temp.length == 0)
    document.getElementById('bt2').disabled = true;
document.getElementById("d_show").click();