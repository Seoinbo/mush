<?php
require __DIR__ . '/../../vendor/autoload.php';
$settings = require __DIR__ . '/../../app/settings.php';
define('SWG_BASE_PATH',  $settings['settings']['version']);

$path = __DIR__ . '/../../app';
$swagger = \Swagger\scan($path);
header('Content-Type: application/json');
echo $swagger;
