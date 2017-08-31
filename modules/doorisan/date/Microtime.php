<?php
namespace Doorisan\Date;

/**
 * 모든 계산과 결과의 단위는 ms 입니다.
 * @package Doorisan\Date
 */
class Microtime
{
    const A_MINUTE = 60000;
    const AN_HOUR = 3600000;
    const A_DAY = 86400000;
    const A_WEEK = 604800000; // 60 * 60 * 24 * 7 * 1000
    const DAYS_30 = 2592000000; // 30일

    /**
     * Return current Unix timestamp with microseconds. ex) 1478048589.831
     * @return mixed
     */
    public static function now(){
        $t = explode(' ', microtime());
        return round(($t[1] + $t[0]) * 1000);
    }

    /**
     * 경과 시간 계산
     * @param $start
     * @param $end
     * @return float microseconds
     */
    public static function elapsedTime($start, $end){
        return round($end - $start, 4);
    }
}
