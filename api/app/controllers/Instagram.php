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
        if (!is_array($recnetData)) {
            return $response;
        }
        $retv = [];
        $tmp = [];
        foreach ($recnetData['data'] as $item) {
            $tmp["id"] = $item['id'];
            $tmp["type"] = $item['type'];
            $tmp["ctime"] = $item['created_time'];
            $tmp["text"] = $item['caption']['text'];
            $tmp["tags"] = $item['tags'];
            $tmp["images"] = $item['images'];
            $tmp["videos"] = isset($item['videos']) ? $item['videos'] : [];
            $tmp["like"] = $item['likes']['count'];
            $tmp["comment"] = $item['comments']['count'];
            $tmp["location"] = $item['location']['name'];
            // 하나의 게시물에 여러장의 이미지가 있는 형태이면 첫 번째만 가져간다.
            if ($item['type'] == "carousel") {
                $carouselItem = $item['carousel_media'][0];
                $tmp["type"] = $carouselItem['type'];
                $tmp["images"] = $carouselItem['images'];
                $tmp["videos"] = isset($carouselItem['videos']) ? $carouselItem['videos'] : [];;
            }
            // 텍스트의 테그 모두 제거, 홈페이지에서는 테그가 필요 없기 때문.
            $tmp["text"] = preg_replace("/\\n#.*/", "", $tmp["text"]);
            $tmp["text"] = preg_replace("/^#.*/", "", $tmp["text"]);


            $retv['count'] = count($tmp);
            $retv['data'][] = $tmp;
        }

        $response = $response->withJson($retv);
        return $response;
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
