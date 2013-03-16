<?php

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