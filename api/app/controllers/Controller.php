<?php
namespace App\Controllers;

use \Slim\Container;

class Controller
{
    /**
     * @var \Slim\Container $ci ContainerInterface
     */
    protected $ci;

    public function __construct(Container $ci) {
        $this->ci = $ci;
    }
}
