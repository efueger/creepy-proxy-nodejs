/**
 * Created by mihailstepancenko on 11.01.16.
 */

//function formatDate(date) {
//    var diff = new Date() - date;
//    var d = date;
//    d = ['0'+d.getDate(),'0'+(d.getMonth()+1),''+d.getFullYear(), '0'+d.getHours(),'0'+d.getMinutes() ];
//    for(var i=0; i<d.length; i++) {
//        d[i] = d[i].slice(-2);
//    }
//
//    return d.slice(0,3).join('.')+' '+d.slice(3).join(':');
//}

function _googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'de',
        includedLanguages: 'ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

catalogi.noTranslate = function(){
    // Шапка
    catalogi('.metaNaviIcons').addClass('notranslate');
    catalogi('.posWrapper').addClass('notranslate');
    catalogi('.subNav').addClass('notranslate');
    catalogi('#header-search-container').addClass('notranslate');

    // Меню
    catalogi('.navigation').addClass('notranslate');

    // Список брендов
    catalogi('.brandIndex').addClass('notranslate');
    catalogi('div[class*="brandBlock"]').addClass('notranslate');
    //catalogi('.iconFont').addClass('notranslate');
    //catalogi('.brandSearch .brandSearch').addClass('notranslate');
    //catalogi('.brandSearch .content li').addClass('notranslate');
    //catalogi('a[title="Marke"] > span.value').addClass('notranslate');
    //catalogi('.productBox b').addClass('notranslate');
    //
    //
    //// Стр. товара
    //catalogi('.simpleSupplierSize').text('Размеры');
    //catalogi('.recos h3 a').addClass('notranslate');
    //catalogi('#articlePrice').addClass('notranslate');
    //catalogi('#sizeTypeLinks').addClass('notranslate');
    //catalogi('.colorList li img').each(function(el, index){
    //    catalogi(this).attr('origin', catalogi(this).attr('alt'));
    //});
    //
    //catalogi('#listProductSizes li').each(function(el, index){
    //    catalogi(this).attr('origin', catalogi(this).text().trim());
    //});
    //
    ////Моб. версия
    //catalogi('select[name="articleSimpleSku"] option').each(function(el, index){
    //    catalogi(this).attr('origin', catalogi(this).text().trim());
    //});
}

catalogi.parse = function(){
    // Шапка
    catalogi('#iframe').hide();

    // Меню
    catalogi('.cookieAdvice').remove();
    catalogi('.posWrapper p').each(function(){
        catalogi(this).removeAttr('title');
    });
    catalogi('.posWrapper p:eq(0)').html('Интернет магазин <a href="/">ZALANDO.DE</a>');
    catalogi('.posWrapper p:eq(1)').html('<a href="http://www.catalogi.ru">Каталоги.ру</a> Заказ и доставка одежды из европейских интернет-магазинов в Россию');
    catalogi('.posWrapper p:eq(2)').html([
        '<ul>',
        '  <li><a href="#">Интернет-магазины</a></li>',
        '  <li><a href="#">Каталоги</a></li>',
        '  <li><a href="#">Оплата</a></li>',
        '  <li><a href="#">Доставка</a></li>',
        '</ul>',
    ].join('\n'));

    catalogi('.posWrapper p:eq(2) li:eq(0)').click(function(){
        catalogi.shops();
        return false;
    });
    catalogi('.posWrapper p:eq(2) li:eq(1)').click(function(){
        catalogi.catalogs();
        return false;
    });
    catalogi('.posWrapper p:eq(2) li:eq(2)').click(function(){
        catalogi.payment();
        return false;
    });
    catalogi('.posWrapper p:eq(2) li:eq(3)').click(function(){
        catalogi.delivery();
        return false;
    });

    catalogi('.cart').attr('href', '#').click(function(){
        catalogi.order();
        return false;
    });

    // Стр. товара
    catalogi('#articlePrice').bind('DOMNodeInserted', function(e){
        // стоимость с учетом доставки
        catalogi.service();
    });
    //
    //catalogi('.js-priceWrapper').bind('DOMNodeInserted', function(e){
    //    // стоимость с учетом доставки
    //    catalogi.serviceMob();
    //});
    //
    //catalogi('#upcloadButton').on('mouseenter', function(){
    //    jQuery('#upcloadButton').unbind('click');
    //});
    //
    //catalogi('#upcloadButton').click(function(){
    //    catalogi.sizeTable();
    //});

    //catalogi("#ajaxAddToCartBtn").on("click", function(){
    //    jQuery("#ajaxAddToCartBtn").unbind('click');
    //    var b = $("#listProductSizes").find("li.active"), b = b.length ? b.attr("id") : null;
    //    if (!b && !(b = $("#articleSimpleSku").val()))
    //        return !1;
    //
    //    var articul = product.identifier;
    //    var name    = product.fn;
    //    var price   = catalogi('#articlePrice').text().replace(',','.').replace('€','').trim();
    //    var color   = catalogi('.colorList li.active img').attr('origin');
    //    var size    = catalogi('#listProductSizes li.active').attr('origin');
    //    var image   = catalogi('#image').attr('href');
    //
    //    var param   = [];
    //
    //    if(color && color != ''){
    //        param.push(color)
    //    }
    //
    //    if(size && size != ''){
    //        param.push(size)
    //    }
    //
    //    catalogi.basket.add({
    //        catalog: 'ZL',
    //        articul: articul,
    //        name: name,
    //        price: price,
    //        size: param.length > 0 ? param.join(' ') : '0',
    //        count: 1,
    //        img: image,
    //        stock: formatDate(new Date())
    //    });
    //
    //    return !1
    //});

    // Футер
    catalogi('.backToTopButton').remove();

    // Отображение body
    catalogi('body').css('visibility', 'visible');

    // Подписка
    catalogi.subscribe(false, 76136);
    catalogi.service();
}

