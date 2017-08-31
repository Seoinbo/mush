<?php
namespace Doorisan\Cache;

use \Doorisan\Host;
/**
 * PHP-Redis wrapper class.
 * @package Doorisan\Cache
 * @link https://github.com/phpredis/phpredis#usage
 * @example app/dependencies.php 71
 */
class Redis extends \Redis implements CacheStorage
{
    protected $hosts = [];

    public function __construct($hosts = null) {
        $this->hosts = $hosts;
    }

    public function connect($host = 'localhost', $port = 6379, $timeout = 0.0, $isPersistence = false) {
        if (is_numeric($host)) {
            $userId = &$host;
            $hostInstance = new Host();
            $hostInstance->select($this->hosts);
            $hostInfo = $hostInstance->getInfo($userId);
            $host = $hostInfo['host'];
            $port = $hostInfo['port'];
        }
        if ($isPersistence) {
            parent::pconnect($host, $port, $timeout);
        } else {
            parent::connect($host, $port, $timeout);
        }
        return $this;
    }

    public function pconnect($host = 'localhost', $port = 6379, $timeout = 0.0) {
        $this->connect($host, $port, $timeout, true);
        return $this;
    }

    /**
     * Apply PHP serialize library
     */
    public function applyIgbinary() {
        $this->setOption(\Redis::OPT_SERIALIZER, \Redis::SERIALIZER_IGBINARY);
    }

    /**
     * Fetch cached data from caching server.
     * @param string $key cache key name.
     * @return string|null If key didn't exist, return null.
     */
    public function get($key) {
        $data = parent::get($key);
        if ($data === false) {
            return null;
        }
        // 데이터가 JSON 문자열이면 배열로 변환후 반환.
        $json = json_decode($data, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            return $json;
        }
        return $data;
    }

    /**
     * Store data to caching server.
     * @param $key Name of the key to store data.
     * @param $value Data.
     * @param int $expires TTL in seconds. lifetime of data.
     * @return none
     */
    public function set($key, $value, $expires = 0) {
        if (is_array($value)) {
            $value = json_encode($value);
        }
        parent::set($key, $value, $expires);
    }

    /**
     * Remove cached data related to the specified key from caching server.
     * @param $key Name of the key to remove data.
     * @return none
     */
    public function delete($key) {
        parent::delete($key);
    }

    /**
     * Remove all cached data.
     * @return none
     */
    public function flush() {
        // Redis is not suppoerted.
    }
}
