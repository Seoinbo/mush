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
    public static $CACHE_KEY_RECENT = "media::recent";

    /**
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws ServerException
     */
    public function recent(Request $request, Response $response) {
        // Loading cached data.
        $cachedData = $this->ci->ccache->get(self::$CACHE_KEY_RECENT);
        if (!empty($cachedData)) {
            // Write json-data to body.
            $response = $response->write($cachedData);
            return $response;
        }
        // Loading noncached data.
        $recnetData = $this->recentData();
        if (!is_array($recnetData)) {
            return $response;
        }
        $data = $recnetData['data'];

        $fixdList = [
            // ["index" => 0, "id" => "1596282552090837073_5959045462"],
            ["index" => 2, "id" => "1597197042508548748_5959045462"]
        ];
        if (is_array($fixdList)) {
            foreach ($fixdList as $fixdItem) {
                $item = $this->mediaData($fixdItem['id']);
                $data = $this->insertArrayByIdx($data, $item['data'], $fixdItem['index']);
            }
        }

        $tmp = [];
        $retv = [];
        foreach($data as $item) {
            $tmp = $this->normalize($item);
            $retv['data'][] = $tmp;
        }
        $retv['count'] = count($data);
        $retvWithJson = json_encode($retv);

        // Caching data.
        $this->ci->ccache->set(self::$CACHE_KEY_RECENT, $retvWithJson, 21600); // expired => 6hour

        // Write json-data to body.
        $response = $response->write($retvWithJson);
        return $response;
    }

    // 내가 원하는 사진을 원하는 위치로 이동
    private function insertArrayByIdx(&$array, $value, $index) {
        $len = count($array);
        $tmp = [];
        for ($i = 0; $i < $len; $i++) {
            if ($i == $index) {
                array_push($tmp, $value);
            }
            if ($array[$i]['id'] == $value['id']) {
                continue;
            }
            array_push($tmp, $array[$i]);
        }
        return $tmp;
    }

    private function normalize($src) {
        $dest = [];
        $dest["id"] = $src['id'];
        $dest["type"] = $src['type'];
        $dest["ctime"] = $src['created_time'];
        $dest["text"] = $src['caption']['text'];
        $dest["tags"] = $src['tags'];
        $dest["images"] = $src['images'];
        $dest["videos"] = isset($src['videos']) ? $src['videos'] : [];
        $dest["like"] = $src['likes']['count'];
        $dest["comment"] = $src['comments']['count'];
        $dest["location"] = $src['location']['name'];
        // 하나의 게시물에 여러장의 이미지가 있는 형태이면 첫 번째만 가져간다.
        if ($src['type'] == "carousel") {
            $carouselItem = $src['carousel_media'][0];
            $dest["type"] = $carouselItem['type'];
            $dest["images"] = $carouselItem['images'];
            $dest["videos"] = isset($carouselItem['videos']) ? $carouselItem['videos'] : [];;
        }
        // 텍스트의 테그 모두 제거, 홈페이지에서는 테그가 필요 없기 때문.
        $dest["text"] = preg_replace("/\\n#.*/", "", $dest["text"]);
        $dest["text"] = preg_replace("/^#.*/", "", $dest["text"]);
        return $dest;
    }

    private function getData($url, $params) {
        $host = $this->ci['settings']['curl']['instagram'];
        $curl = new Curl();
        $curl->select($host);
        $res = $curl->get($url, $params);
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

    private function recentData() {
        $token = $this->ci['settings']['instagram']['accessToken'];
        return $this->getData("/v1/users/self/media/recent/", [
            'access_token' => $token,
            'count' => 10
        ]);
    }

    // 하나의 인스타그램 미디어(사진, 동영상)을 가져옴
    private function mediaData($mediaId) {
        $token = $this->ci['settings']['instagram']['accessToken'];
        return $this->getData("/v1/media/$mediaId", [
            'access_token' => $token
        ]);
    }
}
