<?php
session_start();
if($_SESSION['islogin'] != "y") {
    header('Location: /x2t/login.php');
    exit;
}

// Get last update time.
$fp = fopen("lastupdate.out","r");
$lastUpdate = fgets($fp);

fclose($fp);
?>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title>x2t</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
<?php include "head.php"; ?>
<form name="frm" method="post" enctype="multipart/form-data" action="x2t/parse.php">
    <div>
        <input type="radio" id="overwrite" name="type" value="overwrite" checked>
        <label for="overwrite">덮어쓰기</label>
        <input type="radio" id="append" name="type" value="append">
        <label for="append">추가하기</label>
    </div>
    <br />
    <input type="file" name="attach" />
    <input type="submit" value="Go!" />
</form>
<br />
<span>마지막 변경일: <?php echo date("Y.m.d H:i:s", (int)$lastUpdate)?></span>
</body>
</html>
