function _googleTranslateElementInit(){
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
	// Шапка
	catalogi('.nav-submenu-title:contains("Top Brands")').siblings('ul').find('a.link-style-normal').addClass('notranslate');
	catalogi('.nav-submenu-title:contains("Von A bis Z")').siblings('ul').find('a.link-style-normal').addClass('notranslate');

	catalogi('#root-nav').addClass('notranslate');
	catalogi('a[data-etracker-event^="Sаlе"]').addClass('notranslate');

	// Список
	catalogi('.category:contains("Marke")').next().addClass('notranslate');
	catalogi('.pr_brand').addClass('notranslate');
	catalogi('.brand-name').addClass('notranslate');

	catalogi('li[class^="brand-indent"]').addClass('notranslate');

	catalogi('#product-result-container').on('DOMNodeInserted', function(){
		catalogi('.brand-name').addClass('notranslate');
	});

	catalogi('div[class*="all-brands-container"]').addClass('notranslate');

	// Стр. товара
	catalogi('.js-display-variant-price').addClass('notranslate');

	// Футер
};

catalogi.parse = function(){
	// Шапка
	catalogi('#page-header-main-wrapper').prepend(catalogi('#iframe'));
	catalogi('a[href="/conleys/de/service/agb#Preise"]').parent().hide(); //Ссылка про НДС

	// Список
	catalogi('#header-bar').remove();

	// Стр. товара
	catalogi('.product-shipping-costs').text('');
	catalogi('.product-size-guide').click(function(event){
		catalogi.sizeTable();
		return false;
	});

	// Комментарии
	//catalogi('#content-after').remove('');
	//catalogi('.review-bar').remove();
	//catalogi('a[href*="/review"]').parent().remove();

	catalogi('.js-display-variant-price').bind('DOMSubtreeModified', function(e){
    	// стоимость с учетом доставки
    	catalogi.service();
  	});

	// Переопределение метода добавления в корзину
	catalogi('#add-to-cart-form').submit(function(event){
		try{
			var articul = catalogi('.js-display-variant-number').text();
			var name = shop.product.name;

			if(catalogi('.js-display-variant-price .price-new').is('span')){
				var price = catalogi('.js-display-variant-price .price-new').text().replace('€','').replace('.','').replace(',','.').replace('ab','').trim();
			}else{
				var price = catalogi('.js-display-variant-price').text().replace('€','').replace('.','').replace(',','.').replace('ab','').trim();
			}

			var count = catalogi('#qty').val();

			var api = new eTrackerCommerceAPI();
			var variation = api.getProductJSON(catalogi('input[name="productCodePost"]').val().replace('Article_',''));

			if(!variation){
				return true;
			}

			if (catalogi('#product-color-dropdown > p').text())
				var color = catalogi('#product-color-dropdown > p').text();
			else
				var color = catalogi('#product-color-tiles > ul > li').attr('title');
			var size = catalogi('#product-size-tiles > ul > li[class*="selected"]').text();

			var param = [];
			if(color && color.length > 0){
				param.push(color);
			}
			if(size && size.length > 0){
				param.push(size);
			}

			catalogi.basket.add({
				catalog: 'CS',
				articul: articul,
				name: name,
				size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
				price: price,
				count: count,
				img: catalogi('.zoomWindow').css('background-image').replace('url(', '').replace(')', '')
			});

		}catch(e){
			console.log(e);
		}
		return false;
	});

	// Каталоги
	catalogi('map[name="8798649189436"]').parent().hide()

	// Футер
	catalogi('.nohitsearchformcomponent').remove();

	// Show body after f@cking hiding >_<
	catalogi('body')
			.delay(800)
			.queue(function (next) {
				$(this).css('visibility', 'visible');
			});

	// Подписка
	catalogi.subscribe(false, '22914');
};

// Скидка
catalogi.service = function(){
	if('_service' in window && catalogi('.js-display-variant-price')){
		if(catalogi('.js-display-variant-price .price-new').is('span')){
			var _price = catalogi('.js-display-variant-price .price-new').text().replace('€','').replace('.','').replace(',','.').replace('ab','').trim();
		}else{
			var _price = catalogi('.js-display-variant-price').text().replace('€','').replace('.','').replace(',','.').replace('ab','').trim();
		}
    var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
    catalogi('.product-shipping-costs').text('С учетом доставки € '+_delivery.toFixed(2));
	}
};

catalogi(function(){
	/***
	 * Обработка команд с ifame
	 **/
	catalogi(window).on('message', function(event){
		switch(event.originalEvent.data.action){
			case 'search':
				catalogi('#search').val(event.originalEvent.data.search).parents('form').submit();
				break
		}
		console.log(event.originalEvent.data);
	});	

	catalogi.noTranslate();
	catalogi.parse(); 
});