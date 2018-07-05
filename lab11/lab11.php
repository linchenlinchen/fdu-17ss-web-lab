<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>歌词编辑器</title>
    <link rel="stylesheet" href="forLab11.css">
</head>
<body>
<nav><ul>
        <li id="d_edit" class="tab">Edit Lyric</li>
        <li id="d_show" class="tab">Show Lyric</li>
    </ul>
</nav>
<section id="s_edit" class="content">
    <form id="f_upload" enctype="multipart/form-data" action = 'forSubmit.php' method = 'post'>
        <p>请上传音乐文件</p>

        <audio id = "audio"src = "" controls="controls" autoplay="autoplay"></audio><br/>
        <input type="file" name="file_upload" onchange = "document.getElementById('audio').src = window.URL.createObjectURL(this.files[0]); "/>
        <table>
            <tr><td>Title: <input type="text"></td><td>Artist: <input type="text"></td></tr>
            <tr><td colspan="2"><textarea name="edit_lyric" id="edit_lyric"></textarea></td></tr>
            <tr><td><input type="button" value="插入时间标签" onclick = 'insert(get_target_pos());'></td><td><input type="button" value="替换时间标签" onclick = 'change(get_target_pos())'></td></tr>
            <tr><td colspan="2" id="td_submit"><input type="submit" value="Submit"></td></tr>
        </table>
    </form>
</section>
<!--歌词展示部分-->
<section id="s_show" class="content">
    <select id = "select" onchange = "selectChange();">
        <?php
        echo readfile("upload/list.lst");
        ?>
    </select>
    <audio id = "audio2" src = "" controls="controls" autoplay="autoplay" ontimeupdate = "movelrc();"></audio><br/>
    <button id = "bt1" onclick = "bt1Click();">上一首</button>
    <button id = "bt2" onclick = "bt2Click();">下一首</button>
    <ul id = "lyric2"><div class = "move" id = 'ul2'>
            <li class = "bold">2333<br/>2333</li><li>2333</li><li>2333</li><li>2333</li>
        </div></ul>
    <textarea id="lyric" readonly="true">
    </textarea>
</section>
</body>
<script type = "text/javascript" src = "jquery-3.3.1.js"></script>
<script src="forLab11.js"></script>
</html><!DOCTYPE html>
