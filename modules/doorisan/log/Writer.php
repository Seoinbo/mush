<?php
namespace Doorisan\Log;

use \Monolog\Logger;
use \Monolog\Formatter\LineFormatter;
use \Monolog\Handler\StreamHandler;
/**
 * @link https://github.com/Seldaek/monolog
 * @package Doorisan\Log
 */
class Writer extends Logger
{
    public $enabled = false;
    protected $format = "[%datetime%] [%channel%.%level_name%] %message% %context%\n";
    protected $path = "php://stderr";

    /**
     * @param string $name 로그 이름; 해당 로그를 구분 짓기 위한 이름으로 입력하면 로그 볼 때 필터링이 쉽다.
     * @param null $path 로그를 기록할 위치. ex) /var/log/example.log
     * @param null $format
     * @param array $handlers
     * @param array $processors
     */
    public function __construct($name = 'AppLog', $path = null, $format = null, array $handlers = array(), array $processors = array()) {
        if ($format == null) {
            $format = $this->format;
        }
        if ($path == null) {
            $path = $this->path;
        }
        $formatter = new LineFormatter($format, 'Y-m-d H:i:s');
        $streamHandler = new StreamHandler($path);
        $streamHandler->setFormatter($formatter);
        parent::__construct($name, [$streamHandler], $processors);
    }

    // 로깅을 멈춤
    public function disable() {
        $this->enabled = false;
    }

    // 멈춘 로깅 다시 시작
    public function enable() {
        $this->enabled = true;
    }

    /**
     * Adds a log record.
     *
     * @param int $level The logging level
     * @param string $message The log message
     * @param array $context The log context
     * @return Boolean Whether the record has been processed
     */
    public function addRecord($level, $message, array $context = []) {
        if (!$this->enabled) {
            return false;
        }
        return parent::addRecord($level, $message, $context);
    }
}
