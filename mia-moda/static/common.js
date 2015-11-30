function _googleTranslateElementInit() {
    catalogi.noTranslate();
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

catalogi.noTranslate = function () {
    catalogi('#available-brand-filters').addClass('notranslate');
    // Стр. товара
    catalogi('[itemprop="brand"]').addClass('notranslate');
    catalogi('.categoryProductName').addClass('notranslate');
    catalogi('h1[itemprop="name"]').attr('origin', catalogi('h1[itemprop="name"]').text().trim().replace('&nbsp;', ' '));
};

catalogi.parse = function () {
    // Шапка
    catalogi('header').empty();
    catalogi("#iframe").appendTo("header");


    // Список
    catalogi('.quickViewHover').remove();
    catalogi('.categoryAvailabilityHover').remove();

    // Стр. товара

    //Поправка цветов и размеров
    catalogi('.colorTile > div').removeAttr('onclick');
    catalogi('.colorTile > div').removeAttr('onmouseover');
    catalogi('.colorTile > div').click(function (e) {
        catalogi('.colorTile > div').removeClass('selected');
        catalogi(this).addClass('selected');
        catalogi('span.productColorLabel.attributeLabel > font > font').text(' ' + catalogi(this).attr('title'));
        catalogi('#color').attr('value', catalogi(this).attr('id'));

        var newart;
        for (var prop in colorPartNumbers) {
            if (colorPartNumbers.hasOwnProperty(prop)) {
                if (colorPartNumbers[prop] === catalogi(this).attr('id')) {
                    newart = prop;
                    break;
                }
            }
        }
        catalogi('span[itemprop="sku"]').text(newart.slice(0, 5) + '/' + newart.charAt(5) + newart.slice(-1) + 'X');

    });

    catalogi('.sizeTile > div').removeAttr('onclick');
    catalogi('.sizeTile > div').click(function (e) {
        catalogi('.sizeTile').removeClass('selected');
        catalogi(this).parent().addClass('selected');
        catalogi('span.productSizeLabel.attributeLabel > font > font').text(' ' + catalogi(this).attr('id'));
        catalogi('#size').attr('value', catalogi(this).attr('id'));

    });

    // Стр. товара

    catalogi('#productAjaxDescription').bind('DOMNodeInserted', function (e) {

        //стоимость с учетом доставки
        catalogi.service();

        if (!catalogi('#addToCartButton').hasClass('checked')) {
            catalogi('#addToCartButton').removeAttr('onclick');
            catalogi('#addToCartButton').click(function (e) {
                var articul = catalogi('span[itemprop="sku"]').text().replace(/[ \/]/g, '');
                var name = catalogi('div.brandName[itemprop="brand"]').text() + ' ' + catalogi('h1[itemprop="name"]').attr('origin');
                var price = catalogi('input[name="offerPrice"]').val();
                var count = catalogi('#quantityField').val();
                var color = catalogi('#color').val();
                var size = catalogi('#size').val();
                var img = 'http://mia-moda.catalogi.ru' + catalogi('#imgLink1').attr('data-image');

                var param = [];

                if (color !== '') {
                    param.push(color);
                }

                if (size !== '') {
                    param.push(size);
                }

                catalogi('.additionalAttribute > select option:selected').each(function () {
                    param.push(catalogi(this).text())
                });

                catalogi.basket.add({
                    catalog: 'MA',
                    articul: articul,
                    name: name,
                    size: param.join(' '),
                    price: price,
                    count: count,
                    img: img
                });

            }).addClass('checked');
        }

    });

    // Футер
    catalogi('#footer').remove();

    // Отображение body
    catalogi('body').css('visibility', 'visible');

    // Подписка
    //catalogi.subscribe(false, '30460');
};

// Скидка
catalogi.service = function () {
    if ('_service' in window) {
        var _price = catalogi('input[name="offerPrice"]').val();
        if (_price != '') {
            var _delivery = parseFloat(_price) + (( parseFloat(_price) / 100 ) * parseFloat(_service));
            if (catalogi('.vatLabel').text() != 'С учетом доставки € ' + _delivery.toFixed(2)) {
                catalogi('.vatLabel').text('С учетом доставки € ' + _delivery.toFixed(2));
            }
        }
    }
};

catalogi(function () {
    /***
     * Обработка команд с ifame
     **/
    catalogi(window).on('message', function (event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                //catalogi('#desktopSearchTerm').val(event.originalEvent.data.search).parents('form').submit();
                //break;
                var goingto = "http://www.mia-moda.de/SearchDisplay?searchTerm=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto + "&storeId=510004&catalogId=510000&langId=-3&beginIndex=0&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&categoryId=";
                break;

            case 'orderCount':
                catalogi('#miniCartAmount').text(event.originalEvent.data.count);
                break;
        }
        console.log(event.originalEvent.data);
    });
    _googleTranslateElementInit();
    catalogi.noTranslate();
    catalogi.parse();

    catalogi('.quickViewHover').remove();
});