/**
 * Created by mihailstepancenko on 22.12.15.
 */

var timeout1 = 5000; // basket update

function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Force use catalogi.service()
catalogi(document).ready(function(){
    catalogi(".product-variant-options").bind("DOMSubtreeModified", function() {
        catalogi.noTranslate();
        catalogi('.price-save-tag').remove();
        catalogi('.price-save').remove();
        catalogi.service();
        catalogi.removeShit();
    });
});

catalogi.noTranslate = function(){
    // Шапка
    catalogi('#meta-nav').addClass('notranslate');

    // Меню
    catalogi('#navs').addClass('notranslate');
    catalogi("span:contains('Top Marken')").parent().parent().addClass('notranslate');
    catalogi("span:contains('Von A bis Z')").parent().parent().addClass('notranslate');
    catalogi("span:contains('Top Brands')").parent().parent().addClass('notranslate');

    // Все остальное
    catalogi('.brands-main-title').addClass('notranslate');
    catalogi('.all-brands-container').addClass('notranslate');

    // Список товаров
    catalogi('li[class*="brand"]').addClass('notranslate');

    // Страница товара
    catalogi('.product-size-dropdown').addClass('notranslate');
};

catalogi.parse = function() {
    //// Шапка
    catalogi('#iframe').hide();
    //catalogi('#topbar').remove();
    //catalogi('.contentarea').remove();
    catalogi('#account-nav > li > a').attr('href', '#');
    catalogi('.my-account').remove();
    catalogi('#wishlist-link').remove();
    //catalogi('li.lightdesign > form.searchform').remove();
    catalogi('#cc-column-570cb3af6b447').remove();
    catalogi('#cc-column-570cb3af6bd07').remove();
    catalogi('a[href*="/service/faq"]').attr('href', '#').attr('id', 'menu-mob');
    catalogi('#menu-mob > span > span').text('Меню');
    catalogi('#menu').text('Меню');
    catalogi('#page-header').attr('style', '/* height: 100px; */');
    //catalogi('header').prepend($("<div></div>").prepend($("<div></div>").prepend(catalogi('#iframe'))));
    //catalogi('#iframe').parent().parent().addClass("iframeContainer");
    //catalogi('#iframe').parent().addClass("iframeContainer2");

    //юридические страницы
    catalogi('.services').remove();
    catalogi('footer').remove();

    // Разное
    catalogi('a[href*="/de/login"]').parent().parent().remove();
    catalogi('a[href*="/de/service/agb"]').parent().parent().parent().remove();
    catalogi('a[href*="agb#Preise"]').parent().remove(); //Ссылка про НДС

    // Каталоги
    catalogi('#content-main > article:eq(1)').remove();
    //catalogi('a[href*="/de/service/katalogbestellung"]').remove();

    // Меню
    catalogi('a[data-etracker-event*="Header, Metanavi, Direkt bestellen"]').attr('href', '#')
        .attr('class', 'catalogi-shops')
        .removeAttr('data-etracker-event')
        .removeAttr('data-etracker-campaign');
    catalogi('a[data-etracker-event*="HeaderFooter, Metanavi, Newsletter "]').attr('href', '#')
        .attr('class', 'catalogi-catalogs')
        .removeAttr('data-etracker-event')
        .removeAttr('data-etracker-campaign');
    catalogi('.catalogi-shops').parent().parent().clone().appendTo('#meta-nav > ul'); // клонируем элементы
    catalogi('.catalogi-shops:eq(1)').attr('class', 'catalogi-payment');
    catalogi('.catalogi-shops').parent().parent().clone().appendTo('#meta-nav > ul');
    catalogi('.catalogi-shops:eq(1)').attr('class', 'catalogi-delivery');
    catalogi('.catalogi-shops').parent().parent().clone().appendTo('#meta-nav > ul');
    catalogi('.catalogi-shops:eq(1)').attr('class', 'catalogi-size-table');
    catalogi('.catalogi-shops').parent().parent().clone().prependTo('#meta-nav > ul');
    catalogi('.catalogi-shops:eq(0)').attr('class', 'catalogi-main-site');


    //cart
    catalogi('.minibasketholder').attr('onclick','catalogi.order()');

    //subscribe button
    catalogi("[href='http://www.janvanderstorm.catalogi.ru/newsletter/']").attr('onclick', "catalogi.subscribe(false, '35346');event.preventDefault()");



//cart

    // На основной сайт
    catalogi('#meta-nav > ul > li:eq(0)').attr('class', 'yCmsComponent _home');
    catalogi('.catalogi-main-site > span').text('Каталоги.ру');
    catalogi('.catalogi-main-site').attr('href', 'http://catalogi.ru').attr('target', '_blank');

    catalogi('.catalogi-shops > span').text('Интернет-магазины').click(function(){
        catalogi.shops();
        return false;
    });
    catalogi('.catalogi-catalogs > span').text('Каталоги').click(function(){
        catalogi.catalogs();
        return false;
    });
    catalogi('.catalogi-payment > span').text('Оплата').click(function(){
        catalogi.payment();
        return false;
    });
    catalogi('.catalogi-delivery > span').text('Доставка').click(function(){
        catalogi.delivery();
        return false;
    });
    catalogi('.catalogi-size-table > span').text('Таблица размеров').click(function(){
        catalogi.sizeTable();
        return false;
    });

    // Главное меню
    catalogi('a[href*="/conleys/de/men"]').attr('href', '/conleys/de/s//men');

    // Корзина
    catalogi('#minicart-data').remove();
    catalogi('a[title*="Warenkorb"]').attr('href', '#').click(function(){
        catalogi.order();
        return false;
    });
    catalogi('a[title*="Warenkorb"] > span:eq(0)').text('Корзина');


    //filters 
    catalogi("[onchange='this.form.submit()']").attr('onchange','addFilter(this);return false');



    // Страница товара
    catalogi('#add-to-watchlist-button').remove();
    catalogi('#quick-shopper').remove();
    catalogi('.product-helper-guides').remove();
    catalogi('.product-button-panel').append(catalogi('.add-to-cart-button'));
    catalogi('.product-button-panel > form > div:eq(1)').remove();
    catalogi('.vatinfo').remove();

    // Добавление в корзину
    catalogi('.addToCartForm').submit(function(event){
        try{

            var complekt = catalogi('.variantselectform');

            if(complekt.length == 1){
                var queryString = $('.addToCartForm').serialize();
            // артикул
            var articul     = "<a href='"+window.location.href+"'>"+catalogi(".articlenumber .num").text()+"</a>";
            // название
            var name        = catalogi('.articlemain .articlename').text().trim();
            // количество
            var count       = catalogi("input[name=quantity]").val();
            // цена
            var price       = catalogi('.pricearea .price .value').first().text().replace(',','.');
            // картинка
            var img         = catalogi('#thumbimages img').attr('src');

            var param = [];

            // цвет
            var color1      = catalogi('#colorSelect .active').attr('data-original-title');
            var color2      = catalogi('li[class*="selected"]:eq(0)').attr('title');
            var color       = (color1 == "") ? color2 : color1;
            if (color && color.length > 0) param.push(color);

            // размер
            var size1       = catalogi('.button-holder .active').text();
            var size2       = catalogi('li[class*="selected"]:eq(1)').text();
            var size        = ((size1 == "") ? size2 : size1).trim();
            if (size == 'Выберите размер' || size == 'Выберите размер ') {
                alert('Выберите размер!');
                return;
            }
            if (size && size.length > 0) param.push(size);

            // отправка запроса
            catalogi.basket.add({
                catalog: 'JS',
                articul: articul,
                name: name,
                size: (param.join(' ').trim() == '') ? 0 : param.join(' ').trim(),
                price: price,
                count: count,
                img: img
            });

        } else {
            var numberPattern = /\d+/g;

            var namePart = catalogi('.articlemain .articlenumber').text();
            namePart = namePart.match(numberPattern);
            namePart = "<a href='"+window.location.href+"'>"+namePart+"</a>";
            for(var i = 0; i< complekt.length; i++){
                var objToSend = {
                    catalog: 'JS',
                    articul: JSON.parse(catalogi(complekt[i]).attr('data-variantselect')).productId,
                    name: "Комплект "+namePart[0]+" "+catalogi(complekt[i]).find('.articlename').text(),
                    size:"size "+catalogi(complekt[i]).find('.variantselect .button-holder .active').text(),
                    price: catalogi(complekt[i]).find('.price .value').text().replace(',','.'),
                    count: 1,
                    img: catalogi(complekt[i]).find('.imgholder img').attr('src')
                };
                catalogi.basket.add(objToSend);
                //alert(catalogi(complekt[i]).find('.imgholder img').attr('src'));
            }
        }

        console.log('OK');
    } catch(e) {
        console.log(e);
    }
    return false;
});

    // Футер
    catalogi('#seo-text').remove();
    catalogi('#page-footer').remove();

    // Подписка
    catalogi.subscribe(false, '35346');

    // Showing body after hiding
    catalogi('body')
        .delay(500)
        .queue(function (next) {
            checkBasket();

            catalogi('#account-nav').append('<img id="_auth_wait" src="http://cdn.catalogi.ru/static/images/loading.gif" border="0" align="middle">');
            catalogi('.account-nav-listelem').hide();
            catalogi('.product-size-guide').remove();
            catalogi('.price-save-tag').remove();
            catalogi('.price-save').remove();
            catalogi('a[href*="/de/login"]').parent().parent().remove();

            catalogi(this).css('visibility', 'visible');
        });

    catalogi('head')
        .delay(5000)
        .queue(function (next) {
            if(_auth){
                catalogi('#_auth_wait').remove();
                catalogi('.account-nav-listelem > a').remove();
                catalogi('.account-nav-listelem')
                    .html('<a href="http://catalogi.ru/cabinet/" class="my-account-login underline-alternative" target="_blank">Личный кабинет</a>' +
                        '<a href="#" class="_logout"></a>');
                catalogi('.account-nav-listelem').show();
                catalogi('._logout').click(function(){
                    catalogi.logout();
                    return false;
                });
            } else {
                catalogi('#_auth_wait').remove();
                catalogi('.account-nav-listelem').show();
                catalogi('.account-nav-listelem > a').click(function(){
                    catalogi.login();
                    return false;
                });
                catalogi('.account-nav-listelem > a').text('Вход');
            }
        });
};

