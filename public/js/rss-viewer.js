var oRssViewerHandler = {
	init: function(oConfig)
	{
		this.sidebar = oConfig.sidebar;
		this.viewer = oConfig.viewer;
		this.aRssUrls = oConfig.rss_urls;
		this.sViewRequestUrl = oConfig.view_request_url;

		this._initSidebar();
	},

	_initSidebar:function(){
		var oSidebar = $('#'+this.sidebar);

		var aHtml = [];

		aHtml.push('<ul class="nav nav-pills nav-stacked">');
		for(var i in this.aRssUrls)
		{
			var oItem = this.aRssUrls[i];
			aHtml.push(''+
				'<li>'+'<a href="#" class="rss-url-item" data-rssid="'+oItem.id+'">'+oItem.title+'</a></li>'+
			'');
		}
		aHtml.push('</ul>');
		oSidebar.append(aHtml.join(''));

		//attach onclick event
		var aItems = $('.rss-url-item');
		for(var i in aItems)
		{
			if (!aItems.hasOwnProperty(i)) continue;

			var oItem = $(aItems[i]);
			oItem.click({obj:this, }, this._onClickRssItem);
		}
	},

	_onClickRssItem:function(evt)
	{
		var params = evt.data;
		var obj = params.obj;

		var oViewer = $('#'+this.viewer);

		$.ajax({
			url: obj.sViewRequestUrl,
			type: "GET",
			async:true,
			data: {
				rss_id: $(this).attr('data-rssid'),
			},
			invokedata: {
				obj: obj
			},
			success: obj.onRequestRssSuccess
		});
	},

	onRequestRssSuccess: function()
	{

	},
};