
var Page = {
	init: function()
	{
		oRssViewerHandler.init({
			sidebar: 'rss-sidebar',
			viewer: 'rss-viewer',
			view_request_url: 'ajax-get-rss-content',
			rss_urls: aRssUrls, 
		});

		RssSubscribe.init({
			id: 'subscribeDialog',
			sidebar: 'rss-sidebar',
			triggerElem: 'subscibe-rss',
			request_url: 'ajax-add-rss',
			oRssViewerHandler: oRssViewerHandler,
		});
	},
};

Page.init();