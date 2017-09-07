<?php
namespace Doorisan;
/**
 * 유용한 Static method 모음
 * @package Doorisan
 */
class Helper
{
    /**
     * 키 배열과 데이터 배열을 서로 매칭 시킨다.
     * @param array $fields
     * @param array $rows
     * @param string $key 해당 키로 정렬
     * @return array $fields와 $rows를 하나로 합친 결과 반환
     * @example
     *   $keys = ['a', 'b', 'c'];
     *   $values = ['111', 'apple', '321'];
     *   $result = \Doorisan\Helper::matchFields($keys, $values);
     *   print_r($result);
     *
     *   -----output-----
     *   Array
     *   (
     *       [a] => 111
     *       [b] => apple
     *       [c] => 321
     *   )
     */
    public static function matchFields(array $fields, array $rows, $key = null) {
        if (!is_array($rows) || empty($rows)) {
            return [];
        }
        $ret = [];
        if (is_array($rows[0])) { // is two depth array?
            foreach ($rows as $row) {
                $ret[] = array_combine($fields, $row);
            }
        } else {
            $ret = array_combine($fields, $rows);
        }
        if ($key) {
            $tmp = [];
            foreach($ret as $v) {
                $key = $v[$key];
                $tmp[$key] = $v;
            }
            $ret = $tmp;
            unset($tmp);
        }
        return $ret;

    }

    /**
     * 개발 모드에 대한 코드값을 문자열로 변경하여 반환
     * @param $code /app/settings.php::settings['mode'] 값
     * @param $type 'ko'|'en', default 'ko'
     * @return string $str $code값에 대응하는 한글이나 영문 문자열
     */
    public static function strMode($code, $type = 'ko') {
        $ko = ['devel'=>'개발', 'alpha'=>'알파', 'beta'=>'베타', 'real'=>'리얼'];
        $en = ['devel'=>'Devel', 'alpha'=>'Alpha', 'beta'=>'Beta', 'real'=>'Real'];
        if ($type == 'en') {
            return $en[$code];
        } else {
            return $ko[$code];
        }
    }

    public static function arrayInsert(&$array, $value, $index) {
        $len = count($array);
        $tmp = [];
        for ($i = 0; $i < $len; $i++) {
            if ($i == $index) {
                array_push($tmp, $value);
            }
            array_push($tmp, $array[$i]);
        }
        return $tmp;
    }
}
