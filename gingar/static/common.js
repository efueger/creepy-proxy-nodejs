function _googleTranslateElementInit() {
	new google.translate.TranslateElement({
		pageLanguage: 'de',
		includedLanguages: 'ru',
		layout: google.translate.TranslateElement.InlineLayout.SIMPLE
	}, 'google_translate_element');
}

catalogi.noTranslate = function(){
	// Шапка
	catalogi('.nav-submenu-title:contains("Top Brands")').siblings('ul').find('a.link-style-normal').addClass('notranslate');
	catalogi('.nav-submenu-title:contains("Von A bis Z")').siblings('ul').find('a.link-style-normal').addClass('notranslate');
	catalogi('a[href*="KlickundSchnapp"]:eq(0)').text('Распродажа');

	// Меню
	catalogi('.yCmsContentSlot:eq(0)').addClass('notranslate');
	catalogi('.facet-block:eq(1)').addClass('notranslate');

	// Список
	catalogi('.category:contains("Marke")').next().addClass('notranslate');
	catalogi('.pr_brand').addClass('notranslate');
	catalogi('.brand-name').addClass('notranslate');
	catalogi('.facet-block:eq(2)').addClass('notranslate');

	catalogi('#product-result-container').on('DOMNodeInserted', function(){
		catalogi('.brand-name').addClass('notranslate');
	});

	catalogi('div[id^="brand"]').addClass('notranslate');

	// Стр. товара
	catalogi('.js-display-variant-price').addClass('notranslate');
	catalogi('#product-size-dropdown').addClass('notranslate');
};

catalogi.parse = function(){
	// Шапка
	catalogi('#page-header-main-wrapper').remove();
	catalogi('#page-header').prepend(catalogi('#iframe'));
	catalogi('a[href="/gingar/de/service/agb#Preise"]').parent().hide(); //Ссылка про НДС

	catalogi('a[href="/gingar/de/KlickundSchnapp?navigation=true&node=8796105311292&filterSale=true"]').parent().remove();
	catalogi('#content-after').remove();

	// Реклама на главной
	//catalogi('img[src*="/medias/sys_gingar/root/"]').parent().hide();

	// Стр. товара
	catalogi('.product-shipping-costs').text('');
	catalogi('#add-to-watchlist-button').remove();
	catalogi('.text-center').remove();

	//catalogi('.disp-img').remove();

	// Комментарии
	//catalogi('.review-number').remove();
	//catalogi('#content-after').remove();
	catalogi('.review-bar > button').remove();
	//catalogi('a[href*="/review"]').parent().remove();

	catalogi('.product-size-guide').click(function(event){
		catalogi.sizeTable();
		return false;
	});

	catalogi('.js-display-variant-price').bind('DOMSubtreeModified', function(e){
		// стоимость с учетом доставки
		catalogi.service();
	});

	// Переопределение метода добавления в корзину
	catalogi('#add-to-cart-form').submit(function(event){
		try{
			var articul 	= catalogi('.js-display-variant-number').text();
			var name 		= catalogi('.js-display-product-name').text();

			if(catalogi('.js-display-variant-price .price-new').is('span')){
				var price = catalogi('.js-display-variant-price .price-new').text().replace('€','').replace('.', '').replace(',','.').trim();
			} else {
				var price = catalogi('.js-display-variant-price').text().replace('€','').replace('.', '').replace(',','.').trim();
			}

			var count   	= catalogi('#qty').val();
			var color 		= catalogi('.selected').attr('title');
			var size 		= catalogi('.js-display-chosen-size').text();
			var img 		= catalogi('.js-display-variant-primary-image').attr('content');

			var param = [];
			if(color && color.length > 0){
				param.push(color);
			}
			if(size && size.length > 0){
				param.push(size);
			}

			catalogi.basket.add({
				catalog: 'DY',
				articul: articul,
				name: name,
				size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
				price: price,
				count: count,
				img: img
			});

		}catch(e){
			console.log(e);
		}
		return false;
	});

	// Футер
	catalogi('#footer-slot6').remove();
	catalogi('#seo-text').remove();
	catalogi('.nohitsearchformcomponent').remove();

	// Show body after f@cking hiding >_<
	catalogi('body')
			.delay(900)
			.queue(function (next) {
				catalogi(this).css('visibility', 'visible');
			});

	// Подписка
	catalogi.subscribe(false, '26436');

	// Футер
	catalogi('#footer-main-slot').remove();
};

// Скидка
catalogi.service = function(){
	if('_service' in window && catalogi('.js-display-variant-price')){
		if(catalogi('.js-display-variant-price .price-new').is('span')){
			var _price = catalogi('.js-display-variant-price .price-new').text().replace('€','').replace('.', '').replace(',','.').trim();
		}else{
			var _price = catalogi('.js-display-variant-price').text().replace('€','').replace('.', '').replace(',','.').trim();
		}
    var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
    catalogi('.product-shipping-costs').text('С учетом доставки € '+_delivery.toFixed(2));
	}
};

catalogi(function(){
	catalogi(window).on('message', function(event) {
		switch (event.originalEvent.data.action) {
			case 'search':
				var goingto = "http://www.gingar.catalogi.ru/gingar/de/s?_sb=true&query=";
				goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
				window.location = goingto;
				break
		}
		console.log(event.originalEvent.data);
	});

	catalogi.noTranslate();
	catalogi.parse();

	catalogi('body').attr('style', '');
	catalogi.service();
});