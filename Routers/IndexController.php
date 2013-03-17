<?php

// GET index route
$app->get('/', function () use ($app, $controller) {

	$oRss = new Rss_Model();
	$aRssUrls = $oRss->getAllRss();

    $app->render($controller.'header.phtml', array('aRssUrls' => $aRssUrls));
    $app->render($controller.'index.phtml');
    $app->render($controller.'footer.phtml');
});

$app->post('/ajax-add-rss',function () use ($app) {

	$title =  $app->request()->params('title');
	$url =  $app->request()->params('url');

	$oRss = new Rss_Model();

	$data = array(
		'title'=>$title,
		'url'=>$url,
	);
	$oRss->addRss($data);

	$oCore = Core::getInstance();
	$data['id'] = $oCore->_oDb->lastInsertId();

	$aResponse = array(
		'success'=>true,
		'data'=>$data,
		'message'=>''
	);
	$app->contentType('application/json');
	echo json_encode($aResponse);
});

$app->get('/ajax-get-rss-content', function() use ($app) {

	$oRss = new Rss_Model();

	$id =  $app->request()->params('rss_id');

	$aRss = $oRss->getRssById($id);

	$result = $oRss->fetchRss($aRss['url']);
	$aRss['rss'] = $result;

	$aResponse = array(
		'success'=>true,
		'aRss'=>$aRss,
		'message'=>''
	);

	$app->contentType('application/json');
	echo json_encode($aResponse);
});