<?php
namespace App\Middlewares;

use \Slim\Http\Request;
use \Slim\Http\Response;

/**
 * HTTP 공통 헤더 정의를 위한 미들웨어
 * @package App\Middlewares
 */
class HttpCommonHeader
{
    /** @var \Slim\Container */
    protected $ci;
    protected $settings = [];

    public function __construct($ci) {
        $this->ci = $ci;
        $this->settings = $ci['settings']['httpCommonHeader'];
    }

    public function __invoke(Request $request, Response $response, $next) {
        // 런타임 경과 시간 계산 시작
        $microtime = $this->ci->get('microtime');
        $stime = $microtime->now();

        // 캐릭터셋 설정
        /** @var \Slim\Http\Response $response */
        $response = $response->withHeader('Content-type', 'application/json; charset=UTF-8');
        $response = $next($request, $response);

        // 런타임 경과 시간 계산 끝
        $etime = $microtime->now();
        $response = $response->withHeader('elapsed-time', $microtime->elapsedTime($stime, $etime) . 'ms');

        return $response;
    }
}
