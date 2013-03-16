<?php

// GET index route
$app->get('/', function () use ($app, $controller) {

	$aRssUrls = array(
		0=>array('id' => 1, 'title'=>'nettuts'),
	);

    $app->render($controller.'header.phtml', array('aRssUrls' => $aRssUrls));
    $app->render($controller.'index.phtml');
    $app->render($controller.'footer.phtml');
});

$app->post('/ajax-add-rss',function () use ($app) {
	$aResponse = array(
		'success'=>true,
	);
	$app->contentType('application/json');
	echo json_encode($aResponse);
});

$app->get('/ajax-get-rss-content', function() use ($app) {

	$aResponse = array(
		'success'=>true,
	);

	$app->contentType('application/json');
	echo json_encode($aResponse);
});
