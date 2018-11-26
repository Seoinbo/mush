<?php
header("Content-Type: text/html; charset=utf-8");

$type = $_REQUEST['type'] ? $_REQUEST['type'] : "file";

if($type == "file") {
    $fp = fopen("lastupdate.out", "wx") or die("Unable to open file!");
    fwrite($fp, time() . "\n");
    fclose($fp);
} elseif($type == "custom") {
    $fp = fopen("lastupdate_custom.out", "r") or die("Unable to open file!");
    $lastUpdate = fgets($fp);
    $origin = fgets($fp);
    fclose($fp);

    $fp = fopen("lastupdate_custom.bak", "wx") or die("Unable to open file!");
    $origin = $lastUpdate . "\n" . $origin;
    fwrite($fp, $origin);
    fclose($fp);

    $fp = fopen("lastupdate_custom.out", "wx") or die("Unable to open file!");
    fwrite($fp, time() . "\n");
    fclose($fp);
}

echo '<script>alert("초기화완료");</script>';
echo '<script>location.replace("/x2t/index.php");</script>';
?>
