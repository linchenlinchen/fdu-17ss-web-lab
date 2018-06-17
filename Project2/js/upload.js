
function selectFile() {
    //获取选择的图片的文件名
    let src = $("#img").val();
    let pos = src.lastIndexOf("\\");
        src = src.substring(pos+1);
    document.getElementById("image").src ="../resources/img/"+ src;
        $.ajax({
            url:"forJudge.php",
            data:{"src":src},
            type:"get",
            success(msg){
                if(msg.length > 1) {
                    // let result = JSON.parse(msg);
                    // // alert(result);
                    // // loadData(result);
                    let words = msg.split("&");
                    let title = words[0];
                    let artist = words[1];
                    let description = words[2];
                    let year = words[3];
                    let genre = words[4];
                    let width = words[5];
                    let height = words[6];
                    let price = words[7];
                    $("#title").val(title);
                    $("#artist").val(artist);
                    $("#description").html(description);
                    $("#year").val(year);
                    $("#genre").val(genre);
                    $("#width").val(width);
                    $("#height").val(height);
                    $("#price").val(price);
                }
            }
        })
}

function showImage() {
    if (document.getElementById("image").className == 'min') {
        document.getElementById("image").className = 'max';
        document.getElementById("blank").className = 'board';
    }
    else {
        document.getElementById("image").className = 'min';
        document.getElementById("blank").className = 'blank';
    }
}

function cEmpty(id) {
    if(document.getElementById(id).value==""){
        $("#"+id).siblings("span")[0].innerText ="客官，看这里(￣▽￣)~*";
    }
    else {
        $("#"+id).siblings("span")[0].innerText ="";
    }
}
function cInt(id) {
    if(document.getElementById(id).value%1!=0){
        $("#"+id).siblings("span")[0].innerText = "客官，整数哦(๑*◡*๑)";
    }
    else {
        $("#"+id).siblings("span")[0].innerText ="";
    }
}
function cPositive(id) {
    if(document.getElementById(id).value<=0){
        $("#"+id).siblings("span")[0].innerText = "客官，正数哦(๑*◡*๑)";
    }
    else {
        $("#"+id).siblings("span")[0].innerText ="";
    }
}
// function canPost() {
//     alert(1);
//     if((($("#year").val())%1)!=0){
//         // show("客官,输入的年份有点问题呢<br/>(꒪Д꒪)ノ");
//         return false;
//     }
//     else if($("#width").val() < 0||$("#height").val() < 0){
//         // show("客官，长度和宽度有点神奇哟<Br/>┭┮﹏┭┮");
//         return false;
//     }
//     else if($("#price").val()<0||(($("#price").val())%1)!=0){
//         // show("客官，您输入的价格是逗我吗？<br/>(๑Ő௰Ő๑)");
//         return false;
//     }
//     else if($("#title").val()==""||$("#artist").val()==""||$("#description").val()==""||$("#year").val()==""||
//             $("#genre").val()==""||$("#width").val()==""||$("#height").val()==""||$("#price").val()==""||$("#img").val()==""){
//         // alert(111);
//         // show("客官，是不是忘记填什么了呀<br/>ヾ(｡｀Д´｡)ﾉ彡");
//         return false;
//     }
//     else {
//         return true;
//     }
// }



// <script>

//实例化一个plupload上传对象
// var uploader = new plupload.Uploader({
//     browse_button : 'img', //触发文件选择对话框的按钮，为那个元素id
//     url : 'forUpdateOrUpload.php', //服务器端的上传页面地址
//     flash_swf_url : '../js/plupload-3.1.2/js/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
//     silverlight_xap_url : '../js/plupload-3.1.2/js/Moxie.xap' //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
// });
//
// //在实例对象上调用init()方法进行初始化
// uploader.init();
//
// //绑定各种事件，并在事件监听函数中做你想做的事
// uploader.bind('FilesAdded',function(uploader,files){
//     //每个事件监听函数都会传入一些很有用的参数，
//     //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
// });
// uploader.bind('UploadProgress',function(uploader,file){
//     //每个事件监听函数都会传入一些很有用的参数，
//     //我们可以利用这些参数提供的信息来做比如更新UI，提示上传进度等操作
// });
// //......
// //......
//
// //最后给"开始上传"按钮注册事件
// document.getElementById('start_upload').onclick = function(){
//         uploader.start(); //调用实例对象的start()方法开始上传文件，当然你也可以在其他地方调用该方法
// }
//
//


//
// var uploader = new plupload.Uploader({ //实例化一个plupload上传对象
//     browse_button : 'browse',
//     url : 'upload.html',
//     flash_swf_url : '../js/plupload-3.1.2/js/Moxie.swf',
//     silverlight_xap_url : '../js/plupload-3.1.2/js/Moxie.xap',
// });
// uploader.init(); //初始化
//
// //绑定文件添加进队列事件
// uploader.bind('FilesAdded',function(uploader,files){
//     for(var i = 0, len = files.length; i<len; i++){
//         var file_name = files[i].name; //文件名
//         //构造html来更新UI
//         var html = '<li id="file-' + files[i].id +'"><p class="file-name">' + file_name + '</p><p class="progress"></p></li>';
//         $(html).appendTo('#file-list');
//     }
// });
//
// //绑定文件上传进度事件
// uploader.bind('UploadProgress',function(uploader,file){
//     $('#file-'+file.id+' .progress').css('width',file.percent + '%');//控制进度条
// });
//
// //上传按钮
// $('#upload-btn').click(function(){
//     uploader.start(); //开始上传
// });
//

// </script>

// $(document).ready(function () {
//     $("#changeInformation").hide();
// })
// function tog() {
//     $("#upload").toggle();
//     $("#changeInformation").toggle();
// }
// $("#upload").change = function () {
//
//     let src = document.getElementById("upload").value;
//     alert(src);
// };
//
// $("#img").on("change",function () {
//     alert(1);
//     console.log($(this).value);
// })

    // $("#image").click(function () {
//     if(document.getElementById("image").className == 'min'){
//         document.getElementById("image").className = 'max';
//         alert(1);
//     }
//     // $(this).toggleClass('min');
//     // $(this).toggleClass('max');
// });
    // alert(1);
    //     $("#image").toggleClass('min');
    //     $("#image").toggleClass('max');
// }
// var user = '<?php echo $json;?>';
//
// $(function(){
//     //将数据加载到表单中
//     loadData(user);
//
// });
// function loadData(jsonStr){
//     var obj = eval("("+jsonStr+")");
//     var key,value,tagName,type,arr;
//     for(x in obj){
//         key = x;
//         value = obj[x];
//
//         $("[name='"+key+"'],[name='"+key+"[]']").each(function(){
//             tagName = $(this)[0].tagName;
//             type = $(this).attr('type');
//             if(tagName=='INPUT'){
//                 if(type=='radio'){
//                     $(this).attr('checked',$(this).val()==value);
//                 }else if(type=='checkbox'){
//                     arr = value.split(',');
//                     for(var i =0;i<arr.length;i++){
//                         if($(this).val()==arr[i]){
//                             $(this).attr('checked',true);
//                             break;
//                         }
//                     }
//                 }else{
//                     $(this).val(value);
//                 }
//             }else if(tagName=='SELECT' || tagName=='TEXTAREA'){
//                 $(this).val(value);
//             }
//
//         });
//     }
// }

