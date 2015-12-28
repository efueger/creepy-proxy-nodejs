<?php

header('Access-Control-Allow-Origin: *');

$showErrors = FALSE;
//error_reporting(E_ALL ^ E_DEPRECATED ^ E_NOTICE);
error_reporting(E_ALL^E_NOTICE);
ini_set('display_errors', $showErrors);
ini_set('html_errors', $showErrors);

header('Content-Type: text/json; charset=UTF-8', false);
// адрес
//$url = "http://translate.google.com/translate_a/t?client=te&text=".urlencode($_GET['text'])."&hl=".$_GET['tl']."&sl=" .$_GET['sl']."&tl=" .$_GET['tl']."&multires=1&otf=1&ssel=0&tsel=0&uptl=ru&sc=1";
$url = "http://api.multillect.com/translate/json/1.0/233?method=translate/api/translate&from=rus&to=deu&text=".urlencode($_GET['text'])."&sig=da90beda7bd49d07d1c9f2a2b96c4318";
// браузеры
$browser = array(
    "user_agent" => "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6 (.NET CLR 3.5.30729)",
    "language" => "en-us,en;q=0.5"
);

// фомрируем курл запрос
$ch = curl_init();
// указываем url
curl_setopt($ch, CURLOPT_URL, $url);
// указываем заголовки для браузера
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "User-Agent: {$browser['user_agent']}",
    "Accept-Language: {$browser['language']}"
));
// нам необходимо получить HTTP заголовки
curl_setopt($ch, CURLOPT_HEADER, 0);
// возвращаем результаты вместо вывода
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// записываем результат в переменную
$output = curl_exec($ch);
// закрываем соединение
curl_close($ch);

echo $output;
