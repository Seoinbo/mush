<?php
namespace Doorisan\Database;

use \App\Exceptions\ServerException;
use \Doorisan\Host;

/**
 * PHP MySQLi wrapper class.
 * @package Doorisan\Database
 * @link http://php.net/manual/kr/book.mysqli.php
 * @example app/dependencies.php 21
 */
class MySQLi extends \MySQLi
{
    protected $hostInfo = [];

    public function __construct($hostInfo = null, $user = null, $password = null, $db = null, $port = 3306, $socket = null) {
        if (is_array($hostInfo)) { // 호스트 접속 정보이면
            $this->hostInfo = $hostInfo;
        } else if (is_string($hostInfo)) { // 아이피이면
            $this->connect($hostInfo, $port, $db, $user, $password, $socket);
        }
    }

    /**
     * @param string|int $host 아이피 또는 유저번호
     * @param int $port
     * @param null $db
     * @param null $user
     * @param null $password
     * @param null $socket
     * @return $this
     * @throws ServerException
     */
    public function connect($host = null, $port = 3306, $db = null, $user = null, $password = null, $socket = null) {
        if (!empty($this->hostInfo)) {
            $hostInstance = new Host();
            $hostInstance->select($this->hostInfo);
            if (is_numeric($host)) { // 사용자 아이디이면
                $hostInfo = $hostInstance->getInfo($host); // $host is userid
            } else { // null이면 0번 인덱스의 호스트 정보를 적용
                $hostInfo = $this->hostInfo[0];
            }
            $host = $hostInfo['host'];
            $port = $hostInfo['port'];
            $db = $hostInfo['dbname'];
            $user = $hostInfo['user'];
            $password = $hostInfo['password'];
        }
        parent::__construct($host, $user, $password, $db, $port, $socket);
        if (!is_null($this->connect_error)) {
            throw new ServerException('Error MySql Connection', 'ER0001', E_ERROR, [$host, $db, $this->connect_error], __FILE__, __LINE__);
        }
        parent::set_charset('utf8');
        return $this;
    }

    public function execute( $query /*, ... */ ){
        $args = func_get_args();
        array_shift($args);
        return $this->query( $this->prep_args( $query, $args ) );
    }

    public function query($query, $mode = MYSQLI_STORE_RESULT){
        $res = parent::query($query, $mode);
        if (!$res) {
            throw new ServerException('query', 'ER0001', E_ERROR, [$this->error, $query], __FILE__, __LINE__);
        }
        return $res;
    }

    public function multi_query($query){
        $res = parent::multi_query($query);
        if (!$res) {
            throw new ServerException('multi_query', 'ER0001', E_ERROR, [$this->error, $query], __FILE__, __LINE__);
        }
        return $res;
    }

    public function real_query( $query ){
        $res = parent::real_query( $query );
        if (!$res) {
            throw new ServerException('real_query', 'ER0001', E_ERROR, [$this->error, $query], __FILE__, __LINE__);
        }
        return $res;
    }

    public function close(){
        return parent::close();
    }

    public function prepare($query){
        $args = func_get_args();
        array_shift($args);
        $stmt = parent::prepare($query);
        if (!$stmt) {
            throw new ServerException('prepare', 'ER0001', E_ERROR, [$this->error, $query], __FILE__, __LINE__);
        }

        if(count($args) > 0) {
            call_user_func_array(array($stmt, 'bind_param'), $this->getArgs($args));
        }
        $stmt->execute();
        $res = $stmt->get_result();
        if (!$res) {
            throw new ServerException('get_result', 'ER0001', E_ERROR, [$this->error, $query], __FILE__, __LINE__);
        }
        $stmt->close();

        return $res;
    }

    /**
     * Warning: Parameter 2 to mysqli_stmt::bind_param() expected to be a reference, value given
     * @param $args
     * @return array
     */
    private function getArgs($args) {
        $refs = [];
        foreach($args as $key => $value) {
            $refs[$key] = &$args[$key];
        }
        return $refs;
    }

    public function autocommit($mode){
        return parent::autocommit($mode);
    }

    public function begin_transaction($flags = null, $name = null) {
        return parent::begin_transaction($flags, $name);
    }

    public function rollback($flags = null, $name = null) {
        return parent::rollback($flags, $name);
    }

    public function commit($flags = null, $name= null) {
        return parent::commit($flags, $name);
    }

    public function prep( $query /*, ... */ ){
        $args = func_get_args();
        array_shift($args);
        return $this->prep_args( $query, $args );
    }

    public function prep_args($query, array $args) {
        if( ! $args || count( $args ) < 1 ) return $query;
        $conn = $this;
        return Query::prepare(
            $query,
            $args,
            function($v) use( $conn ){ return "'" . $conn->real_escape_string( $v ) . "'"; }
        );
    }

    public function isa( $name ){
        if( $this instanceof $name ) return true;
        $name = strtolower( $name );
        if( $name == 'mysql' ) return true;
        return false;
    }

    public function __toString(){
        @ $res ='(MySQLi object - ' . "\n" .
            '  [affected_rows] => ' . $this->affected_rows . "\n" .
            '  [client_info] => ' . $this->client_info . "\n" .
            '  [client_version] => ' . $this->client_version . "\n" .
            '  [connect_errno] => ' . $this->connect_errno . "\n" .
            '  [connect_error] => ' . $this->connect_error . "\n" .
            '  [errno] => ' . $this->errno . "\n" .
            '  [error] => ' . $this->error . "\n" .
            '  [field_count] => ' . $this->field_count . "\n" .
            '  [host_info] => ' . $this->host_info . "\n" .
            '  [info] => ' . $this->info . "\n" .
            '  [insert_id] => ' . $this->insert_id . "\n" .
            '  [server_info] => ' . $this->server_info . "\n" .
            '  [server_version] => ' . $this->server_version . "\n" .
            '  [sqlstate] => ' . $this->sqlstate . "\n" .
            '  [protocol_version] => ' . $this->protocol_version . "\n" .
            '  [thread_id] => ' . $this->thread_id . "\n" .
            '  [warning_count] => ' . $this->warning_count . "\n" .
            ')';
        return $res;
    }

}
