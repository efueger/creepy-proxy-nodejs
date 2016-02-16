/**
 * Created by mihailstepancenko on 16.10.15.
 */

function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Force use catalogi.service()
catalogi(document).ready(function(){
    $("#phshop-itemsizebox").bind("DOMSubtreeModified", function() {
        catalogi('.sizes').addClass('notranslate'); // размеры на странице товара
        catalogi.service();
    });
});

// No-translate section
catalogi.noTranslate = function() {
    catalogi('#nav').addClass('notranslate');


    //$('.pinfo > span:eq(1)').addClass('notranslate');
    catalogi('.colorbox > ul').addClass('notranslate');

    // Страница товара
    catalogi('.sizes').addClass('notranslate');
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
    catalogi('#nav').append('<li><div class="upper"><a href="http://catalogi.ru/katalog_peter_hahn/">Каталог</a></div></li>');

    // Body
    catalogi('#skyscraper').empty(); // баннер справа
    catalogi('#warenkorbContainer').empty();

    // Product page
    catalogi('a[href=#addtocart]').attr("href", "#addtocartCatalogi");
    catalogi('a[href="#notepad"]').remove();
    catalogi(".hotline").remove();
    catalogi('.mwst').empty();

    //catalogi('#outfit').remove();
    //catalogi('a[href="#outfit"]').remove();
    catalogi('.outfitLink').remove();

    // Show body after f@cking hiding >_<
    catalogi('body')
        .delay(800)
        .queue(function (next) {
            catalogi(this).css('visibility', 'visible');

            catalogi.service();
    });

    // Add to basket own function
    $('#rightBox').on('click', '.basketWrap a[href=#addtocartCatalogi]', function(e) {
        if (!$(this).hasClass('fail')) {
            var articul = catalogi('.pinfo > span:eq(1)').text().replace(/[^0-9]/gi, '');

            var name1 = catalogi('#producttitel > h1').text();
            var name2 = catalogi('span[itemprop="name"]:eq(0)').text();
            var name  = (name1 == "") ? name2 : name1;

            var price1 = catalogi('span[itemprop="price"]').text().replace('от', '').replace('EUR', '').replace(',', '.').replace('Всё', '').trim();
            var price2 = catalogi('.pricebox > ul > div').find('.newprice').text().replace('от', '').replace('EUR', '').replace(',', '.').replace('Всё', '').trim();
            var price3 = (price1 == "") ? price2 : price1;
            var price4 = catalogi('.pricebox > ul > div > p').text().replace('Всё', '');
            var price  = (price3 == "") ? price4 : price3;

            var color = catalogi('.colors > li[class="activeSelection"]').attr('title');

            var size1 = catalogi('li[class*="selected"] > a > span').text();
            var size2 = catalogi('.selectAct').text();
            var size  = (size1 == "") ? size2 : size1;

            var img = catalogi('img[class="mainphoto"]:eq(1)').attr('src');

            var param = [];
            if (color !== '') param.push(color);
            if (size !== '')
                param.push(size);
            else {
                alert('Выберите размер!');
                return false;
            }

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

    // Subscribe category id
    catalogi.subscribe(false, '29062');

    // Footer
    catalogi('#footer').remove();

    catalogi.service();
};

catalogi.service = function() {
    //if('_service' in window) {
        // Cut useless items
        catalogi('.sizebox > a').remove();
        catalogi('a[href=#addtocart]').attr("href", "#addtocartCatalogi");

        // Work with price
        catalogi('span[itemprop="price"]').text(function(index, text) {
            //return text.replace("ab", "от");
        });

        // Calculate delivery price
        var _price1 = catalogi('span[itemprop="price"]').text().replace('от', '').replace('EUR', '').replace(',', '.').trim();
        var _price2 = catalogi('.pricebox > ul > div').find('.newprice').text().replace('от', '').replace('EUR', '').replace(',', '.').trim();
        var _price3   = (_price1 == "") ? _price2 : _price1;
        var _price4 = catalogi('.pricebox > ul > div > p').text();
        var _price5   = (_price3 == "") ? _price4 : _price3;
        var _price6   = catalogi('.curprice:eq(0)').text().replace('от', '').replace('ab', '').replace('EUR', '').replace(',', '.').trim();
        var _price   = (_price5 == "") ? _price6 : _price5;

        //console.log(_price);

        if(_price != '') {
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            catalogi('.mwst').text('С учетом доставки '+_delivery.toFixed(2) + ' EUR');
        }
    //}
};

catalogi(function() {
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

    catalogi.noTranslate();
    catalogi.parse();
    catalogi.service();
});