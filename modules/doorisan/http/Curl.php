<?php
namespace Doorisan\Http;

use \Doorisan\Log\Writer;
use \Doorisan\Host;

/**
 * A basic CURL wrapper
 *
 * See the README for documentation/examples or http://php.net/curl for more information about the libcurl extension for PHP
 *
 * @package curl
 * @author Sean Huber <shuber@huberry.com>
 **/
class Curl {

    /**
     * The file to read and write cookies to for requests
     *
     * @var string
     **/
    public $cookie_file;

    /**
     * Determines whether or not requests should follow redirects
     *
     * @var boolean
     **/
    public $follow_redirects = true;

    /**
     * An associative array of headers to send along with requests
     *
     * @var array
     **/
    public $headers = array();

    /**
     * An associative array of CURLOPT options to send along with requests
     *
     * @var array
     **/
    public $options = array();

    /**
     * The referer header to send along with requests
     *
     * @var string
     **/
    public $referer;

    /**
     * The user agent to send along with requests
     *
     * @var string
     **/
    public $user_agent;

    /**
     * Stores an error string for the last request if one occurred
     *
     * @var string
     * @access protected
     **/
    protected $error = '';

    /**
     * Stores resource handle for the current CURL request
     *
     * @var resource
     * @access protected
     **/
    protected $request;

    protected $totaltime;

    /**
     * The file to read and write cookies to for requests
     *
     * @var int
     **/
    public $curlopt_connecttimeout = 3;

    /**
     * The file to read and write cookies to for requests
     *
     * @var int
     **/
    public $curlopt_timeout = 15;

    /**
     * The maximum amount of persistent connections that are allowed.
     * When the limit is reached, CURLOPT_CLOSEPOLICY is used to determine which connection to close.
     *
     * @var int
     **/
    public $curlopt_maxconnects = 128;

    /**
     * header option keep alive set, gzip
     */
    public $header_options = array('Accept-Encoding: compress, gzip'); // array('Accept-Encoding: compress, gzip','Connection: Keep-Alive', 'Keep-Alive: 300');

     /**
      * Error logger
      */
     protected $logWriter;

     protected $hosts = [];
     protected $host = '';

    /**
     * Initializes a Curl object
     *
     * Sets the $cookie_file to "curl_cookie.txt" in the current directory
     * Also sets the $user_agent to $_SERVER['HTTP_USER_AGENT'] if it exists, 'Curl/PHP '.PHP_VERSION.' (http://github.com/shuber/curl)' otherwise
     * @param array $hosts
     */
    function __construct($hosts = null) {
        $this->hosts = $hosts;

        //$this->cookie_file = dirname(__FILE__).DIRECTORY_SEPARATOR.'curl_cookie.txt';
        $this->user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'Curl/PHP '.PHP_VERSION.' (http://github.com/shuber/curl)';
        $this->logWriter = new Writer('Curl');
    }

    /**
     * Set base-host
     * @param $host
     * @return $this
     */
    function select($host) {
        if (is_numeric($host) && !empty($this->hosts)) {
            $userId = &$host;
            $hostInstance = new Host();
            $hostInstance->select($this->hosts);
            $hostInfo = $hostInstance->getInfo($userId);
            $host = $hostInfo['host'];
        }
        $this->host = $host;
        return $this;
    }

    /**
     * Makes an HTTP DELETE request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars
     * @return CurlResponse object
     **/
    function delete($url, $vars = array()) {
        return $this->request('DELETE', $url, $vars);
    }

    /**
     * Returns the error string of the current request if one occurred
     *
     * @return string
     **/
    function error() {
        return $this->error;
    }

    /**
     * Makes an HTTP GET request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars
     * @return CurlResponse
     **/
    function get($url, $vars = array()) {
        if (!empty($vars)) {
            $url .= (stripos($url, '?') !== false) ? '&' : '?';
            $url .= (is_string($vars)) ? $vars : http_build_query($vars, '', '&');
        }
        return $this->request('GET', $url);
    }


    /**
     * Set Timeout option
     * @param int $to
     * @param int $cto
     * @return bool
     */
    function set_timeout( $to = 5, $cto = 3 ) {
        $this->curlopt_timeout = $to;
        $this->curlopt_connecttimeout = $cto;
        return true;
    }


    /**
     * Get Total time
     **/
    function get_time() {
        return $this->totaltime;
    }

    /**
     * Makes an HTTP HEAD request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars
     * @return CurlResponse
     **/
    function head($url, $vars = array()) {
        return $this->request('HEAD', $url, $vars);
    }

    /**
     * Makes an HTTP POST request to the specified $url with an optional array or string of $vars
     *
     * @param string $url
     * @param array|string $vars
     * @return CurlResponse|boolean
     **/
    function post($url, $vars = array()) {
        return $this->request('POST', $url, $vars);
    }

