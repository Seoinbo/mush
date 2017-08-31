<?php
namespace App\Exceptions;

/**
 * 이 어플리케이션에서 기본이 되는 Exception,
 * 모든 Exception 클래스들은 이 것을 상속 받아야 함.
 * @package App\Exceptions
 */
class ErrorException extends \ErrorException
{
    protected $clientMessages = [
        'ER0001'=>'서버와 통신 중 오류가 발생하였습니다. 마을 정보를 다시 불러옵니다.',
        'ER0002'=>'이미 처리한 요청입니다.',
        'ER0003'=>'잘 못된 데이터가 전송되어, 마을 정보를 다시 불러옵니다.',
        'ER0004'=>'결제 도중 오류가 발생 하였습니다. 도구함>위미>1:1 문의로 문의 해 주세요.',
        'ER0007'=>'현재 다른 기기에서 접속 중입니다.',
        'ER0008'=>'계정 생성 중 오류가 발생하였습니다.',
        //'ER001F'=>'방문기록을 저장하지 못했습니다.'
    ];
    protected $status = 500;
    protected $errorCode = 'ER0001';
    protected $level = 400;
    protected $debugInfo = [];

    public function __construct($message = "", $errorCode = 0, $severity = E_ERROR, $debugInfo = [], $filename = __FILE__, $lineno = __LINE__, $previous = null) {
        $this->errorCode = $errorCode;
        $this->debugInfo = $debugInfo;
        parent::__construct($message, 0, $severity, $filename, $lineno, $previous);
    }

    /**
     * 현재 발생한 에러에 대한 정보를 반환
     * @param bool $json JSON형태로 반환 할 것인가? default false
     * @return array|string
     */
    public function getError($json = false) {
        if (isset($this->clientMessages[$this->errorCode])) {
            $message = $this->clientMessages[$this->errorCode];
        } else {
            $message = $this->message;
        }
        $error = self::formatArray($this->status, $this->errorCode, $message, $this->line);
        if ($json) {
            $error = json_encode($error);
        }
        return $error;
    }

    /**
     * 에러 출력 포맷을 통일하기 위한 매소드.
     * @param int $status
     * @param string $errorCode
     * @param string $message
     * @param int $line
     * @return array
     */
    public static function formatArray($status = 500, $errorCode = 'ER0001', $message = '', $line = 0) {
        return [
            'status'=>$status,
            'code'=>$errorCode,
            'message'=>$message,
            'line'=>$line
        ];
    }

    public function getDebugInfo() {
        return $this->debugInfo;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getErrorCode() {
        return $this->errorCode;
    }
}
