/**
 * Created by mihailstepancenko on 02.12.15.
 */

//function _googleTranslateElementInit() {
//    new google.translate.TranslateElement({
//        pageLanguage: 'de',
//        includedLanguages: 'ru',
//        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
//    }, 'google_translate_element');
//}

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

catalogi.noTranslate = function(){
    catalogi('head').addClass('notranslate');

    // Футер
    catalogi('#page-footer')
        .queue(function (next) {
            catalogi(this).hide();
        });
}

catalogi.parse = function() {

    catalogi('#page-header-main-wrapper').empty();

    // Show body after f@cking hiding >_<
    catalogi('body')
        .delay(900)
        .queue(function (next) {
            catalogi(this).css('visibility', 'visible');
        });

    catalogi('.add-to-cart-button').submit(function(event){
        try{
            console.log('OK');
        }catch(e){
            console.log(e);
        }
        return false;
    });
}

catalogi(function(){
    catalogi(window).on('message', function(event) {
        switch (event.originalEvent.data.action) {
            case 'search':
                var goingto = "http://www.impressionen.catalogi.ru/impressionen/de/s?_sb=true&query=";
                goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+');
                window.location = goingto;
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
});