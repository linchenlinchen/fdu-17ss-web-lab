<?php
$researchInform = '';
if(isset($_GET['research'])){
    $researchInform = $_GET['research'];
}
if($researchInform == ''){

}
else{
    $good = $db->query('SELECT artist,title,description,imageFileName FROM artworks');
    while ($row1=$good->fetch()){
        if($row1['artist']==$researchInform || $row1['title']==$researchInform || $row1['description']==$researchInform){
            print "<div>
            <div class=\"divOne\">
                    <span>
                <img src=\"sucai/images/artists/medium/".$row1['imageFileName']."\">
                    </span>
                <span>
                <h3>".$row1['title']."</h3><br/>
                <p>".$row1['artist']."</p>
                    </span>
            </div>
            <div class=\"divTwo\">
                <p>".$row1['description']. ">热度(0)</a></p>
            </div>
        </div>\"";
        }
    }
}
?>
/**
 * Created by PhpStorm.
 * User: L2595
 * Date: 2018/6/9
 * Time: 20:35
 */