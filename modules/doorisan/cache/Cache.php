<?php
namespace Doorisan\Cache;

/**
 * PHP Cache class.
 * @package Doorisan\Cache
 */
class Cache
{
    protected $engine;
    protected $host = null;
    protected $enabled = true;

    const SEP = '_';

    public function __construct($engine = null) {
        $this->setEngine($engine);
    }

    public function setEngine($engine) {
        $implements = class_implements($engine);
        foreach($implements as $className) {
            if (strpos($className, 'CacheStorage') !== false) {
                break;
            }
            return false;
        }

        $this->engine = $engine;
        return true;
    }

    public function connect($host = null) {
        $this->host = $host;
        $this->engine->connect($host);
        return $this;
    }

    public function close() {
        $this->engine->close();
    }

    /**
     * ex) $this->generateKey("userinfo", 3420, "postfix1", "and more");
     * @param $keyword
     * @param ...$postfixes
     * @return string ex) "userinfo_3420_postfix1_and_more"
     */
    // public function generateKey($keyword, ...$postfixes) {
    //     $key = $keyword;
    //     if (is_numeric($this->host)) {
    //         $key .= self::SEP . $this->host;
    //     }
    //     if (is_array($postfixes)) {
    //         foreach($postfixes as $postfix) {
    //             $postfix = str_replace(' ', '', $postfix);
    //             $key .= self::SEP . $postfix;
    //         }
    //     }
    //     return $key;
    // }

    public function get($k) {
        if (!$this->enabled) {
            return null;
        }
        return $this->engine->get($k);
    }

    public function set($k, $v, $expires = 0) {
        $this->engine->set($k, $v, $expires);
    }

    public function delete($k) {
        $this->engine->delete($k);
    }

    public function flush(){
        $this->engine->flush();
    }

    public function disable() {
        $this->enabled = false;
    }

    public function enable() {
        $this->enabled = true;
    }

    public function status() {
        if ($this->enabled) {
            return "enabled";
        } else {
            return "disabled";
        }
     }
}
