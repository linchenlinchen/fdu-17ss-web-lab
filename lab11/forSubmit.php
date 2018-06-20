<?php
if ($_FILES["file_upload"]["error"] > 0)
{
    echo "Error: " . $_FILES["file_upload"]["error"] . "<br />";
}
else
{
    if (file_exists("upload/" . $_FILES["file_upload"]["name"]))
    {
        echo $_FILES["file_upload"]["name"] . " already exists. ";
    }
    else
    {
        move_uploaded_file($_FILES["file_upload"]["tmp_name"],"upload/" . $_FILES["file_upload"]["name"]);
        //

        $filename = substr($_FILES["file_upload"]["name"],0,strripos($_FILES["file_upload"]["name"],'.'));
        $lrcFile = fopen("lrc/".$filename.".lrc", "w");
        fwrite($lrcFile,$_POST["edit_lyric"]);
        $musicList = fopen("upload/list.lst", "a");
        $temp = $_FILES["file_upload"]["name"];
        fwrite($musicList,('<option value="$temp">'.$filename.'</option>'));
	echo '<script>window.location ="'.'lab11.php'.'";</script>';
	}
}
?>