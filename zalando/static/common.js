/**
 * Created by mihailstepancenko on 16.09.15.
 */

function formatDate(date) {
    var diff = new Date() - date;
    var d = date;
    d = ['0'+d.getDate(),'0'+(d.getMonth()+1),''+d.getFullYear(), '0'+d.getHours(),'0'+d.getMinutes() ];
    for(var i=0; i<d.length; i++) {
        d[i] = d[i].slice(-2);
    }

    return d.slice(0,3).join('.')+' '+d.slice(3).join(':');
}

function _googleTranslateElementInit(){
    catalogi('li.title:contains("Marken")').parent().find('li > a').addClass('notranslate');
    catalogi('li.title:contains("Sportmarken")').parent().find('li > a').addClass('notranslate');
    catalogi('a[name="header.navi.main.herren.marken"]').next().find('li > a').addClass('notranslate');
    new google.translate.TranslateElement({pageLanguage: 'de', includedLanguages: 'ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

catalogi.noTranslate = function(){
    // Шапка
    catalogi('#damenOutletNav').addClass('notranslate');
    catalogi('.posWrapper').addClass('notranslate');
    catalogi('a[name="header.navi.tab.unisex"]').addClass('notranslate');
    setTimeout(function(){
        catalogi('#kinderMarkenNav li > a').addClass('notranslate');
    }, 1000);

    /*** моб. версия ***/
    catalogi('#topSearchBut').addClass('notranslate');
    catalogi('#cartLink').addClass('notranslate');
    catalogi('#searchMiniForm button[type="submit"]').addClass('notranslate');
    catalogi('#searchMiniFormBottom button[type="submit"]').addClass('notranslate');


    // Список
    catalogi('.iconFont').addClass('notranslate');
    catalogi('.brandSearch .brandSearch').addClass('notranslate');
    catalogi('.brandSearch .content li').addClass('notranslate');
    catalogi('a[title="Marke"] > span.value').addClass('notranslate');
    catalogi('.productBox b').addClass('notranslate');


    // Стр. товара
    catalogi('.simpleSupplierSize').text('Размеры');
    catalogi('.recos h3 a').addClass('notranslate');
    catalogi('#articlePrice').addClass('notranslate');
    catalogi('#sizeTypeLinks').addClass('notranslate');
    catalogi('.colorList li img').each(function(el, index){
        catalogi(this).attr('origin', catalogi(this).attr('alt'));
    });

    catalogi('#listProductSizes li').each(function(el, index){
        catalogi(this).attr('origin', catalogi(this).text().trim());
    });

    //Моб. версия
    catalogi('select[name="articleSimpleSku"] option').each(function(el, index){
        catalogi(this).attr('origin', catalogi(this).text().trim());
    });

    // Футер
}

catalogi.parse = function(){
    // Шапка
    catalogi('.cookieAdvice').remove();
    catalogi('.posWrapper p').each(function(){
        $(this).removeAttr('title');
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


    catalogi('#customerAccountBox').html([
        '<a href="#" title="" class="msgAccount accountLink js-overlay-link">',
        '  <span class="iconFont notranslate"></span>',
        '  <span class="text"></span>',
        '</a>'
    ].join('\n'));


    $([
        '<a href="#" title="" class="msgAccount accountLink js-overlay-link">',
        '  <span class="iconFont notranslate"></span>',
        '  <span class="text"></span>',
        '</a>'
    ].join('\n')).insertAfter('#cart');

    //catalogi('#modalLoginLinkWishList .text').text('Лист желаний');

    if(_auth){
        catalogi('a.msgAccount > span:last').text('Выход');
        catalogi('a.msgAccount').attr('href', 'http://catalogi.ru/cabinet/');
        catalogi('a.msgAccount').click(function(){
            catalogi.logout();
            return false;
        });
    }else{
        catalogi('a.msgAccount').click(function(){
            catalogi.login();
            return false;
        });
        catalogi('a.msgAccount > span:last').text('Вход');
    }
    catalogi('.metaNaviIcons .cart').remove();

    catalogi('.metaNaviIcons').prepend(catalogi('#iframe'));
    catalogi('#iframe').insertAfter('#cart');


    if('ZAL' in window){

        ZAL.baseUrl = '/';
        ZAL.locale = 'de_DE';
        ZAL.country = 'de_DE'.split('_')[1];
        ZAL.passwordStrengthCheckEnabled = true;
        ZAL.localizedStrings = {"shop":{"the":{"look":{"headline":"Shop the Look","similar":"Ähnlich"}},"the.look.similar":"Ähnlich","the.look.headline":"Shop the Look"},"form":{"label":{"yourName":"Ihr Name","yourEmail":"Ihre E-Mail-Adresse"},"label.yourEmail":"Ihre E-Mail-Adresse","label.yourName":"Ihr Name"},"validation":{"minlength":"Eingabe ist zu kurz.","placeholderSearch":"Lieblingsprodukt suchen...","maxlength":"Eingabe ist zu lang.","socialSecurityNumber":{"notMatch":"Social Security Number nicht gültig.","valueNotPresent":"Bitte geben Sie Ihre Social Security Number ein."},"findaddress":{"clickhere":"Hier klicken um die Adresse zu verifizieren"},"did":{"you":{"mean":"Meintest du"}},"passwordStrength":"Passwortstärke:","wishlistAdd":"Auf den Wunschzettel","removeBankAccount":"Soll die Bankverbindung wirklich gelöscht werden?","minlength.valueTooShort":"Der eingebene Wert ist zu kurz.","street":"Straße und Hausnummer","passwordWeak":"schwach","lessLink":"...weniger","accountLink":"Gespeicherte Bankverbindungen anzeigen","addressSuggestLimited":"Zu viele Ergebnisse. Bitte die Eingabe ergänzen.","password":"Bitte ein gültiges Passwort eingeben.","emailList":"Bitte eine nur durch Komma (ohne Leerzeichen) getrennte, gültige E-Mail-Adressen eingeben.","city":"Wir bitten darum, die Eingabe zu überprüfen.","emailEqualsPassword":"E-Mail-Adresse und Passwort dürfen nicht identisch sein.","socialSecurityNumber.notMatch":"Social Security Number nicht gültig.","username":"Bitte Vornamen angeben.","zipBe":"Die Postleitzahl muss aus genau 5 Ziffern bestehen.","zipFr":"Eine Lieferung in Überseegebiete ist leider noch nicht möglich.","severalSizesAvailable":"In vielen Größen verfügbar","invalid":"Ungültige Eingabe","phoneNumber":"Bitte eine gültige Telefonnummer eingeben.","cardLink":"Gespeicherte Kreditkarten anzeigen","zipNl":"Bitte eine korrekte Postleitzahl für das Land eingeben","required":"Dies ist ein Pflichtfeld","passwordGood":"gut","zipUk":"Please enter the correct post code for your country.","removeCreditCard":"Soll die Kreditkarte wirklich gelöscht werden?","placeholderBrandSearch":"Marke suchen...","specialPrice":"Jetzt","noSpecialChars":"Zu viele Sonderzeichen.","fewVouchers":"Gutscheine","placeholderSearch.v2":"Lieblingsprodukt suchen...","number":"Bitte ausschließlich Zahlen eingeben.","whitespaces":"Die Eingabe darf am Anfang und Ende keine Leerzeichen enthalten.","brandSearchNoResult":"...die Marke \u003cspan\u003e\u003c/span\u003e kann leider nicht gefunden werden.","vouchers":"Gutscheine","price":"Preis","email":"Bitte eine gültige E-Mail-Adresse eingeben. Zum Beispiel IhrName@domain.de.","removeAddress":"Soll die Adresse wirklich gelöscht werden?","streetChar":"Bitte Straße und Hausnummer eingeben.","letters":"Bitte in diesem Feld nur die Zeichen (a-z oder A-Z) eingeben.","passwordTooshort":"zu kurz","buyVoucher":"Jetzt kaufen","birthday":"Das Datum darf nicht in der Zukunft liegen.","creditcardMisterCash":"Controleer alstublieft uw invoer. De ingevoerde gegevens zijn niet correct of volledig","equalTo":"Wir bitten um die Sicherstellung, dass die Passwörter übereinstimmen.","socialSecurityNumber.valueNotPresent":"Bitte geben Sie Ihre Social Security Number ein.","placeholderUserName":"Ihr Vorname","registerPassword":"Bitte 6 oder mehr Zeichen eingeben. Leerzeichen am Anfang, am Ende oder innerhalb der Zeichenkette sind nicht zulässig.","onWishlistBoxMsg":"Der Artikel wurde dem Wunschzettel hinzugefügt.","did.you.mean":"Meintest du","notAvailable":"Nicht auf Lager","postNumber":"PostNummer","zipDe":"Die Postleitzahl muss aus genau 5 Ziffern bestehen.","streetNumber":"Bitte Hausnummer eingeben.","passwordStrong":"stark","buyVouchers":"Jetzt kaufen","zip":"Die Postleitzahl muss aus genau 5 Ziffern bestehen.","creditcard2":"Bitte die Angaben prüfen. Kartentyp, Kreditkartennummer und Kartenprüfnummer stimmen nicht überein.","zipAt":"Die Postleitzahl muss aus genau 4 Ziffern bestehen.","maxlength.valueTooLong":"Der eingegebene Wert ist zu lang (max. 50 Zeichen)","zipSe":"Die Postleitzahl muss aus 5 Ziffern bestehen.","placeholderSearch.abtest.varB":"Lass dich inspirieren mit nur einem Klick","couponCode":"Bitte einen Gutscheincode eingeben!","placeholderSearch.abtest.varE":"Suchbegriff eingeben","returnArticles":"Es muss mindestens ein Artikel ausgewählt werden.","placeholderSearch.abtest.varC":"Top Marken versandkostenfrei online shoppen","feedbackNoEntry":"Mindestens eines der Felder muss ausgefüllt werden.","newsletterType":"Bitte Geschlecht über die Schaltfläche auswählen.","supplierSize":"Herstellergrößen","placeholderSearch.abtest.varD":"Finde deinen Fashion Deal online","sizeSelect":"Größe wählen","findaddress.clickhere":"Hier klicken um die Adresse zu verifizieren","packstation":"Packstation","availableSizes":"Verfügbare Größen:","passwordStrength.info":"Für ein sicheres Passwort empfehlen wir eine Länge von mindestens 6 Zeichen, der Einsatz von Sonderzeichen, Zahlen und großen sowie kleinen Buchstaben.","standardSize":"Standardgrößen","voucher":"Gutschein","addressSupplement":"Adresszusatz / Firma / c/o"},"catalog":{"more":{"filter":"Mehr Filter"},"article":{"price":{"save":"sparen"},"review":{"failed":"Deine Kundenmeinung konnte leider nicht gespeichert werden.","success":"Vielen Dank! Deine Bewertung ist eingegangen und wird in Kürze auf der Seite zu sehen sein."},"size":{"detail":"Größe wählen","select":"Größe wählen"},"outofstock":"Leider ist der gewünschte Artikel nicht mehr verfügbar."},"reco":{"headline":"Das könnte dir auch gefallen","page":{"link":"Alle Empfehlungen"},"person":"Deine persönlichen Empfehlungen","success":"Inspiration für deinen nächsten Einkauf"},"search":{"noresult":{"placeholder":"Erneut suchen"}},"brand":{"family":{"all":"alle"}},"pds":{"soldOut":{"size":{"notification":"Meine Größe anfragen"}},"sizeReminder":{"sex":{"female":"weiblich","male":"männlich"},"request":{"info":"Sollte der Artikel innerhalb von 3 Monaten nicht verfügbar sein, wird deine Anfrage automatisch gelöscht."},"contact":{"info":"Wie können wir dich kontaktieren?"},"title":"Ich möchte angeschrieben werden, wenn meine Größe verfügbar ist!","mySize":"Ich möchte per E-Mail benachrichtigt werden, wenn meine Größe verfügbar ist!"},"partner":{"hint":"Versand durch Partner:"},"stockReminder":"Ich möchte per E-Mail benachrichtigt werden, wenn dieser Artikel verfügbar ist!","size":{"supplier":"Herstellergrößen"},"selectArticle":"Bitte wähle eine Größe aus.","addToCart":"In den Warenkorb","productdetails":"Produktdetails"},"less":{"filter":"Weniger Filter"},"pds.addToCart":"In den Warenkorb","reco.person":"Deine persönlichen Empfehlungen","reco.page.link":"Alle Empfehlungen","reco.success":"Inspiration für deinen nächsten Einkauf","pds.sizeReminder.sex.female":"weiblich","article.size.detail":"Größe wählen","more.filter":"Mehr Filter","article.price.save":"sparen","article.review.failed":"Deine Kundenmeinung konnte leider nicht gespeichert werden.","less.filter":"Weniger Filter","pds.size.supplier":"Herstellergrößen","article.review.success":"Vielen Dank! Deine Bewertung ist eingegangen und wird in Kürze auf der Seite zu sehen sein.","pds.stockReminder.title":"Ich möchte angeschrieben werden, wenn dieser Artikel verfügbar ist!","pds.sizeReminder.contact.info":"Wie können wir dich kontaktieren?","search.noresult.placeholder":"Erneut suchen","article.size.select":"Größe wählen","pds.sizeReminder.title":"Ich möchte angeschrieben werden, wenn meine Größe verfügbar ist!","pds.stockReminder":"Ich möchte per E-Mail benachrichtigt werden, wenn dieser Artikel verfügbar ist!","reco.headline.xsell":"Dazu passt","pds.soldOut.size.notification":"Meine Größe anfragen","reco.headline":"Das könnte dir auch gefallen","pds.sizeReminder.sex.male":"männlich","pds.sizeReminder.request.info":"Sollte der Artikel innerhalb von 3 Monaten nicht verfügbar sein, wird deine Anfrage automatisch gelöscht.","brand.family.all":"alle","pds.partner.hint":"Versand durch Partner:","article.outofstock":"Leider ist der gewünschte Artikel nicht mehr verfügbar.","pds.sizeReminder.mySize":"Ich möchte per E-Mail benachrichtigt werden, wenn meine Größe verfügbar ist!","pds.selectArticle":"Bitte wähle eine Größe aus.","pds.productdetails":"Produktdetails"},"couponCode":{"valueDoesNotMatch":"Dieser Gutscheincode ist nicht vorhanden."},"technical":{"problems":{"title":"Ups! Ein Fehler."},"problems.title":"Ups! Ein Fehler."},"customer":{"register":{"newsletter":"Ja, ich möchte  über Trends, Aktionen \u0026 Gutscheine per E-Mail informiert werden. Abmeldung jederzeit möglich."},"wishlist":{"addedToCard":"Bereits im Warenkorb","add":"Auf den Wunschzettel"},"wishlist.add":"Auf den Wunschzettel","register.newsletter":"Ja, ich möchte  über Trends, Aktionen \u0026 Gutscheine per E-Mail informiert werden. Abmeldung jederzeit möglich.","wishlist.addedToCard":"Bereits im Warenkorb"},"main":{"mandatoryField":"* Pflichtfelder","send":"Absenden","more":"mehr","select":"Übernehmen","less":"weniger","pleaseChoose":"Bitte wählen","close":"Schließen"},"order":{"article":{"availability":{"notonstock":"Ausverkauft"}},"article.availability.notonstock":"Ausverkauft"},"page":{"not":{"found":{"headline":"Die gesuchte Seite wurde leider nicht gefunden."}},"not.found.headline":"Die gesuchte Seite wurde leider nicht gefunden."},"search":{"no":{"results":"Keine Vorschläge"},"top":{"brands":"Top Marken"},"no.results":"Keine Vorschläge","top.brands":"Top Marken"},"zalando":{"pdp":{"mini":{"outfitarticles":{"title":"Weitere Artikel des Looks"},"addToCartFailed":"Der Artikel konnte nicht zum Warenkorb hinzugefügt werden.","addToWishlistFailed":"Der Artikel konnte nicht zur Wunschliste hinzugefügt werden.","loadArticleFailed":"Der Artikel konnte nicht geladen werden."}},"cart":{"ajax":{"success":"In den Warenkorb gelegt"}},"pdp.mini.loadArticleFailed":"Der Artikel konnte nicht geladen werden.","pdp.mini.outfitarticles.title":"Weitere Artikel des Looks","threeSixtyViewClose":"360° schließen","cart.ajax.success":"In den Warenkorb gelegt","pdp.mini.addToWishlistFailed":"Der Artikel konnte nicht zur Wunschliste hinzugefügt werden.","pdp.mini.addToCartFailed":"Der Artikel konnte nicht zum Warenkorb hinzugefügt werden.","threeSixtyView":"360° Ansicht"},"PaymentMethodType":{"CREDITCARD":"Kreditkarte","CREDITCARD.number":"Kreditkartennummer","CREDITCARD.validity":"Gültigkeit","CREDITCARD.controlNumber":"Kartenprüfnummer","CREDITCARD.oner":"Name auf der Karte"},"wishlist":{"incTax":"inkl. MwSt."},"CreditCardType":{"MISTER_CASH":"Mister Cash","VISA":"Visa","TARJETAS":"Tarjetas","CARTA_SI":"Carta Si","MASTERCARD":"Master Card","EURO6000":"Euro 6000","SERVIRED":"ServiRed","VISA_ELECTRON":"Visa Electron","AMERICAN_EXPRESS":"American Express","CARTA_POSTEPAY":"Carta PostePay","MAESTRO_INTERNATIONAL":"Maestro International","CARTE_BLEUE":"Carte Bleue"},"packingStationMemberId":{"valueDoesNotMatch":"Ihre RC-Nummer besteht aus genau 9 Ziffern"},"modal":{"review":{"comment":{"content":"Deine Meinung","title":"Fazit"},"yourData":{"city":"Stadt (optional)"}},"review.comment.content":"Deine Meinung","review.yourData.city":"Stadt (optional)","review.comment.title":"Fazit"}};
        ZAL.staticImagePath = "https://secure-skin.ztat.net/s/pj-/zalando/img";
        ZAL.cdnPath = ZAL.staticImagePath.replace(/img$/,"");
        ZAL.PCIsrc = 'https://pay.zalando.com';

        ZAL.customer_firstname = "";
        ZAL.customer_lastname = "";
        ZAL.creditCardHolderName = ZAL.customer_firstname + ' ' + ZAL.customer_lastname;

        ZAL.customer = {
            firstName: ZAL.customer_firstname,
            lastName: ZAL.customer_lastname,
            sex: "",
            email: ""
        };
        ZAL.modalLoginEnabled = true;

        ZAL.localizedStrings.validation.placeholderSearch = 'Артикул или название товара';
    }
    catalogi('#searchTop').attr('placeholder', 'Артикул или название товара');
    catalogi('#searchMiniFormTop').submit(function(){
        catalogi.getTranslate(catalogi(this).find('#searchContent').val());
        return false;
    });

    catalogi('#searchMiniForm').submit(function(){
        catalogi.getTranslate(catalogi(this).find('#searchTop').val());
        return false;
    });

    catalogi('#searchMiniFormBottom').submit(function(){
        catalogi.getTranslate(catalogi(this).find('#searchBottom').val());
        return false;
    });

    // Список


    // Стр. товара
    catalogi('#articlePrice').bind('DOMNodeInserted', function(e){
        // стоимость с учетом доставки
        catalogi.service();
    });

    catalogi('.js-priceWrapper').bind('DOMNodeInserted', function(e){
        // стоимость с учетом доставки
        catalogi.serviceMob();
    });

    catalogi('#upcloadButton').on('mouseenter', function(){
        jQuery('#upcloadButton').unbind('click');
    });

    catalogi('#upcloadButton').click(function(){
        catalogi.sizeTable();
    });

    catalogi("#ajaxAddToCartBtn").on("click", function(){
        jQuery("#ajaxAddToCartBtn").unbind('click');
        var b = $("#listProductSizes").find("li.active"), b = b.length ? b.attr("id") : null;
        if (!b && !(b = $("#articleSimpleSku").val()))
            return !1;

        var articul = product.identifier;
        var name    = product.fn;
        var price   = catalogi('#articlePrice').text().replace(',','.').replace('€','').trim();
        var color   = catalogi('.colorList li.active img').attr('origin');
        var size    = catalogi('#listProductSizes li.active').attr('origin');
        var image   = catalogi('#image').attr('href');

        var param   = [];

        if(color && color != ''){
            param.push(color)
        }

        if(size && size != ''){
            param.push(size)
        }

        catalogi.basket.add({
            catalog: 'ZL',
            articul: articul,
            name: name,
            price: price,
            size: param.length > 0 ? param.join(' ') : '0',
            count: 1,
            img: image,
            stock: formatDate(new Date())
        });

        return !1
    });

    // Моб. версия
    ZAL.global.addToCart = function(){
        var articul = product.identifier;
        var name    = product.fn;
        var price   = catalogi('.js-priceWrapper').text().replace(',','.').replace('€','').replace('ab','').replace('от','').trim();
        var color   = catalogi('.colorList li.active img').attr('origin');
        var size    = catalogi('select[name="articleSimpleSku"] option:selected').attr('origin');
        var image   = catalogi('.slider li:first img').attr('src');

        var param   = [];

        if(color && color != ''){
            param.push(color)
        }

        if(size && size != ''){
            param.push(size)
        }

        catalogi.basket.add({
            catalog: 'ZL',
            articul: articul,
            name: name,
            price: price,
            size: param.length > 0 ? param.join(' ') : '0',
            count: 1,
            img: image,
            stock: formatDate(new Date())
        });
    }

    // Футер

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

/*** моб. версия ***/
catalogi.serviceMob = function(){
    if('_service' in window){
        var _price = catalogi('.js-priceWrapper').text().replace(',','.').replace('€','').replace('ab','').replace('от','').trim();
        if(_price != ''){
            var _delivery = parseFloat(_price)+(( parseFloat(_price)/100 )* parseFloat( _service ));
            if( catalogi('.freeShipping').text() != 'С учетом доставки € '+_delivery.toFixed(2) ){
                catalogi('.freeShipping').text('С учетом доставки € '+_delivery.toFixed(2));
            }
        }
    }
}


catalogi(function(){
    catalogi('body').removeClass('modalVisible');
    /***
     * Обработка команд с ifame
     **/
    catalogi(window).on('message', function(event){
        switch(event.originalEvent.data.action){
            case 'search':
                if(catalogi('#searchContent').length > 0) catalogi('#searchContent').val(event.originalEvent.data.search).parents('form').get(0).submit();
                if(catalogi('#searchTop').length > 0) catalogi('#searchTop').val(event.originalEvent.data.search).parents('form').get(0).submit();
                break
        }
        console.log(event.originalEvent.data);
    });

    catalogi.noTranslate();
    catalogi.parse();
});