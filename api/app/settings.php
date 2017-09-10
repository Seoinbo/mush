<?php
return [
    'settings' => [
        'mode' => 'devel',
        'version' => '0.1.0',
        'debugMode' => true,
        // Only devel-server
        'displayErrorDetails' => true,
        'instagram' => [
            'code' => 'bdef54092c6945a087d22e69bbcaeb5a',
            'accessToken' => '5959045462.2104fbd.2bad42f33100481c8116f8fdfce11327'
        ],
        'log' => [
            // Apache web log
            'error' => [
                'enabled' => true,
                // 'path' => 'php://stderr',
                // 'file' => ''
                'path' => __DIR__ . '/../logs/',
                'file' => 'error_' . date('Ymd') . '.log'
            ],
            // API Request/Response log
            'access' => [
                'enabled' => true,
                'path' => __DIR__ . '/../logs/',
                'file' => 'access_' . date('Ymd') . '.log'
            ]
        ],
        'cache' => [
            'enabled' => true,
            'filePath' => __DIR__ . '/../tmp/'
        ],
        'memcached' => [
            'igbinary' => true // PHP serialize library
        ],
        'redis' => [
            'igbinary' => true
        ],
        'curl' => [
            'instagram' => 'https://api.instagram.com'
        ],
        // Host info.
        'hosts' => [
            'api' => [
                [
                    'name' => 'api',
                    'hashCode' => 'a0',
                    'host' => 'doorisan.com'
                ]
            ],
            'dbService' => [
                [
                    'name' => 'service-db0',
                    'hashCode' => 's0',
                    'host' => 'doorisan.com',
                    'port' => 3306,
                    'dbname' => 'seo4234',
                    'user' => 'seo4234',
                    'password' => 'seo01474'
                ]
            ],
            // 'redis' => [
            //     [
            //         'name' => 'redis1',
            //         'hashCode' => 'r1',
            //         'host' => '127.0.0.1',
            //         'port' => 6379
            //     ]
            // ],
            // 'memcached' => [
            //     [
            //         'name' => 'memcached1',
            //         'host' => '172.20.102.178',
            //         'port' => 50180,
            //         'weight' => 1
            //     ]
            // ]
        ]
    ]
];
