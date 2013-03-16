<?php

require 'library/Slim/Slim.php';
require 'library/class.Config.php';
require 'library/class.Core.php';
require 'library/class.AutoLoader.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->config(
	array(
		'templates.path' => './Views/'
	)
);
$controller = $app->request()->getPathInfo();

require 'Routers/IndexController.php';

$app->run();
