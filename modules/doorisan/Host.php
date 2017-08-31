<?php
/**
 * HSPHP\ReadSocket wrapper class.
 */
namespace Doorisan;

use \Flexihash\Flexihash as Flexihash;

class Host
{
    // 접속 장비 이름 (app/settings.php에 정의되어 있음)
    const API = 'api';
    const DB_SERVICE = 'dbService';
    const REDIS = 'redis';
    const MEMCACHED = 'memcached';

    protected $userId = 0;
    /**
     * @var array app/settings.php의 'hosts' 배열
     */
    protected $allHost = [];
    /**
     * @var array app/settings.php의 'hosts' 배열의 자식 중 하나,
     *            $this->select()를 호출해 값을 변경 할 수 있다.
     */
    protected $hosts = [];

    public function __construct($allHost = [], $hosts = self::DB_USER, $userId = 0) {
        $this->allHost = $allHost;
        // Set default value
        if (!empty($allHost)) {
            $this->setHosts($hosts);
        }
        $this->setId($userId);
    }

    /**
     * @param array|string $hosts 호스트 이름 혹은 배열로된 호스트 정보
     * @param int $userId
     * @return $this
     */
    public function select($hosts = null, $userId = 0) {
        if (!empty($hosts)) {
            $this->setHosts($hosts);
        }
        if (!empty($userId)) {
            $this->setId($userId);
        }
        return $this;
    }

    public function getAllHost() {
        return $this->allHost;
    }

    public function setAllHost($allHost) {
        $this->allHost = $allHost;
        return $this;
    }

    public function getId() {
        return $this->userId;
    }

    public function setId($userId) {
        if (!empty($userId)) {
            $this->userId = $userId;
        }
        return $this;
    }

    public function getHosts($name = null) {
        if (empty($name)) {
            return $this->hosts;
        }
        return $this->allHost[$name];
    }

    public function setHosts($hosts) {
        if (is_string($hosts)) {
            $this->hosts = $this->allHost[$hosts];
        } else {
            $this->hosts = $hosts;
        }
        return $this;
    }

    public function addHost($host) {
        $this->hosts[] = $host;
        return $this;
    }

    public function getIndex($userId = 0) {
        $hashCode = $this->getHashCode($userId);
        foreach ($this->hosts as $i => $host) {
            if ($host['hashCode'] == $hashCode) {
                return $i;
            }
        }
        return 0;
    }

    public function getHashCode($userId = 0) {
        if (empty($userId)) {
            $userId = $this->userId;
        }
        $hashCodeList = $this->getHashCodeList();
        $flexihash = new Flexihash();
        $flexihash->addTargets($hashCodeList);
        return $flexihash->lookup($userId);

    }

    public function getHashCodeList() {
        $hashCodeList = [];
        foreach ($this->hosts as $host) {
            if (isset($host['hashCode'])) {
                $hashCodeList[] = $host['hashCode'];
            }
        }
        return $hashCodeList;
    }

    public function getName($userId = 0) {
        $idx = $this->getIndex($userId);
        $host = $this->hosts[$idx];
        return $host['name'];
    }

    /**
     * 배열의 값을 그대로 반환
     * @param int $userId
     * @return array
     */
    public function getData($userId = 0) {
        $idx = $this->getIndex($userId);
        return $this->hosts[$idx];
    }

    /**
     * 호스트가 서브 배열이면 하나를 선택해서 반환
     * @param int $userId
     * @return array
     * @throws \Flexihash\Exception
     */
    public function getInfo($userId = 0) {
        $idx = $this->getIndex($userId);
        $info = $this->hosts[$idx];
        if (is_array($info['host'])) {
            $targets = array_keys($info['host']);
            $flexihash = new Flexihash();
            $flexihash->addTargets($targets);
            $idx = $flexihash->lookup($userId);
            $info['host'] = $info['host'][$idx];
        }
        return $info;
    }
}
