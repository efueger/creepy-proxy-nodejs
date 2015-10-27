function _googleTranslateElementInit() {
    catalogi.noTranslate();
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
    console.log("translate started");
}

// Force use catalogi.service()
catalogi(document).ready(function(){
    $("#phshop-itemsizebox").bind("DOMSubtreeModified", function() {
        catalogi.service();
    });
});

// No-translate section
catalogi.noTranslate = function() {
    catalogi('#nav').addClass('notranslate');


    //$('.pinfo > span:eq(1)').addClass('notranslate');
    catalogi('.colorbox > ul').addClass('notranslate');

    catalogi('#phshop-itemsizebox > div > ul:eq(0)').addClass('notranslate');

    catalogi('#leftcol > ul:eq(0)').addClass('notranslate');
    catalogi('#rightcol').children('div').addClass('notranslate');
}

// Main section
catalogi.parse = function() {
    // Head
    catalogi('.topnav').empty();
    catalogi('#social').empty();
    catalogi('#vorteilskommunikation').hide();
    catalogi('#siegel').empty();

    catalogi('.headerrow').empty();
    catalogi('#iframe').appendTo('.headerrow');

    // Menu
    catalogi('#nav').append('<li><div class="upper"><a href="http://catalogi.ru/katalog_peter_hahn/">Каталог</a></div></li>')

    // Body
    catalogi('#skyscraper').empty(); // баннер справа
    catalogi('#warenkorbContainer').empty();

    // Product page
    catalogi('a[href=#addtocart]').attr("href", "#addtocartCatalogi")
    catalogi('a[href="#notepad"]').remove();
    catalogi(".hotline").remove();

    // Show body after f@cking hiding >_<
    catalogi('body')
        .delay(800)
        .queue(function (next) {
        $(this).css('visibility', 'visible');
    });

    // Subscribe category id
    catalogi.subscribe(false, '29062');

    // Add to basket own function
    $('#rightBox').on('click', '.basketWrap a[href=#addtocartCatalogi]', function(e) {
        if (!$(this).hasClass('fail')) {
            var articul = catalogi('.pinfo > span:eq(1)').text().replace(/[^0-9]/gi, '');
            var name = catalogi('span[itemprop="name"]').text();
            var price = catalogi('span[itemprop="price"]').text().replace('от', '').replace('EUR', '').replace(',', '.').trim();
            var color = catalogi('.colors > li[class="activeSelection"]').attr('title');
            var size = catalogi('li[class*="selected"] > a > span').text();
            var img = catalogi('.zoomPad > img').attr('src');

            var param = [];
            if (color !== '') param.push(color);
            if (size !== '')
                param.push(size);
            else
                alert('Выберите размер!');

            catalogi.basket.add({
                catalog: 'PH',
                articul: articul,
                name: name,
                size: param.join(' '),
                price: price,
                count: 1,
                img: img
            });
        }
    });

    // Footer
    catalogi('#footer').remove();
}

catalogi.service = function() {
    if('_service' in window) {
        // Cut useless items
        catalogi('.sizebox > a').remove();
        catalogi('a[href=#addtocart]').attr("href", "#addtocartCatalogi")

        // Work with price
        catalogi('span[itemprop="price"]').text(function(index, text) {
            //return text.replace("ab", "от");
        });

        // Calculate delivery price
        var _price = catalogi('span[itemprop="price"]').text().replace('от', '').replace('EUR', '').replace(',', '.').trim();
        if(_price != '') {
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            if( catalogi('.mwst').text() != 'С учетом доставки '+_delivery.toFixed(2) + ' EUR' ){
                catalogi('.mwst').text('С учетом доставки '+_delivery.toFixed(2) + ' EUR');
            }
        }
    }
}

catalogi(function() {
    /***
     * Обработка команд с ifame
     **/
        catalogi(window).on('message', function(event) {
            switch (event.originalEvent.data.action) {
                case 'search':
                    var goingto = "http://www.peterhahn.catalogi.ru/search.php?query=";
                    goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                    window.location = goingto;
                    break
            }
            console.log(event.originalEvent.data);
        });

        _googleTranslateElementInit();
    catalogi.parse();
});