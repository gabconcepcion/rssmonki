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
	$aResponse = array(
		'success'=>true,
	);
	$app->contentType('application/json');
	echo json_encode($aResponse);
});

$app->get('/ajax-get-rss-content', function() use ($app) {

	require_once('library/rss/rss_fetch.inc');

	$oRss = new Rss_Model();

	$id =  $app->request()->params('rss_id');

	$aRss = $oRss->getRssById($id);
	//die($aRss['url']);
	$aRss['rss'] = fetch_rss( $aRss['url'] );

	$aResponse = array(
		'success'=>true,
		'aRss'=>$aRss
	);

	$app->contentType('application/json');
	echo json_encode($aResponse);
});

$app->get('/gab', function() use ($app) {

require_once('library/rss/rss_fetch.inc');
$url = 'http://feeds.feedburner.com/nettuts?format=xml';
$rss = fetch_rss( $url );

echo "Channel Title: " . $rss->channel['title'] . "<p>";
echo "<ul>";
foreach ($rss->items as $item) {
	$href = $item['link'];
	$title = $item['title'];
	$description = $item['description'];
	echo "<li><a href=$href>$title</a><br/>".
	$description.
	"</li>";
}
echo "</ul>";

});