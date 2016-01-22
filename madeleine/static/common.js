function _googleTranslateElementInit() {
  catalogi.noTranslate();
  new google.translate.TranslateElement({
    pageLanguage: 'de',
    includedLanguages: 'ru',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

catalogi(document).ready(function(){
  catalogi('.sizetype').click(function() {
    catalogi.service();
    console.log("click!");
  });
});

catalogi.noTranslate = function() {
  // Шапка

  // Список
  catalogi('a[href="/service/mymadeleine-vorteile/"]').hide();
  catalogi('a[href="/service/freundschaftswerbung/"]').hide();
  catalogi('a[href="/service/boutique-aktionen/"]').hide();
  catalogi('a[href="/service/kataloge/kataloganforderung/"]').hide();
  catalogi('a[href="/service/kundenbewertung/"]').hide();
  catalogi('a[href="/service/"]').hide();
  catalogi('a[href="#"]').hide();
  
  catalogi('a[class="close sprite2"]').show();

  // Стр. товара
  catalogi('#optionError').addClass('notranslate');
  catalogi('.single-price').addClass('notranslate');
  catalogi('.web12015_Sale').addClass('notranslate');
  catalogi('.sale-price').addClass('notranslate');
  catalogi('.addtocard').addClass('notranslate');
  catalogi('.pagerContainer').addClass('notranslate');

  catalogi('.sf_sizes').addClass('notranslate');

  //catalogi('.left-nav').hide();
  catalogi('#tc-tab503').hide();
  catalogi('.fl_col_5').hide();

  catalogi('.web12015cont').addClass('notranslate');
  catalogi('.colorFlagWeb12015New').addClass('notranslate');

  catalogi('#sizesRoot .icon_container').addClass('notranslate');
  catalogi('.title-and-price h1').attr('origin', catalogi('.title-and-price h1').text());
  catalogi('#colorParent .icon_container').each(function(index, el) {
    catalogi(this).attr('origin', catalogi(this).attr('title'));
  });

  // Футер
  catalogi('.big-teaser[style*="margin-bottom: 20px"]').hide();


}

catalogi.parse = function() {
  // Шапка
  catalogi('#header').prepend(catalogi('#iframe'));
  //catalogi('a[href="/news-specials/"]').next('.fl_menu_container').find('img').attr({
  //  'src': 'http://includes.catalogi.ru/cat/madeleine/IMG_10072014_200744.png',
  //  'width': '500'
  //}).parent().attr('onclick', "document.location.href='http://www.madeleine.catalogi.ru/kataloge/blaetterkataloge/'");
  catalogi('<li><a href="http://www.madeleine.catalogi.ru/kataloge/blaetterkataloge/">Онлайн каталоги</a></li>').insertBefore(catalogi('a[href="/news-specials/fashion-trends/"]').parent());
  catalogi('a[href="/news-specials/"]').attr('href', 'http://www.madeleine.catalogi.ru/kataloge/blaetterkataloge/').text('Каталоги');

  catalogi('a[href="https://www.madeleine.catalogi.ru/kataloge/kataloganforderung/"]').attr('href', '/kataloge/blaetterkataloge/');

  catalogi('#email').click(function() {
    //alert("ggwp");
    catalogi.subscribe(true, '22452');
  });


  catalogi('div[onclick*="Flyout:Newsletter"]').attr('onclick','#');

  catalogi('a[href^="https://www.madeleine.catalogi.ru/service/newsletter/"]').attr('href','#');

  catalogi('.img_ts').click(function() {
    //alert("ggwp");
    catalogi.subscribe(true, '22452');
  });

  // Список

  // Стр. товара
  catalogi('a[class="next"]').eq(0).click(function(event) {
    catalogi.sizeTable();
    return false;
  }).text('Таблица размеров');

  // Перевод сообщений
  LocalizedText.Shop_Article_AddToCart_Hint_PleaseSelect = 'Выберите цвет и размер.';
  LocalizedText.Shop_Article_AddToCart_Hint_PleaseSelectSize = 'Пожалуйста, выберите размер.';
  LocalizedText.Shop_Article_AddToCart_Hint_PleaseSelectColor = 'Пожалуйста, выберите цвет';
  LocalizedText.Shop_Article_AddToCart_Hint_Invalid = 'Недопустимая комбинация';

  // Переопределение метода добавление в корзину
  ArticleView.addToCart = function() {
    if (catalogi('.color-size .error').length == 0) {
      var articul = catalogi('#orderNo').text().replace(/ /g, '').trim();
      var name = catalogi('.title-and-price h1').attr('origin');
      var price = catalogi('.single-price').text().replace('€', '').replace(',', '.').trim();
      var color = catalogi('#colorParent .icon_container.active').attr('origin');
      var size = catalogi('#picked_size').text();
      var img = catalogi('.mainImage').attr('src');

      var param = [];

      if (color !== '') {
        param.push(color);
      }

      if (size !== '') {
        param.push(size);
      }

      catalogi.basket.add({
        catalog: 'ML',
        articul: articul,
        name: name,
        size: param.join(' '),
        price: price,
        count: 1,
        img: img
      });
    }
    return false;
  }


  // Футер

  // Отображение body
  catalogi('body').css('visibility', 'visible');

  // Подписка
  catalogi.subscribe(false, '22452');
}

catalogi.service = function(){
  if('_service' in window){
    catalogi(".single-price").text(function(index, text) {
      console.log("done");
      return text.replace("ab", "от");
    });

    //var _price = catalogi('[name="offerPrice"]').val();
    var _price = catalogi('.single-price').text().replace('от', '').replace('€', '').replace(',', '.').trim();
    if(_price != ''){
      var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
      if( catalogi('.addtocard > p').text() != 'С учетом доставки '+_delivery.toFixed(2)+' €' ){
        catalogi('.addtocard > p').text('С учетом доставки '+_delivery.toFixed(2)+' €');
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
        var goingto = "http://www.madeleine.catalogi.ru/Suche/Ihre-Suche-";
        goingto = goingto + event.originalEvent.data.search.toLowerCase().replace(' ', '+') + "?SearchType=quicksearch";
        window.location = goingto;
        break
    }
    console.log(event.originalEvent.data);
  });

  catalogi.noTranslate();
  catalogi.parse();
});
