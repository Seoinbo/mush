<?php
header("Content-Type: text/html; charset=utf-8");

session_start();
if($_SESSION['islogin'] != "y") {
    header('Location: /x2t/login.php');
    exit;
}

$fp = fopen("lastupdate.out", "r") or die("Unable to open file!");
$lastUpdate = fgets($fp);
$data = fgets($fp);
fclose($fp);
$rows = json_decode($data, true);

// custom adding
$fp = fopen("lastupdate_custom.out", "r") or die("Unable to open file!");
$lastUpdate2 = fgets($fp);
$data2 = fgets($fp);
fclose($fp);
$rows2 = json_decode($data2, true);
$customCnt = 0;
if (is_array($rows2)) {
    $customCnt = count($rows2);
    foreach($rows2 as $val) {
        $rows[] = $val;
    }
}
$totalCnt = count($rows);

$c50 = 0; // 꽃송이 실속형
$c100 = 0;
$c100b = 0; // 선물용
$c150b = 0;
$c200b = 0;
$s2s = 0; // 샤인머스켓
$s2a = 0;
$s2b = 0;
$s4s = 0;
$s4a = 0;
$s4b = 0;
$cham1ka = 0;
$cham500a = 0;
$cham1kb = 0;
$income = 0;
$incomeBefore = 0;
$taxes = 0;
$list = [];
$fields = ["수취인명", "옵션정보", "수량", "수취인연락처1", "배송지", "배송메세지", "상품명"];
foreach ($rows as $row) {
    $i = 0;
    $text = "";
    foreach ($row as $key => $val) {
        if ($val == "" && $key != "옵션정보" ) {
            continue;
        }
        if ($key == '상품명') {
            continue;
        }
        if (!in_array($key, $fields)) {
            continue;
        }
        if ($key == "옵션정보") {
            if($val == "") {
                $val = $row['상품명'];
            } else {
                $val = str_replace(["등급: ", "중량: ", "상품선택: "], '', $val);
            }

            // deprecated
            if ($val == "건조 꽃송이버섯 (50g)") {
                $c50 += $row['수량'];
            }
            if ($val == "건조 꽃송이버섯 (100g)") {
                $c100 += $row['수량'];
            }
            // --deprecated

            if ($val == "원목 건조 꽃송이버섯 50g") {
                $c50 += $row['수량'];
            }
            if ($val == "원목 건조 꽃송이버섯 200g 선물세트") {
                $c200b += $row['수량'];
            }
            if ($val == "건조 꽃송이버섯 (실속형 50g)") {
                $c50 += $row['수량'];
            }
            if ($val == "건조 꽃송이버섯 (실속형 100g)") {
                $c100 += $row['수량'];
            }
            if ($val == "건조 꽃송이버섯 (선물용 100g)") {
                $c100b += $row['수량'];
            }
            if ($val == "건조 꽃송이버섯 (선물용 150g)") {
                $c150b += $row['수량'];
            }
            if ($val == "건조 꽃송이버섯 (선물용 200g)") {
                $c200b += $row['수량'];
            }
            if ($val == "샤인머스켓 2kg (특)") {
                $s2s += $row['수량'];
            }
            if ($val == "샤인머스켓 2kg (상)") {
                $s2a += $row['수량'];
            }
            if ($val == "샤인머스켓 2kg (보통)") {
                $s2b += $row['수량'];
            }
            if ($val == "샤인머스켓 4kg (특)") {
                $s4s += $row['수량'];
            }
            if ($val == "샤인머스켓 4kg (상)") {
                $s4a += $row['수량'];
            }
            if ($val == "샤인머스켓 4kg (보통)") {
                $s4b += $row['수량'];
            }
            if ($val == "참송이버섯 1kg (상)") {
                $cham1ka += $row['수량'];
            }
            if ($val == "참송이버섯 500g (상)") {
                $cham500a += $row['수량'];
            }
            if ($val == "참송이버섯 1kg (못난이)") {
                $cham1kb += $row['수량'];
            }
        }
        if ($key == "수량") {
            if ($val > 1) {
                $val = "<strong>" . $val . "개</strong>";
            } else {
                $val = $val . "개";
            }
        }
        if ($key == "수취인명") {
            $val = "<a href=\"javascript:popupFrom('" . $row['구매자명'] . "')\">" . $val . "</a>";
        }
        if ($key == "배송메세지") {
            $val = "배송메세지:" . str_replace(array("\r\n","\r","\n"), '', $val);
        }
        if ($i > 0) {
            $text .= ", ";
        }
        $text .= $val;
        $i++;
    }
    $tmp1 = str_replace(["\\", ","], "", $row['상품별 총 주문금액']);
    $tmp2 = str_replace(["\\", ","], "", $row['결제수수료']);
    $tmp3 = str_replace(["\\", ","], "", $row['네이버 쇼핑 매출연동 수수료']);
    $incomeBefore += $tmp1;
    $taxes += $tmp2 + $tmp3;
    $list[] = $text;
}
?>

<!doctype html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <title>orders</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <style>
    body {
        font-size: 18px
    }
    .updatetm {
        font-size: 0.9em;
        color: #333;
    }
    .tit {
        font-size: 1.1em;
        font-weight: bold;
        margin-bottom: 23px;
    }
    </style>
</head>
<body>
<?php include "head.php"; ?>
<p class="updatetm"><?php echo date("Y.m.d H:i", (int)$lastUpdate)?></p>
<h3 class="tit">주문개요</h3>
<ul class="content">
    <li>꽃송이 실속형 <?=$c50+$c100?>개 (50g <?=$c50?>개, 100g <?=$c100?>개)</li>
    <li>꽃송이 선물용 <?=$c100b+$c150b+$c200b?>개 (100g <?=$c100b?>개, 150g <?=$c150b?>개, 200g <?=$c200b?>개)</li>
    <li>샤인2kg <?=$s2s+$s2a+$s2b?>개 (특 <?=$s2s?>개, 상 <?=$s2a?>개, 보통 <?=$s2b?>개)</li>
    <li>샤인4kg <?=$s4s+$s4a+$s4b?>개 (특 <?=$s4s?>개, 상 <?=$s4a?>개, 보통 <?=$s4b?>개)</li>
    <li>참송이1kg <?=$cham1ka+$cham1kb?>개 (상 <?=$cham1ka?>개, 못난이 <?=$cham1kb?>개)</li>
    <li>참송이500g <?=$cham500a?>개 (상 <?=$cham500a?>개)</li>
<?php
    if (!empty($incomeBefore)) { ?>
        <li>총매출: <?=number_format($incomeBefore)?>원</li>
        <li>수수료: <?=number_format(abs($taxes))?>원</li>
        <li>순매출: <?=number_format($incomeBefore - abs($taxes))?>원</li>
<?php
    }
?>
</ul>
<h3 class="tit">주문현황</h3>
<div class="content">
<?php
foreach ($list as $i => $t) {
    echo "<strong>" . ($i+1) . ") </strong> ";
    if ($totalCnt-$customCnt == $i+1) {
        echo $t . "<br><br><br>";
    } else {
        echo $t . "<br><br>";
    }
}
echo '<div style="width:100%; text-align:center;">... 끝 ...</div>';
?>
<br><br>
</div>
<script>
    function popupFrom(from) {
        alert("구매자명: " + from);
    }
</script>
</body>
</html>
