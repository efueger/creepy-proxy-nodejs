
var initializeActionLayer = function(){
	if(checkDevice.isMobile()){
		$(".actionLayerContent").addClass("disableLayer");
		$("#actionLayerPanel").addClass("enableLayer");
	}
	else{
		$(".actionLayerContent").addClass("enableLayer");		
		
		$.validator.addMethod("email", function(value, element) {
			return this.optional( element ) || /^[a-zA-Z0-9\u00C0-\u017F!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9\u00C0-\u017F!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9\u00C0-\u017F](?:[a-zA-Z0-9-]*[a-zA-Z0-9\u00C0-\u017F])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/.test( value );
		});
		
		$(".actionLayerSlideToggle").css("height", $(".actionLayerContent").css("height"));
		
		var side="left";
		
		if($(".actionLayerContent ").hasClass("rightSide")){
			side="right";
		}
		
		var updateTop = function(){
			var top = $("#categoryNavigation").position().top;
			$(".actionLayerContent ").css({"top":(top+85)+"px"});
		}
		
		if(docCookies.hasItem("actionLayerOpen") && docCookies.getItem("actionLayerOpen") == "true"){
			$(".actionLayerContent").removeClass("actionLayerInvisible");
			$(".actionLayerContent").addClass("actionLayerVisible");
		}
		else if(docCookies.hasItem("actionLayerOpen") && docCookies.getItem("actionLayerOpen") == "false"){
			$(".actionLayerContent").removeClass("actionLayerVisible");
			$(".actionLayerContent").addClass("actionLayerInvisible");
		}
		
		if($(".actionLayerContent").hasClass("actionLayerVisible")){
			$(".actionLayerSlideContent").data('width', $(".actionLayerSlideContent").innerWidth());
			if(side == "left"){
				$(".actionLayerContent").css({"margin-left":"0px"});
			}
			else{
				$(".actionLayerContent").css({"margin-right":"0px"});
			}
		}
		
		if($(".actionLayerContent").hasClass("actionLayerInvisible")){
			$(".actionLayerSlideContent").data('width', $(".actionLayerSlideContent").css("width"));
			if(side == "left"){
				$(".actionLayerContent").css({"margin-left":"-"+$(".actionLayerSlideContent").data('width')});
			}
			else{
				$(".actionLayerContent").css({"margin-right":"-"+$(".actionLayerSlideContent").data('width')});
			}
		}
		$(".actionLayerSlideToggle").on("click", function(){
			if($(".actionLayerContent").hasClass("actionLayerInvisible")){
				$(".actionLayerContent").removeClass("actionLayerInvisible");
				$(".actionLayerContent").addClass("actionLayerVisible");
				if(side == "left"){
					$(".actionLayerContent").animate({"margin-left":"0px"},500);				
				}
				else{
					$(".actionLayerContent").animate({"margin-right":"0px"},500);	
				}
				
				docCookies.setItem("actionLayerOpen", "true", Infinity);
			}
			else{
				$(".actionLayerContent").addClass("actionLayerInvisible");
				$(".actionLayerContent").removeClass("actionLayerVisible");
				$(".actionLayerSlideContent").data('width', $(".actionLayerSlideContent").css('width'));
				if(side == "left"){
					$(".actionLayerContent").animate({"margin-left":"-"+$(".actionLayerSlideContent").data('width')}, 500);				
				}
				else{
					$(".actionLayerContent").animate({"margin-right":"-"+$(".actionLayerSlideContent").data('width')}, 500);
				}
				
				docCookies.setItem("actionLayerOpen", "false", Infinity);
			}
			
		});
		
		$("#actionLayer-NewsletterSubscription").validate({
			showErrors: function(errorMap, errorList) {
				var tooltipCss = {
						"display":"none",
						"position":"absolute",
						"border":"1px solid red",
						"background-color":"red",
						"border-radius":"5px",
						"padding":"10px",
						"color":"#fff",
						"font-size":"12px Arial",	
						"top":"100px",
						"z-index": "999"
				}
				$.each(this.validElements(), function (index, element) {
					$("#email").removeClass("error");
					$(".error-Tooltip").remove();
				});
				
				$.each(errorList, function (index, error) {
					$(".error-Tooltip").remove();
					$("#email").addClass("error");
					
					$(".actionLayer-Header").after($('<p class="error-Tooltip"></p>').css(tooltipCss).text(validateLabels.invalidEmail).fadeIn('slow').delay(1000).fadeOut('slow'));
				});
			},		
			rules: {
				email : {
					required: true,
					email : true
				}
			}
		});
		
		$(window).on("resize", updateTop);
		
		updateTop();
	}
	$("#actionLayer-NewsletterSubscription-panel").validate({
		showErrors: function(errorMap, errorList) {
			var tooltipCss = {
					"display":"none",
					"position":"absolute",
					"border":"1px solid red",
					"background-color":"red",
					"border-radius":"5px",
					"padding":"10px",
					"color":"#fff",
					"font-size":"12px Arial",	
					"top":"-60px",
					"left": "20%",
					"z-index": "999"
			}
			$.each(this.validElements(), function (index, element) {
				$("#email_panel").removeClass("error");
				$(".error-Tooltip").remove();
			});
			
			$.each(errorList, function (index, error) {
				$(".error-Tooltip").remove();
				$("#email_panel").addClass("error");
				
				$("#actionLayer-NewsletterSubscription-panel").children(".actionLayer-Header").after($('<p class="error-Tooltip"></p>').css(tooltipCss).text(validateLabels.invalidEmail).fadeIn('slow').delay(1000).fadeOut('slow'));
			});
		},		
		rules: {
			email : {
				required: true,
				email : true
			}
		}
	});	
	
}



$(document).safeReady(initializeActionLayer);