//function for use filters without redirect
function addFilter(obj){
 
	var value = encodeURIComponent(obj.value);
	var currentUrl = window.location.href.split("?")[0];
    var urlParts = currentUrl.split("/");
    var newUrl = "";
    var appliedFilters = urlParts[urlParts.length-1].split('_');
    if(appliedFilters.length == 1){
        if(obj.id.indexOf('Farbe') != -1){
            appliedFilters = '_Farbe-'+ value;
        } else if(obj.id.indexOf('Größe') != -1){
            appliedFilters = '__Größe-'+ value;
        }
        urlParts.pop();
        newUrl = urlParts.join('/')+'/'+appliedFilters;
    } else {
    	var farbeFilter = "";
    	var grosseFilter = "";
    	if(obj.id.indexOf('Farbe') != -1){
    		if(appliedFilters[1].indexOf('Farbe') != -1){
    			appliedFilters[1] = appliedFilters[1]+"."+value;
    		} else {
    			appliedFilters.push(appliedFilters[1]);
    			appliedFilters[1] = "Farbe-"+value;
    		}
    	}
    	if(obj.id.indexOf('Größe') != -1){
    		if(appliedFilters[1].indexOf('Größe') != -1){
    			appliedFilters[2] = appliedFilters[2]+"."+value;
    		} else {
    			if(appliedFilters[1].indexOf('Größe') != -1){
    				appliedFilters[2] = appliedFilters[2]+"."+value;
    			} else {
    				appliedFilters[2] = "Größe-"+value;
    			}
    		}
    	}
    	urlParts.pop();
    	
    	newUrl = urlParts.join('/')+'/'+appliedFilters.join('_');
    }


    catalogi('.form-filter').attr('method','GET').attr('action',newUrl).submit();

}

