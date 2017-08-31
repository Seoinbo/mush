<?php
namespace Doorisan\Cache;

/**
 * PHP Memcached wrapper class.
 * @package Doorisan\Cache
 * @link http://memcached.org/
 * @link http://php.net/manual/kr/book.memcached.php
 * @example app/dependencies.php 81
 */
class Memcached extends \Memcached implements CacheStorage
{
    public function __construct($hosts = null, $persistentId = null) {
        parent::__construct($persistentId);
        $this->setOption(\Memcached::OPT_TCP_NODELAY, true);

        if (is_array($hosts)) {
            foreach($hosts as $info) {
                $this->addServer($info['host'], $info['port'], $info['weight']);
            }
        }
    }

    /**
     * Apply PHP serialize library
     */
    public function applyIgbinary() {
        if(\Memcached::HAVE_IGBINARY) {
            $this->setOption(\Memcached::OPT_SERIALIZER, \Memcached::SERIALIZER_IGBINARY);
        }
    }

    public function get($key) {
        $result = parent::get($key);
        if(false === $result) {
            $result = null;
        }
        return $result;
    }

    /**
     * Interface CacheStorage에 대한 일관성 유지를 위해 불필요하지만 추가
     * @param null $host
     * @return $this
     */
    public function connect($host = null) {
        return $this;
    }

    public function close() {
        $this->quit();
    }
}
