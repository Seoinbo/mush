<?php
$settings = require __DIR__ . '/../app/settings.php';
ini_set('error_log',
   $settings['settings']['log']['error']['path'] .
   $settings['settings']['log']['error']['file']
);

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../../modules/autoload.php';
require __DIR__ . '/../app/autoload.php';

// Instantiate the app
$app = new \Slim\App($settings);
$container = $app->getContainer();

// Register error handlers
require __DIR__ . '/../app/errorHandlers.php';

// Set up dependencies
require __DIR__ . '/../app/dependencies.php';

// Register middlewares
require __DIR__ . '/../app/middleware.php';

// Register routes
require __DIR__ . '/../app/routes.php';

// Run!
$app->run();
