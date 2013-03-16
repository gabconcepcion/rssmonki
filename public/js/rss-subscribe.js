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
		this.oTrigger = $('#'+oConfig.triggerElem);
		this.oRssViewerHandler = oConfig.oRssViewerHandler;

		if(this.oTrigger.length==0) throw 'Failed to initialize!';

		this.oContainer = this.oTrigger.parent();
		this._initModal();
	},
	_initModal: function(){

		this._sModalId = this.id+'Modal';
		this.oTrigger.attr('data-toggle', 'modal');
		this.oTrigger.attr('data-target', '#'+this._sModalId);

		var sHtml = ''+
			'<div id="'+this._sModalId+'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="subscribeModalLabel" aria-hidden="true">'+
			'	<div class="modal-header">'+
			'		<h3 id="'+this._sModalId+'Label">Subscribe</h3>'+
			'	</div>'+
			'	<div class="modal-body">'+
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
		var sUrl = $('#'+obj._sModalId+'Url').val();

		$.ajax({
			url: obj.sRequestUrl,
			type: "POST",
			async:true,
			data: {
				url: sUrl,
			},
			invokedata: {
				obj: obj
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
			$('#'+obj._sModalId).modal('hide');	
			$('#'+obj._sModalId+'Url').val('');
		}
	},
};

