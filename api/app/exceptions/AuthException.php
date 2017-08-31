<?php
namespace App\Exceptions;

class AuthException extends ErrorException
{
    protected $status = 401;
}
    
