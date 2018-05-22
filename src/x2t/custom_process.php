<?php
header("Content-Type: text/html; charset=utf-8");

if (empty($_POST['f2']) || empty($_POST['f3']) || empty($_POST['f4']) || empty($_POST['f9'])) {
    header('Location: /x2t/custom.php');
    exit;
}

$prices = ["샤인머스켓 2kg (특)"=>26500,
    "샤인머스켓 2kg (상)"=>24500,
    "샤인머스켓 2kg (보통)"=>19000,
    "샤인머스켓 4kg (특)"=>50000,
    "샤인머스켓 4kg (상)"=>44500,
    "샤인머스켓 4kg (보통)"=>35000,
    "건조 꽃송이버섯 (선물용 200g)"=>154000,
    "건조 꽃송이버섯 (선물용 150g)"=>117500,
    "건조 꽃송이버섯 (선물용 100g)"=>79000,
    "건조 꽃송이버섯 (실속형 100g)"=>77000,
    "건조 꽃송이버섯 (실속형 50g)"=>38500,
    "참송이버섯 500g (상)"=>31000,
    "참송이버섯 1kg (상)"=>60000,
    "참송이버섯 1kg (못난이)"=>36000
];

$newrow = ["구매자명"=>$_POST['f1'],
        "수취인명"=>$_POST['f2'],
        "옵션정보"=>$_POST['f3'],
        "수량"=>$_POST['f4'],
        "상품별 총 주문금액"=>$prices[$_POST['f3']],
        "결제수수료"=>0,
        "네이버 쇼핑 매출연동 수수료"=>0,
        "수취인연락처1"=>$_POST['f8'],
        "배송지"=>$_POST['f9'],
        "배송메세지"=>$_POST['f10']
];

$fp = fopen("lastupdate_custom.out", "r") or die("Unable to open file!");
$lastUpdate = fgets($fp);
$data = fgets($fp);
fclose($fp);
$rows = json_decode($data, true);
if (empty($rows)) {
    $rows = [];
}
$rows[] = $newrow;

$fp = fopen("lastupdate_custom.out", "wx") or die("Unable to open file!");
$encodedData = time() . "\n";
$encodedData .= json_encode($rows);
fwrite($fp, $encodedData);
fclose($fp);

echo '<script>alert("추가완료");</script>';
echo '<script>location.replace("/x2t/custom.php");</script>';
?>
