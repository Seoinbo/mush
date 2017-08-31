<?php
namespace App\Exceptions;

class ServerException extends ErrorException
{
    protected $status = 500;
}
    
