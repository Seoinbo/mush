<?php
namespace Doorisan\Validation;

use \Valitron\Validator as _validator;
use \App\Exceptions\ErrorException;

/**
 * @link https://github.com/vlucas/valitron
 * @package Doorisan\Validation
 */
class Validator extends _validator
{
    public function __construct($data = [], $fields = [], $lang = null, $langDir = null ) {
        if (!empty($data)) {
            $this->init($data, $fields, $lang, $langDir);
        }
    }

    public function init($data, $fields = [], $lang = null, $langDir = null) {
        if (empty($this->_fields)) {
            parent::__construct($data, $fields, $lang, $langDir);
        } else {
            $this->reset();
            $this->_fields = !empty($fields) ? array_intersect_key($data, array_flip($fields)) : $data;
        }
        return $this;
    }

    /**
     * 유효성 검사를 하고 유효하지 않을 땐 Exception을 날림
     * @param int $status for ErrorException
     * @param string $errorCode for ErrorException
     * @param int $level for ErrorException
     * @return bool if success true, else throw ErrorException
     * @throws ErrorException
     */
    public function validateWithException($status = 400, $errorCode = 'ER0003', $level = E_ERROR) {
        if (!$this->validate()) {
            $exception =  new ErrorException(
                "Invalid variables",
                $errorCode,
                $level,
                $this->errors(),
                '',
                0
            );
            $exception->setStatus($status);
            throw $exception;
        }
        return true;
    }
}
