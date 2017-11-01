<?php
header("Content-Type: text/html; charset=utf-8");

$fp = fopen("lastupdate_custom.out", "r") or die("Unable to open file!");
$lastUpdate = fgets($fp);
$origin = fgets($fp);
fclose($fp);

$fp = fopen("lastupdate_custom.bak", "wx") or die("Unable to open file!");
$origin = $lastUpdate . "\n" . $origin;
fwrite($fp, $origin);
fclose($fp);

$fp = fopen("lastupdate_custom.out", "wx") or die("Unable to open file!");
fwrite($fp, "");
fclose($fp);

echo '<script>alert("초기화완료");</script>';
echo '<script>location.replace("/x2t/custom.php");</script>';
?>
