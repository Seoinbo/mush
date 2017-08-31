<?php
namespace App\Middlewares;

use \Slim\Http\Request;
use \Slim\Http\Response;

/**
 * 로깅을 위한 미들웨어
 * @package App\Middlewares
 */
class Logger
{
    protected $ci = null;
    protected $accessLogger;

    /**
     * @param \Slim\Container $ci
     */
    public function __construct($ci) {
        $this->ci= $ci;
        $this->accessLogger = $this->ci->get('accessLogger');
    }

    public function __invoke(Request $request, Response $response, $next) {
        $response = $this->logRequest($request, $response);
        $response = $next($request, $response);
        $response = $this->logResponse($request, $response);

        return $response;
    }

    protected function logRequest(Request $request, Response $response) {
        $uri = $request->getUri();
        $reqBody = $request->getParsedBody();
        if (is_array($reqBody)) {
            $reqBody = json_encode($reqBody);
        }
        $log = 'Request ' . $uri . ' ' . $reqBody;
        $this->accessLogger->info($log);

        return $response;
    }

    protected function logResponse(
        /** @noinspection PhpUnusedParameterInspection */
        Request $request, Response $response) {
        $status = $response->getStatusCode();
        $resBody = $response->getBody();
        $log = 'Response ' . $status . ' ' . $resBody;
        $this->accessLogger->info($log);

        return $response;
    }
}
