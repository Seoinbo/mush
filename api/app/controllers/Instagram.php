<?php
namespace App\Controllers;

use \Slim\Container;
use \Slim\Http\Request;
use \Slim\Http\Response;
use \App\Exceptions\ServerException;

use \Doorisan\Http\Curl;
use \Doorisan\Date\Date;
use \Doorisan\Host;

class Instagram extends Controller
{
    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws ServerException
     */
    public function recent(Request $request, Response $response) {
        $recnetData = $this->recentData();
        $response = $response->withJson($recnetData);
        return $response;
    }

    private function reload() {

    }


    private function recentData() {
        $token = $this->ci['settings']['instagram']['accessToken'];
        $host = $this->ci['settings']['curl']['instagram'];
        $curl = new Curl();
        $curl->select($host);
        $res = $curl->get("/v1/users/self/media/recent/", [
            'access_token' => $token,
            'count' => 10
        ]);
        if ($curl->error()) {
            throw new ServerException(
                "Failed to get instagram access-token.",
                "ER0001",
                E_ERROR,
                [],
                __FILE__,
                __LINE__
            );
        }
        $data = $res->parseJSON();
        return $data;
    }
}
