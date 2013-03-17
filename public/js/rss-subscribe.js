var RssSubscribe = {
	id: null,
	oContainer: null,
	sRequestUrl : null,

	init: function(oConfig)
	{
		if(!oConfig || !'triggerElem' in oConfig) throw 'Failed to initialize!';
		if(!oConfig || !'id' in oConfig) throw 'Failed to initialize!';
		if(!oConfig || !'request_url' in oConfig) throw 'Failed to initialize!';
		if(!oConfig || !'oRssViewerHandler' in oConfig) throw 'Failed to initialize!';

		this.id = oConfig.id;
		this.sRequestUrl = oConfig.request_url;
		this.oAddElem = $('#'+oConfig.triggerElem);
		this.oRssViewerHandler = oConfig.oRssViewerHandler;
		this.sidebar = oConfig.sidebar;

		if(this.oAddElem.length==0) throw 'Failed to initialize!';

		this.oContainer = this.oAddElem.parent();
		this._initModal();
	},
	_initModal: function(){

		this._sModalId = this.id+'Modal';
		this.oAddElem.attr('data-toggle', 'modal');
		this.oAddElem.attr('data-target', '#'+this._sModalId);

		var sHtml = ''+
			'<div id="'+this._sModalId+'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="subscribeModalLabel" aria-hidden="true">'+
			'	<div class="modal-header">'+
			'		<h3 id="'+this._sModalId+'Label">Subscribe</h3>'+
			'	</div>'+
			'	<div class="modal-body">'+
			'		<p>Title: <input type="text" id="'+this._sModalId+'Title" placeholder="Title"/></p>'+
			'		<p>Address: <input type="text" id="'+this._sModalId+'Url" placeholder="RSS link/Website url"/></p>'+
			'	</div>'+
			'	<div class="modal-footer">'+
			'		<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>'+
			'		<button class="btn btn-primary" id="'+this._sModalId+'Save">Save changes</button>'+
			'	</div>'+
			'</div>'+
		'';
		this.oContainer.append(sHtml);

		$('#'+this._sModalId+'Save').click({obj:this, }, this.onClickSave);
	},

	onClickSave:function(evt){
		var params = evt.data;
		var obj = params.obj;
		var sTitle = $('#'+obj._sModalId+'Title').val();
		var sUrl = $('#'+obj._sModalId+'Url').val();

		var data = {
			title: sTitle,
			url: sUrl,
		};

		$.ajax({
			url: obj.sRequestUrl,
			type: "POST",
			async:true,
			data: data,
			invokedata: {
				obj: obj,
			},
			success: obj.onSuccess
		});
	},

	onSuccess:function(oResponse)
	{
		if(!oResponse.success)
			alert(oResponse.message);
		else
		{
			var obj = this.invokedata.obj;
			var data = oResponse.data;

			obj.oRssViewerHandler.addRssSidebarLink(data);
			
			$('#'+obj._sModalId).modal('hide');	
			$('#'+obj._sModalId+'Url').val('');
		}
	},
};

