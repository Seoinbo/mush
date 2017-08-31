<?php
namespace Doorisan\Cache;

/**
 * KVP(Key value pairs) is internal data storage
 * @package Doorisan\Cache
 * @example
 *   $data = ['a'=>1, 'b'=>2];
 *   $kvp = new \Doorisan\Cache\KVP($data);
 *   $kvp->set('b', '3');
 *   print_r($kvp->get('b'));
 *
 *   -----output-----
 *   3
 */
class KVP implements CacheStorage
{

    protected $__d = array();

    public function __construct( $input = null ){
        $this->load( $input );
    }

    /**
     * @param $name
     * @param $value
     * @param int $expires 만료시간. 이 클래스에서는 사용되지 않지만
     * CacheStorage 인터페이스 조건을 만족시키기 위한 파라미터.
     * @return bool
     */
    public function set($name, $value, $expires = 0){
        if( $value === null ) return $this->delete( $name );
        $this->__d[ $name ] = $value;
        return true;
    }

    public function increment($name, $value = 1) {
        if(! isset($this->__d[$name]) ) return false;
        return $this->__d[$name] += $value;
    }

    public function decrement($name, $value = 1) {
        if(! isset($this->__d[$name]) ) return false;
        return $this->__d[$name] -= $value;
    }

    public function add( $name, $value, $ttl = 0 ){
        if( $this->__isset( $name ) ) return false;
        return $this->set( $name, $value, $ttl );
    }

    public function replace( $name, $value, $ttl = 0 ){
        if( ! $this->__isset( $name ) ) return false;
        return $this->set( $name, $value, $ttl );
    }

    public function get($name){
        if( is_array( $name ) ){
            $res = array();
            foreach( $name as $_k ){
                $v = $this->__get( $_k );
                if( $v === null ) continue;
                $res[ $_k ] = $v;
            }
            return $res;
        }
        if( ! is_scalar( $name ) ) return null;
        return isset( $this->__d[ $name ] ) ? $this->__d[ $name ] : null;

    }

    public function delete($name){
        unset( $this->__d[ $name ] );
        return true;
    }

    public function flush(){
        $this->__d = array();
    }

    public function load( $input ){
        if( $input === null ) return;
        if( is_array( $input ) || $input instanceof \Iterator ) {
            foreach( $input as $k=>$v ) $this->__set( $k, $v);
        }
        // all done.
    }

    public function ttlEnabled(){
        return false;
    }

    public function __set( $k, $v ){
        $this->set( $k, $v );
        return $v;
    }

    public function __get( $k ){
        return $this->get( $k );
    }

    public function __unset( $k ){
        $this->delete( $k );
    }

    public function __isset( $k ){
        return isset( $this->__d[ $k ] );
    }

    public function __toString(){
        $out = get_class( $this ) . " {\n";
        foreach( $this->__d as $k=>$v ){
            if( ! is_scalar( $v ) ) $v = print_r( $v, true);
            if( ( $len = strlen( $v ) ) > 100 ) $v = substr($v, 0, 100) . '... (' . $len . ')';
            $v = str_replace("\n", '\n',  str_replace("\r", '\r', $v));
            $out .= '    [' . $k . '] => ' . $v . "\n";
        }
        $out .= "}\n";
        return $out;
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
