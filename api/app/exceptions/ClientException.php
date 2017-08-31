<?php
namespace App\Exceptions;

class ClientException extends ErrorException
{
    protected $status = 400;
}
    
