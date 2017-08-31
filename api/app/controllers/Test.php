<?php
namespace App\Controllers;

use \Slim\Http\Request;
use \Slim\Http\Response;
use \App\Exceptions\ServerException;

use \Doorisan\Date\Date;

class Test extends Controller
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws ServerException
     */
    public function test(Request $request, Response $response) {
        $response->withJson(["text"=>"hello"]);
        echo "aaa";
        return $response;
    }
}
