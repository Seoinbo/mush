<?php
// Error handlers

$container['notFoundHandler'] = function () {
    /** @noinspection PhpUnusedParameterInspection */
    /** @noinspection PhpDocSignatureInspection */
    return function (\Slim\Http\Request $request, \Slim\Http\Response $response) {
        return $response
               ->withStatus(404)
               ->withJson(\App\Exceptions\ErrorException::formatArray(
                   404,
                   'ER0001',
                   'Not found anything matching the Request-URI'
               ));
    };
};

/**
 * @param \Slim\Container $c
 * @return callable
 */
$container['errorHandler'] = function ($c) {
    /** @noinspection PhpUnusedParameterInspection */
    /** @noinspection PhpDocSignatureInspection */
    return function (\Slim\Http\Request $request, \Slim\Http\Response $response, $exception) use ($c) {

        // 어플리케이션 Exception이 아닌 경우에 대한 분기
        /** @var \App\Exceptions\ErrorException $exception */
        $exceptionString = $exception->__toString();
        if (strpos($exceptionString, 'App\Exceptions') === false) {
            $error = \App\Exceptions\ErrorException::formatArray(500, 'ER0001', 'Internal Server Error');
            $level = \Doorisan\Log\Writer::ERROR;
            $detail = [];
            $message = $exceptionString;
        } else {
            $error = $exception->getError();
            switch ($exception->getSeverity()) {
            case E_NOTICE:
                $level = \Doorisan\Log\Writer::NOTICE;
                break;
            case E_WARNING:
                $level = \Doorisan\Log\Writer::WARNING;
                break;
            case E_ERROR:
            default:
                $level = \Doorisan\Log\Writer::ERROR;
            }
            $detail = [
                'status'=>$exception->getStatus(),
                'code'=>$exception->getErrorCode(),
                'file'=>$exception->getFile(),
                'line'=>$exception->getLine(),
                'trace0'=>$exception->getTrace()[0],
                'debugInfo'=>$exception->getDebugInfo()
            ];
            $message = json_encode($exception->getMessage());
        }

        $logger = $c->get('errorLogger');
        $logger->log($level, $message, $detail);

        $logger = $c->get('accessLogger');
        $logger->info('Response ' . $error['status'] . ' ' . json_encode($error));

        return $c['response']
               ->withStatus($error['status'])
               ->withJson($error);
    };
};

$container['notAllowedHandler'] = function () {
    /** @noinspection PhpUnusedParameterInspection */
    /** @noinspection PhpDocSignatureInspection */
    return function (\Slim\Http\Request $request, \Slim\Http\Response $response, $methods) {
        return $response
               ->withStatus(405)
               ->withHeader('Allow', implode(', ', $methods))
               ->withJson(\App\Exceptions\ErrorException::formatArray(
                   405,
                   'ER0001',
                   'Method must be one of: ' . implode(', ', $methods)
               ));
    };
};
