<?php
namespace Doorisan\Cache;

interface CacheStorage
{
    /**
     * Connect to caching server.
     * @param mixed $host server-host.
     * @return object this instance.
     */
    public function connect($host = null);

    /**
     * Fetch cached data from caching server.
     * @param string $key cache key name.
     * @return string|null If key didn't exist, return null.
     */
    public function get($key);

    /**
     * Store data to caching server.
     * @param $key Name of the key to store data.
     * @param $value Data.
     * @param int $expires TTL in seconds. lifetime of data.
     * @return none
     */
    public function set($key, $value, $expires = 0);

    /**
     * Remove cached data related to the specified key from caching server.
     * @param $key Name of the key to remove data.
     * @return none
     */
    public function delete($key);

    /**
     * Remove all cached data.
     * @return none
     */
    public function flush();

    /**
     * Close connection.
     * @return none
     */
    public function close();
}
