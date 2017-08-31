<?php

// -------------------------/
//   Universal modules     <
// -------------------------\

// Host manager
$container['host'] = function ($c) {
    return new \Doorisan\Host($c['settings']['hosts']);
};

// Helper
$container['helper'] = function () {
    return new \Doorisan\Helper();
};

// --------------------------/
//   Database connections   <
// --------------------------\

// Service DB
$container['servicedb'] = function ($c) {
    $hosts = $c->host->select(\Doorisan\Host::DB_SEVICE)->getHosts();
    return new \Doorisan\Database\MySQLi($hosts);
};

// -----------------------/
//   Cache connections   <
// -----------------------\

// Common Cache
$container['ccache'] = function ($c) {
    $cache = new \Doorisan\Cache\Cache($c->fileCache);
    if ($c['settings']['cache']['enabled'] === false) {
        $cache->disable();
    }
    return $cache;
};

// Key Value Pair
$container['kvp'] = function () {
    return new \Doorisan\Cache\KVP();
};

// File cache
$container['fileCache'] = function () {
    return new \Doorisan\Cache\File();
};



// -----------------/
//   Middlewares   <
// -----------------\

$container['mwHttpCommonHeader'] = function ($c) {
    return new \App\Middlewares\HttpCommonHeader($c);
};

$container['mwAccessLogger'] = function ($c) {
    return new \App\Middlewares\Logger($c);
};

// -----------------/
//   Logger        <
// -----------------\

$container['errorLogger'] = function($c) {
    $config = $c['settings']['log']['error'];
    $path = $config['path'] . $config['file'];
    $logName = 'Default';
    $format = "[%datetime%] [%channel%] [%level_name%] %message% %context%\n";
    $logger = new \Doorisan\Log\Writer($logName, $path, $format);
    if ($config['enabled']) {
        $logger->enable();
    } else {
        $logger->disable();
    }
    return $logger;
};

// Request/Response logger
$container['accessLogger'] = function($c) {
    $config = $c['settings']['log']['access'];
    $path = $config['path'] . $config['file'];
    $logName = 'AccessLog';
    $format = "[%datetime%] %message%\n";
    $logger = new \Doorisan\Log\Writer($logName, $path, $format);
    if ($config['enabled']) {
        $logger->enable();
    } else {
        $logger->disable();
    }
    return $logger;
};

// -------------------/
//   HTTP services   <
// -------------------\

// CURL for Index
// $container['icurl'] = function($c) {
//     $hosts = $c->host->select(\Doorisan\Host::WEB_INDEX)->getHosts();
//     return new \Doorisan\Http\Curl($hosts);
// };

// -----------------------/
//   DateTime services   <
// -----------------------\

$container['date'] = function() {
    return new \Doorisan\Date\Date();
};

$container['microtime'] = function() {
    return new \Doorisan\Date\Microtime();
};

// -------------------------/
//   Validation services   <
// -------------------------\

$container['validator'] = function() {
    return new \Doorisan\Validation\Validator();
};
