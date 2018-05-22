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
    <title>custom add</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <style>
    .wrap {
        padding: 0 10px;
    }
    input {
        display: block;
        width: 100%;
        margin-bottom: 7px
    }
    select {
        padding: 2px;
        height: 28px;
        margin-bottom: 7px
    }
    label {
        display: block;
        margin-bottom: 3px;
    }
    </style>
</head>
<body>
<?php include "head.php"; ?>
<div class="wrap">
    <h3>배송정보 추가</h3>
    <form name="frm" method="post" enctype="multipart/form-data" action="/x2t/custom_process.php">
    <label>구매자명</label><input type="text" name="f1" />
    <label>수취인명</label><input type="text" name="f2" />
    <label>옵션정보</label>
    <select name="f3">
        <option value="샤인머스켓 2kg (특)">샤인머스켓 2kg (특)</option>
        <option value="샤인머스켓 2kg (상)">샤인머스켓 2kg (상)</option>
        <option value="샤인머스켓 2kg (보통)">샤인머스켓 2kg (보통)</option>
        <option value="샤인머스켓 4kg (특)">샤인머스켓 4kg (특)</option>
        <option value="샤인머스켓 4kg (상)">샤인머스켓 4kg (상)</option>
        <option value="샤인머스켓 4kg (보통)">샤인머스켓 4kg (보통)</option>
        <option value="건조 꽃송이버섯 (선물용 200g)">건조 꽃송이버섯 (선물용 200g)</option>
        <option value="건조 꽃송이버섯 (선물용 150g)">건조 꽃송이버섯 (선물용 150g)</option>
        <option value="건조 꽃송이버섯 (선물용 100g)">건조 꽃송이버섯 (선물용 100g)</option>
        <option value="건조 꽃송이버섯 (실속형 50g)">건조 꽃송이버섯 (실속형 50g)</option>
        <option value="건조 꽃송이버섯 (실속형 100g)">건조 꽃송이버섯 (실속형 100g)</option>
        <option value="참송이버섯 500g (상)">참송이버섯 500g (상)</option>
        <option value="참송이버섯 1kg (상)">참송이버섯 1kg (상)</option>
        <option value="참송이버섯 1kg (못난이)">참송이버섯 1kg (못난이)</option>
    </select>
    <label>수량</label>
    <select name="f4">
        <option value="1">1개</option>
        <option value="2">2개</option>
        <option value="3">3개</option>
        <option value="4">4개</option>
        <option value="5">5개</option>
    </select>
    <label>수취인연락처1</label><input type="text" name="f8" />
    <label>배송지</label><input type="text" name="f9" />
    <label>배송메세지</label><input type="text" name="f10"/>
    <br>
    <input type="submit" value="추가" />
    </form>
    <br>
    <br>
    <br>
    <form name="frm" method="post" enctype="multipart/form-data" action="/x2t/custom_clear.php">
        <input type="submit" value="모두 삭제" />
    </form>
</div>
</body>
</html>
