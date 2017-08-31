<?php
namespace Doorisan\Cache;

/**
 * PHP Apc wrapper class.
 * @package Doorisan\Cache
 */
class Apc implements CacheStorage
{
    const TTL_30_DAYS = 2592000;

    public function get($k) {
        $res = apc_fetch($k);
        if (is_array($k) && ! is_array($res)) {
            $res = array();
        }
        if ($res === false) {
            return null;
        }
        return $res;
    }

    public function set($k, $v, $expires = 0) {
        if ($v === null) {
            return $this->delete($k);
        }
        if ($expires > self::TTL_30_DAYS) {
            $expires -= time();
        }
        return apc_store($k, $v, $expires);
    }

    public function add($k, $v, $expires = 0) {
        if ($expires > self::TTL_30_DAYS) $expires -= time();
        return apc_add($k, $v, $expires);
    }

    public function replace($k, $v, $expires = 0) {
        if ($expires > self::TTL_30_DAYS) $expires -= time();
        if (! $this->get($k)) return false;
        return $this->set($k, $v, $expires);
    }

    public function increment($k, $step = 1) {
        return apc_inc($k, $step);
    }

    public function decrement($k, $step = 1) {
        return apc_dec($k, $step);
    }

    public function delete($k) {
        apc_delete($k);
        return true;
    }

    public function flush() {
        return apc_clear_cache('user');
    }

    public function ttlEnabled() {
        return true;
    }

    public function load($input) {
        if ($input === null) return;
        if (is_array($input) || $input instanceof \Iterator) {
            foreach($input as $k=>$v) $this->__set($k, $v);
        }
    }

    public function __set($k, $v) {
        return $this->set($k, $v);
    }

    public function __get($k) {
        return $this->get($k);
    }

    public function __unset($k) {
        return $this->delete($k);
    }

    public function __isset($k) {
        $v = $this->get($k);
        if ($v === false || $v === null) return false;
        return true;
    }

    /**
     * Interface CacheStorage에 대한 일관성 유지를 위해 불필요하지만 추가
     * @param null $host
     * @return $this
     */
    public function connect($host = null) {
        return $this;
    }

    /**
     * Interface CacheStorage에 대한 일관성 유지를 위해 불필요하지만 추가
     */
    public function close() {}
}
