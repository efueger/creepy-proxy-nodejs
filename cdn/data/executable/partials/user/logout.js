catalogi = jQuery.noConflict(true);

catalogi(function(){
	catalogi('#_logout_partial #_close').click(function(){
		top.postMessage({action: 'closeColorbox'},'*');
		top.postMessage({action: 'location', url: 'http://includes.catalogi.ru/new/actions/_user.php'},'*');
	});
});