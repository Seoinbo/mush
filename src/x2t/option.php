<?php
session_start();
if($_SESSION['islogin'] != "y") {
    header('Location: /x2t/login.php');
    exit;
}
?>

<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title>설정</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <style>
    .wrap {
        padding: 0 10px;
    }
    </style>
</head>
<body>
<?php include "head.php"; ?>
<div class="wrap">
    <h3>주문목록 초기화</h3>
    <form name="frm" method="post" enctype="multipart/form-data" action="/x2t/clear.php">
        <div>
            <input type="radio" id="file" name="type" value="file" checked>
            <label for="file">파일목록</label>
            <input type="radio" id="custom" name="type" value="custom">
            <label for="custom">직접추가</label>
        </div>
        <br />
        <input type="submit" value="목록 초기화" />
    </form>
</div>
</body>
</html>
