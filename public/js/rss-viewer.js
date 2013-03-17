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
		for(var i=0, len=aItems.length; i < len; i++)
		{
			var oItem = $(aItems[i]);
			oItem.click({obj:this, }, this._onClickRssItem);
		}
	},

	_onClickRssItem:function(evt)
	{
		if($(this).parent().hasClass('active')) return; 

		var params = evt.data;
		var obj = params.obj;

		var oViewer = $('#'+obj.viewer);
		oViewer.html('Loading content..');
		
		$(this).parent().parent().children().removeClass('active');
		$(this).parent().addClass('active');

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

	onRequestRssSuccess: function(oResponse)
	{
		if(!oResponse.success)
			alert(oResponse.message);
		else
		{
			var obj = this.invokedata.obj;
			var elViewer = $('#'+obj.viewer);

			elViewer.html('');
			elViewer.append('<h3>'+oResponse.aRss.title+'</h3>');
			for(var i in oResponse.aRss.rss.item)
			{
				var oItem = oResponse.aRss.rss.item[i];
				elViewer.append('<h3><a href="'+oItem.link+'" target="_blank">'+oItem.title+'</a></h3>');

				if('description' in oItem)
					elViewer.append(oItem.description);
			}
		}
	},
};