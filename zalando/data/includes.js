module.exports = function(catalog, param, options){
  return {
    head :[
      '<meta name="google" value="notranslate" />',
      '<link href="http://cdn.catalogi.ru/static/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css" />',
      '<link href="http://cdn.catalogi.ru/static/css/jquery.colorbox.css" rel="stylesheet" type="text/css" />',
      '<link href="http://cdn.catalogi.ru/static/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />',
      '<link href="/static/common.css" rel="stylesheet" type="text/css" />',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery-2.1.4.min.js"></script>',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.mousewheel.js"></script>',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.jscrollpane.min.js"></script>',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.colorbox-min.js"></script>',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine-ru.js"></script>',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.validationEngine.js"></script>',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/jquery.cookie.js"></script>',
      '<script type="text/javascript" src="http://cdn.catalogi.ru/static/js/common.js"></script>',
      '<script type="text/javascript" src="/static/common.js"></script>',
      '<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>'
    ].join("\n"),

    body: {
      top: [
        '<div id="google_translate_element" style="display: none"></div>',
        '<iframe src="http://cdn.catalogi.ru/executable/index.php?'+param+'" width="'+options.width+'px" height="'+options.height+'px" frameborder="0" name="_head" id="iframe"/>'
      ].join("\n"),

      bottom: [].join("\n"),
    }
  }
}