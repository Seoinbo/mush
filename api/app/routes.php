<?php
function __basePath($name) {
    return "App\\Controllers\\" . $name;
}

/**
 * Reference Links
 *    - swagger homepage: http://swagger.io
 *    - Http status code: http://www.restapitutorial.com/httpstatuscodes.html
 *    - swagger-php hompage: https://github.com/zircote/swagger-php
 *    - swaagger-php document 1.x(old version): http://zircote.com/swagger-php/1.x
 */
$app->get('/test', __basePath('Test:test'));
$app->get('/instagram/recent', __basePath('Instagram:recent'));
