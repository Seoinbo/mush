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

$xlsname = $_FILES['attach']['tmp_name'];
$objReader = PHPExcel_IOFactory::createReader("Excel5");
$objReader->setReadDataOnly(true);
$objPHPExcel = $objReader->load($xlsname);
$fileType=PHPExcel_IOFactory::identify($xlsname);
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
$objWriter->save("output.csv");

$csv = new parseCSV();
$csv->parse("output.csv");
$csv->encoding('EUC-KR', 'UTF-8');

$data = [];
$keys = ["구매자명", "수취인명", "옵션정보", "수량", "상품별 총 주문금액", "결제수수료", "네이버 쇼핑 매출연동 수수
료", "수취인연락처1", "배송지", "배송메세지"];
foreach ($csv->data as $row) {
    $newRow = filter($row,  $keys);
    $data[] = $newRow;
}
$fp = fopen("lastupdate.out", "w") or die("Unable to open file!");
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
function filter($row, $validKeys) {
    $tmp = [];
    foreach ($row as $key => $val) {
        //$key = iconv("EUC-KR", "UTF-8", $key);
        //$val = iconv("EUC-KR", "UTF-8", $val);
        if (in_array($key, $validKeys)) {
            $tmp[$key] = $val;
        }
    }
    return $tmp;
}
?>
