<?php
header("Content-Type: text/html; charset=utf-8");

require_once('../../modules/parsecsv/parsecsv.lib.php');
require_once('../../modules/phpexcel/PHPExcel.php');

if (count($_FILES) <= 0) {
   goback("먼저 파일을 첨부해주세요.");
}
if ($_FILES['attach']['error'] != 0) {
   goback("첨부파일에 오류가 있습니다.");
}

$fileType = "naver";
$xlsname = $_FILES['attach']['name'];
if(strpos($xlsname, "GeneralDelivery") !== false) {
    $fileType = "gmarket";
}

$type = $_REQUEST['type'] ? $_REQUEST['type'] : "overwrite";

$xlstmpname = $_FILES['attach']['tmp_name'];
$objReader = PHPExcel_IOFactory::createReader("Excel2007");
$objReader->setReadDataOnly(true);
$objPHPExcel = $objReader->load($xlstmpname);

if($fileType == "naver") {
    $objPHPExcel->getActiveSheet()->removeRow(1);
}

$ftype = PHPExcel_IOFactory::identify($xlstmpname);
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
$objWriter->save("output.csv");

$csv = new parseCSV();
$csv->parse("output.csv");
$csv->encoding('EUC-KR', 'UTF-8');

$data = [];
$keys = ["구매자명", "수취인명", "옵션정보", "수량", "상품별 총 주문금액", "결제수수료", "매출연동 수수료", "수취인연락처1", "배송지", "배송메세지", "상품명"];

foreach ($csv->data as $row) {
    if($fileType == "gmarket") {
        $row = parseGmarket($row, $keys);
    }
    $newRow = filter($row,  $keys);
    // print_r($newRow); exit;
    $data[] = $newRow;
}

$fp = fopen("write.time", "r") or die("Unable to open file!");
$writeTime = fgets($fp);
fclose($fp);

// $filename = "lastupdate_" . date("Ymd", $writeTime) . ".out";
$filename = "lastupdate.out";
if($type == "append") {
    $fp = fopen($filename, "r") or die("Unable to open file!");
    $lastUpdate = fgets($fp);
    $text = fgets($fp);
    fclose($fp);
    $org = json_decode($text, true);
    $data = array_merge($data, $org);
}
$fp = fopen($filename, "w") or die("Unable to open file!");
$encodedData = time() . "\n";
$encodedData .= json_encode($data);
fwrite($fp, $encodedData);
fclose($fp);

?>
<script>
alert("적용완료");
location.replace("/x2t");
</script>

<?php
function goback($msg) {
    echo '<script>alert("' . $msg . '"); location.replace("/x2t/upload.php");</script>';
}

function filter($row, $keys) {
    $tmp = [];
    foreach ($row as $key => $val) {
        //$key = iconv("EUC-KR", "UTF-8", $key);
        //$val = iconv("EUC-KR", "UTF-8", $val);
        if (in_array($key, $keys)) {
            $tmp[$key] = $val;
        }
    }
    return $tmp;
}

function parseGmarket($row, $keys) {
    $tmp = $row;
    foreach($keys as $i => $k) {
        if(isset($row[$k])) {
            $tmp[$k] = $row[$k];
        } else {
            $tmp[$k] = 0;
        }
    }

    $matchedKeys = ["수령인명"=>"수취인명", "주문옵션"=>"옵션정보", "판매단가"=>"상품별 총 주문금액", "수령인 휴대폰"=>"수취인연락처1", "주소"=>"배송지", "배송시 요구사항"=>"배송메세지"];
    foreach ($row as $key => $val) {
        if(isset($matchedKeys[$key])) {
            $tmp[$matchedKeys[$key]] = $val;
        }
    }

    // 계산을 하기위해 String 타입을 Integer로 변경
    foreach($tmp as $ke => $val) {
        if (in_array($ke, ["판매금액", "판매단가", "수량", "결제수수료", "상품별 총 주문금액", "정산예정금액", "배송비 금액", "서비스이용료", "판매자쿠폰할인"])) {
            $tmp[$ke] = intval(str_replace(",", "", $val));
        }
    }

    // 수수료 입력
    $tmp['결제수수료'] = $tmp['상품별 총 주문금액'] - $tmp['정산예정금액'];

    // 상품명 알아보기 쉽도록 변경
    if(strpos($tmp['상품명'], "건조 꽃송이버섯 100g") !== false) {
        if(isset($tmp['추가구성']) && !empty($tmp['추가구성'])) {
            $tmp['상품명'] = "[G마켓] 건조 꽃송이버섯 (선물용 100g)";
        } else  {
            $tmp['상품명'] = "[G마켓] 건조 꽃송이버섯 (실속형 100g)";
        }
    }
    return $tmp;
}
?>
