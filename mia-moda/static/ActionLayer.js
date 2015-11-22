
var initializeActionLayer = function(){
	//if(checkDevice.isMobile()){
	//	catalogi(".actionLayerContent").addClass("disableLayer");
	//	catalogi("#actionLayerPanel").addClass("enableLayer");
	//}
	//else{
		catalogi(".actionLayerContent").addClass("enableLayer");		
		
		//catalogi.validator.addMethod("email", function(value, element) {
		//	return this.optional( element ) || /^[a-zA-Z0-9\u00C0-\u017F!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9\u00C0-\u017F!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9\u00C0-\u017F](?:[a-zA-Z0-9-]*[a-zA-Z0-9\u00C0-\u017F])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test( value );
		//});
		//
		catalogi(".actionLayerSlideToggle").css("height", catalogi(".actionLayerContent").css("height"));
		
		var side="left";
		
		if(catalogi(".actionLayerContent ").hasClass("rightSide")){
			side="right";
		}
		
		var updateTop = function(){
			var top = catalogi("#categoryNavigation").position().top;
			catalogi(".actionLayerContent ").css({"top":(top+85)+"px"});
		}
		
		if(docCookies.hasItem("actionLayerOpen") && docCookies.getItem("actionLayerOpen") == "true"){
			catalogi(".actionLayerContent").removeClass("actionLayerInvisible");
			catalogi(".actionLayerContent").addClass("actionLayerVisible");
		}
		else if(docCookies.hasItem("actionLayerOpen") && docCookies.getItem("actionLayerOpen") == "false"){
			catalogi(".actionLayerContent").removeClass("actionLayerVisible");
			catalogi(".actionLayerContent").addClass("actionLayerInvisible");
		}
		
		if(catalogi(".actionLayerContent").hasClass("actionLayerVisible")){
			catalogi(".actionLayerSlideContent").data('width', catalogi(".actionLayerSlideContent").innerWidth());
			if(side == "left"){
				catalogi(".actionLayerContent").css({"margin-left":"0px"});
			}
			else{
				catalogi(".actionLayerContent").css({"margin-right":"0px"});
			}
		}
		
		if(catalogi(".actionLayerContent").hasClass("actionLayerInvisible")){
			catalogi(".actionLayerSlideContent").data('width', catalogi(".actionLayerSlideContent").css("width"));
			if(side == "left"){
				catalogi(".actionLayerContent").css({"margin-left":"-"+catalogi(".actionLayerSlideContent").data('width')});
			}
			else{
				catalogi(".actionLayerContent").css({"margin-right":"-"+catalogi(".actionLayerSlideContent").data('width')});
			}
		}
		catalogi(".actionLayerSlideToggle").on("click", function(){
			if(catalogi(".actionLayerContent").hasClass("actionLayerInvisible")){
				catalogi(".actionLayerContent").removeClass("actionLayerInvisible");
				catalogi(".actionLayerContent").addClass("actionLayerVisible");
				if(side == "left"){
					catalogi(".actionLayerContent").animate({"margin-left":"0px"},500);				
				}
				else{
					catalogi(".actionLayerContent").animate({"margin-right":"0px"},500);	
				}
				
				docCookies.setItem("actionLayerOpen", "true", Infinity);
			}
			else{
				catalogi(".actionLayerContent").addClass("actionLayerInvisible");
				catalogi(".actionLayerContent").removeClass("actionLayerVisible");
				catalogi(".actionLayerSlideContent").data('width', catalogi(".actionLayerSlideContent").css('width'));
				if(side == "left"){
					catalogi(".actionLayerContent").animate({"margin-left":"-"+catalogi(".actionLayerSlideContent").data('width')}, 500);				
				}
				else{
					catalogi(".actionLayerContent").animate({"margin-right":"-"+catalogi(".actionLayerSlideContent").data('width')}, 500);
				}
				
				docCookies.setItem("actionLayerOpen", "false", Infinity);
			}
			
		});
		
		//catalogi("#actionLayer-NewsletterSubscription").validate({
		//	showErrors: function(errorMap, errorList) {
		//		var tooltipCss = {
		//				"display":"none",
		//				"position":"absolute",
		//				"border":"1px solid red",
		//				"background-color":"red",
		//				"border-radius":"5px",
		//				"padding":"10px",
		//				"color":"#fff",
		//				"font-size":"12px Arial",
		//				"top":"100px",
		//				"z-index": "999"
		//		}
		//		catalogi.each(this.validElements(), function (index, element) {
		//			catalogi("#email").removeClass("error");
		//			catalogi(".error-Tooltip").remove();
		//		});
		//
		//		catalogi.each(errorList, function (index, error) {
		//			catalogi(".error-Tooltip").remove();
		//			catalogi("#email").addClass("error");
		//
		//			catalogi(".actionLayer-Header").after(catalogi('<p class="error-Tooltip"></p>').css(tooltipCss).text(validateLabels.invalidEmail).fadeIn('slow').delay(1000).fadeOut('slow'));
		//		});
		//	},
		//	rules: {
		//		email : {
		//			required: true,
		//			email : true
		//		}
		//	}
		//});
		
		catalogi(window).on("resize", updateTop);
		
		updateTop();
	//}
	//catalogi("#actionLayer-NewsletterSubscription-panel").validate({
	//	showErrors: function(errorMap, errorList) {
	//		var tooltipCss = {
	//				"display":"none",
	//				"position":"absolute",
	//				"border":"1px solid red",
	//				"background-color":"red",
	//				"border-radius":"5px",
	//				"padding":"10px",
	//				"color":"#fff",
	//				"font-size":"12px Arial",
	//				"top":"-60px",
	//				"left": "20%",
	//				"z-index": "999"
	//		}
	//		catalogi.each(this.validElements(), function (index, element) {
	//			catalogi("#email_panel").removeClass("error");
	//			catalogi(".error-Tooltip").remove();
	//		});
	//
	//		catalogi.each(errorList, function (index, error) {
	//			catalogi(".error-Tooltip").remove();
	//			catalogi("#email_panel").addClass("error");
	//
	//			catalogi("#actionLayer-NewsletterSubscription-panel").children(".actionLayer-Header").after(catalogi('<p class="error-Tooltip"></p>').css(tooltipCss).text(validateLabels.invalidEmail).fadeIn('slow').delay(1000).fadeOut('slow'));
	//		});
	//	},
	//	rules: {
	//		email : {
	//			required: true,
	//			email : true
	//		}
	//	}
	//});
	
}



initializeActionLayer();