function checkBasket() {
    window.clearInterval(window.timer1);

    var ordersNumber = catalogi.cookie('ordersNum');
    if(ordersNumber)
        catalogi('.minicart-amount').text(ordersNumber);
    console.log('ordersNumber: ' + ordersNumber);

    window.timer1 = window.setInterval("checkBasket();", timeout1);
}

function checkSeach() {
    catalogi('.minicart-amount').remove();
    //var seachString = catalogi.cookie('seachString');
    //if (seachString)
    //    catalogi('#search').val(seachString);
}

// Скидка
catalogi.service = function(){
    if('_service' in window && catalogi('.js-display-variant-price')){
        _price = catalogi('.price-formatted').text().replace('€','').replace(',','.').trim();
        _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
        catalogi('.product-shipping-costs').text('С учетом доставки € '+_delivery.toFixed(2));
    }
};

// Удаляем трекеры/аналитику
catalogi.removeShit = function(){
    catalogi('script[src*="criteo"]').remove();
    catalogi('script[src*="adserverpub"]').remove();
    catalogi('script[src*="eu-sonar"]').remove();
    catalogi('script[src*="adnxs"]').remove();
    catalogi('script[src*="adscale"]').remove();
    catalogi('script[src*="yieldlab"]').remove();
    catalogi('script[src*="doubleclick"]').remove();
    catalogi('script[src*="fonts"]').remove();

    //console.log('> ADshit removed.');
};



// On load
catalogi(function(){
    var re = /(?:[\s.])([a-z0-9][a-z0-9-]+[a-z0-9])(?:[.\s])/;
    var str = window.location.hostname;
    var m;

    if ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var currentDomain = m[0].replace('.','').replace('.','');
    }

    catalogi('.search-button').click(function() {
        catalogi.cookie('seachString', catalogi('#search').val(), { expires: 7, path: '/', domain: '.catalogi.ru' });
        catalogi.ajax({
            url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
            type: 'get',
            dataType: 'json',
            data: {
                client: 't',
                text: catalogi('#search').val(),
                sl: 'ru',
                tl: 'de'
            },
            success: function(data){
                console.log('success:' + data);
                top.postMessage({action: 'search', search: data.text[0]},'*');
            },
            error: function(data){
                console.log('error:' + data);
                top.postMessage({action: 'search', search: catalogi('#search').val()},'*');
            }
        });
        return false;
    });

    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www." + currentDomain + ".catalogi.ru/" + currentDomain + "/de/s?_sb=true&query=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
    catalogi.removeShit();
    checkSeach();
});