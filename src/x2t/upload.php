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
<span>Last update: <?php echo date("Y.m.d H:i:s", (int)$lastUpdate)?></span>
<br>------------------------------------<br>
<form name="frm" method="post" enctype="multipart/form-data" action="x2t/parse.php">
    <input type="file" name="attach" />
    <input type="submit" value="Go!" />
</form>
</body>
</html>
