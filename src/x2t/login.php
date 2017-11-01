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
    <style>
    body {
        padding: 35px;
    }
    input {
        display: block;
    }
    h3 {
        width: 100%;
        text-align: center;
        margin-top: 35px;
        margin-bottom: 30px;
        font-weight: normal;
    }
    #pw {
        font-size: 19px;
        border: 3px solid #000;
        width: 100%;
        height: 40px;
        text-align: center;
        margin-bottom: 15px;
        background: #FFEB3B;
    }
    #go {
        width: 100%;
        height: 35px;
        font-size: 19px;
        font-weight: bold;
    }
    </style>
</head>
<body>
<form name="frm" method="post" action="/x2t/login.php">
    <h3>인증번호를 입력하세요</h3>
    <input type='password' id="pw" name='pw' tabindex='1'/>
    <input type='submit' id="go" name='go'/>
</form>
</body>
</html>
