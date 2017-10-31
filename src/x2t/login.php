<?php
if (!empty($_POST['pw']) && $_POST['pw'] == "11223344") {
    session_start();
    $_SESSION['islogin'] = "y";
    header('Location: /x2t');
    exit;
}
?>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title>x2t - login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
<form name="frm" method="post" action="/x2t/login.php">
    <h4>인증번호를 입력하세요</h4>
    <input type='password' name='pw' tabindex='1'/>
</form>
</body>
</html>
