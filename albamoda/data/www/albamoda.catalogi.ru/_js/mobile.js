function _googleTranslateElementInit(){
  catalogi.noTranslate();
  new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
  // Шапка

  // Список
  catalogi('select.brand option').each(function(index, el){
    catalogi(this).addClass('notranslate');
  });

  // Стр. товара
  catalogi('.name h2').attr('origin', catalogi('.name h2').text());
  catalogi('.name p.brand').addClass('notranslate');
  catalogi('select.color option').each(function(index, el){
    catalogi(this).attr('origin', catalogi(this).text());
  });

  catalogi('select.model option').each(function(index, el){
    catalogi(this).attr('origin', catalogi(this).text());
  });

  catalogi('select.size option').each(function(index, el){
    catalogi(this).attr('origin', catalogi(this).text());
  });

  // Футер
}

catalogi.parse = function(){
  catalogi('#un-button').text('Связаться с нами');

  // Шапка
  catalogi('.header').prepend(catalogi('#_head'));
  catalogi('a[href="http://catalogi.ru/zakaz/"]').colorbox({
    href: '/header/partials/order.php',
    initialWidth: 190
  });

  // Список

  // Стр. товара
  catalogi('form.details input[type="submit"]').click(function(e){
    jQuery('form.details input[type="submit"]').unbind('click');

    if(catalogi('select.model').is('select')){
      var articul = catalogi('select.model option:selected').attr('title');
      var model   = catalogi('select.model option:selected').attr('origin').replace(articul,'').trim();
    }else{
      var articul = catalogi('select.color option:selected').attr('title');
    }

    var name    = catalogi('.name h2').attr('origin');
    var price   = catalogi('select.size option:selected').attr('data-price').replace('EUR','').replace(',','.').trim();
    var color   = catalogi('select.color option:selected').attr('origin');
    var size    = catalogi('select.size option:selected').attr('origin').replace(catalogi('select.size option:selected').attr('data-price'), '').trim();

    var param = [];

    if(color){
      param.push(color);
    };

    if(model){
      param.push(model);
    };

    if(size){
      param.push(size);
    };

    catalogi.basket.add({
      catalog: 'AM',
      articul: articul,
      name: name,
      price: price,
      size: (param.length > 0) ? param.join(' ') : '0',
      count: 1
    });
    return false;
  });

  // Футер


  // Отображение body
  catalogi('body').css('visibility', 'visible');
}

catalogi(document).ready(function(){
  catalogi.parse();
  catalogi.init();
});