// Скидка
catalogi.service = function(){
    if('_service' in window){
        var _price = catalogi('#articlePrice').text().replace(',','.').replace('€','').trim();
        if(_price != ''){
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            if( catalogi('.inclTax').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
                catalogi('.inclTax').text('С учетом доставки € '+_delivery.toFixed(2));
            }
        }
    }
}

///*** моб. версия ***/
//catalogi.serviceMob = function(){
//    if('_service' in window){
//        var _price = catalogi('.js-priceWrapper').text().replace(',','.').replace('€','').replace('ab','').replace('от','').trim();
//        if(_price != ''){
//            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
//            if( catalogi('.freeShipping').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
//                catalogi('.freeShipping').text('С учетом доставки € '+_delivery.toFixed(2));
//            }
//        }
//    }
//}


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
        catalogi.cookie('seachString', catalogi('#searchContent').val(), { expires: 7, path: '/', domain: '.catalogi.ru' });
        catalogi.ajax({
            url: 'http://cdn.catalogi.ru/executable/actions/_translate.php',
            type: 'get',
            dataType: 'json',
            data: {
                client: 't',
                text: catalogi('#searchContent').val(),
                sl: 'ru',
                tl: 'de'
            },
            success: function(data){
                console.log('success:' + data);
                top.postMessage({action: 'search', search: data.text[0]},'*');
            },
            error: function(data){
                console.log('error:' + data);
                top.postMessage({action: 'search', search: catalogi('#searchContent').val()},'*');
            }
        });
        return false;
    });

    //catalogi('body').removeClass('modalVisible');

    //http://www.zalando.catalogi.ru/katalog/?q=
    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www." + currentDomain + ".catalogi.ru/" + currentDomain + "/katalog/?q=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    //catalogi(window).on('message', function(event){
    //    switch(event.originalEvent.data.action){
    //        case 'search':
    //            if(catalogi('#searchContent').length > 0) catalogi('#searchContent').val(event.originalEvent.data.search).parents('form').get(0).submit();
    //            if(catalogi('#searchTop').length > 0) catalogi('#searchTop').val(event.originalEvent.data.search).parents('form').get(0).submit();
    //            break
    //    }
    //    console.log(event.originalEvent.data);
    //});

    catalogi.noTranslate();
    catalogi.parse();
});