    /**
     * Makes an HTTP PUT request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param array|string $vars
     * @return CurlResponse|boolean
     **/
    function put($url, $vars = array()) {
        return $this->request('PUT', $url, $vars);
    }


    /**
     * Makes an HTTP PUT request to the specified $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $url
     * @param string $vars
     * @return CurlResponse|boolean
     **/
    function json($url, $vars) {
        return $this->request('JSON', $url, $vars);
    }


    /**
     * Makes an HTTP request of the specified $method to a $url with an optional array or string of $vars
     *
     * Returns a CurlResponse object if the request was successful, false otherwise
     *
     * @param string $method
     * @param string $url
     * @param array|string $vars
     * @return CurlResponse|boolean
     **/
    function request($method, $url, $vars = array()) {
        $this->error = null;
        $this->request = curl_init();
        if (is_array($vars)) $vars = http_build_query($vars, '', '&');

        if ((strpos($this->host, 'http://') === false) && (strpos($this->host, 'https://') === false)) {
            $url = 'http://' . $this->host . $url;
        } else {
            $url = $this->host . $url;
        }

        $this->set_request_method($method);
        $this->set_request_options($url, $vars);
        if( $method == 'JSON' ) {
            $this->set_request_json_headers( $vars );
        } else {
            $this->set_request_headers();
        }

        $response = curl_exec($this->request);
        $this->totaltime = curl_getinfo($this->request, CURLINFO_TOTAL_TIME);

        if ($response) {
            $response = new CurlResponse($response);
        } else {
            $this->error = 'total time :'.$this->totaltime.' - '.curl_errno($this->request).' - '.curl_error($this->request).' - request : '.print_r( array($url,$vars) ,true );
        }
        if( $this->totaltime > $this->curlopt_timeout ) {
            $this->logWriter->debug("Curl connection timeout!", array('total_time'=>$this->totaltime, 'url'=>$url, 'vars'=>$vars, 'curl_getinfo'=>$this->request));
        }
        if( isset( $this->error ) ) $this->logWriter->debug($this->error);
        curl_close($this->request);

        return $response;
    }

    /**
     * Formats and adds custom headers to the current request
     *
     * @return void
     * @access protected
     **/
    protected function set_request_headers() {
        $headers = $this->header_options;

        foreach ($this->headers as $key => $value) {
            $headers[] = $key.': '.$value;
        }
        curl_setopt($this->request, CURLOPT_HTTPHEADER, $headers);
        //error_log(json_encode($headers));
    }

    /**
     * Formats and adds custom headers to the current request
     *
     * @param $vars
     * @access protected
     */
    protected function set_request_json_headers( $vars ) {
        $headers = array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen( $vars )
        );

        foreach ($this->headers as $key => $value) {
            $headers[] = $key.': '.$value;
        }
        curl_setopt($this->request, CURLOPT_HTTPHEADER, $headers);
    }

    /**
     * Set the associated CURL options for a request method
     *
     * @param string $method
     * @return void
     * @access protected
     **/
    protected function set_request_method($method) {
        switch (strtoupper($method)) {
            case 'HEAD':
                curl_setopt($this->request, CURLOPT_NOBODY, true);
                break;
            case 'GET':
                curl_setopt($this->request, CURLOPT_HTTPGET, true);
                break;
            case 'POST':
                curl_setopt($this->request, CURLOPT_POST, true);
                break;
            case 'JSON':
                curl_setopt($this->request, CURLOPT_CUSTOMREQUEST, "POST");
                break;
            case 'PUT':
                curl_setopt($this->request, CURLOPT_CUSTOMREQUEST, "PUT");
                break;
            default:
                curl_setopt($this->request, CURLOPT_CUSTOMREQUEST, $method);
        }
    }

    /**
     * Sets the CURLOPT options for the current request
     *
     * @param string $url
     * @param string $vars
     * @return void
     * @access protected
     **/
    protected function set_request_options($url, $vars) {
        curl_setopt($this->request, CURLOPT_URL, $url);
        if (!empty($vars)) curl_setopt($this->request, CURLOPT_POSTFIELDS, $vars);

        # Set some default CURL options
        curl_setopt($this->request, CURLOPT_HEADER, true);
        curl_setopt($this->request, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($this->request, CURLOPT_DNS_USE_GLOBAL_CACHE, false);
        curl_setopt($this->request, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4 );
        curl_setopt($this->request, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($this->request, CURLOPT_TIMEOUT, $this->curlopt_timeout);
        curl_setopt($this->request, CURLOPT_CONNECTTIMEOUT , $this->curlopt_connecttimeout);
        curl_setopt($this->request, CURLOPT_MAXCONNECTS , $this->curlopt_maxconnects);
        curl_setopt($this->request, CURLOPT_ENCODING, '');

        # Set any custom CURL options
        foreach ($this->options as $option => $value) {
            curl_setopt($this->request, constant('CURLOPT_'.str_replace('CURLOPT_', '', strtoupper($option))), $value);
        }
    }
}
