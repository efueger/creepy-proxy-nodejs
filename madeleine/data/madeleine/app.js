var cluster = require('cluster');

if (cluster.isMaster) {
	console.log('Start master');
	cluster.fork();
	cluster.fork();
	//cluster.fork();
	//cluster.fork();

	cluster.on('disconnect', function(worker) {
		console.error('Worker disconnect!');
		cluster.fork();
	});

} else {
	console.log('Start worker');

	var domain = require('domain'),
		http = require('http'),
		url = require('url'),
		querystring = require('querystring'),
		Iconv = require('iconv').Iconv,
		proxy = require('./proxy');

		var iconv = new Iconv('latin1', 'utf-8');

	var server = http.createServer(function(req, res) {
		var errHandler = domain.create();

		errHandler.on('error', function(err) {
			console.error('error', err.stack);

			try {
				var killtimer = setTimeout(function() {
					process.exit(1);
				}, 10);

				killtimer.unref();

				server.close();

				cluster.worker.disconnect();

				res.statusCode = 500;
				res.setHeader('Content-Type', 'text/html; charset=UTF-8');
				res.end('Сервис временно недоступен!');
			} catch (er) {
				console.error('Error sending HTTP response', er, req.url);
			}
		});

		errHandler.add(req);
		errHandler.add(res);

		errHandler.run(function() {
			var _post = '';

			req.addListener("data", function(data) {
				_post += data;
			});

			var query = querystring.parse(url.parse(req.url).query);
			var param = {
				catalog: 'madeleine',
				alias: 'ML',
				info: 'Интернет-магазин MADELEINE. Каталоги.ру - заказ и доставка одежды из европейских интернет-магазинов.'
			};

			if ('utm_medium' in query) param['utm_medium'] = query['utm_medium'];
			if ('utm_source' in query) param['utm_source'] = query['utm_source'];
			if ('utm_campaign' in query) param['utm_campaign'] = query['utm_campaign'];

			var includes = require('./includes')('madeleine', querystring.stringify(param), '958');

			req.addListener('end', function() {

				/*** Формирование заголовков запроса ***/
				var _header = {};
				if ('user-agent' in req.headers) _header['User-Agent'] = req.headers['user-agent'];
				if ('content-type' in req.headers) _header['Content-Type'] = req.headers['content-type'];
				if ('cookie' in req.headers) _header['Cookie'] = req.headers['cookie'];

				// Интеграция хоста в заголовок
				var host = req.headers.host.replace('c.madeleine.catalogi.ru', 'madeleine.scoopcatalogue.de').replace('madeleine.catalogi.ru', 'madeleine.de');
				_header['Host'] = host;

				var request = http.request({
					host: proxy(),
					port: 3129,
					path: 'http://' + host + req.url,
					method: req.method,
					headers: _header
				}, function(response) {

					// Заголовки
					if ('content-type' in response.headers) res.setHeader('Content-Type', response.headers['content-type']);

					if ('location' in response.headers) res.setHeader('Location', response.headers['location'].replace('madeleine.scoopcatalogue.de', 'c.madeleine.catalogi.ru').replace('madeleine.de', 'madeleine.catalogi.ru'));

					if ('set-cookie' in response.headers) {
						var _cookie = response.headers['set-cookie'];
						_cookie.push([
						  'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
						  'googtrans=%2Fde%2Fru; path=/; domain=madeleine.catalogi.ru'
						]);
						res.setHeader('Set-cookie', _cookie);
					} else {
						var _cookie = [];
						_cookie.push([
						  'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
						   'googtrans=%2Fde%2Fru; path=/; domain=madeleine.catalogi.ru'
						]);
						res.setHeader('Set-cookie', _cookie);
					}

					res.writeHead(response.statusCode);

					response.on('data', function(chunk) {
						if (res.headersSent) {
							var _out = chunk.toString();
							out = _out.replace(/madeleine\.de/g, 'madeleine.catalogi.ru');

							// Замена
							out = out.replace(/madeleine\.scoopcatalogue\.de/g, 'c.madeleine.catalogi.ru');
							out = out.replace(/blaetterkatalog\/script\/bk_script\.js/g, 'http://www.madeleine.catalogi.ru/static/bk_script.js');

							if (req.headers.host !== 'c.madeleine.catalogi.ru') {
								out = out.replace('<head>', '<head>' + includes.head);
								out = out.replace('</body>', includes.body.top + includes.body.bottom + '</body>');
								//out = out.replace('<body>', includes.body.top);
								//out = out.replace(includes.body.bottom + '</body>');

							}
							
							out = out.replace(/NEWS &amp; SPECIALS/g, '');
							//out = out.replace(/MODE-BERATUNG/g, '');
                            out = out.replace(/MODE-BERATUNG/g, 'Каталоги');
                            out = out.replace('www.madeleine.catalogi.ru/modeberatung/', 'www.madeleine.catalogi.ru/service/kataloge/blaetterkataloge/');

							out = out.replace(/MODE/g, 'одежда');
							out = out.replace(/SCHUHE &amp; ACCESSOIRES/i, 'обувь & аксессуары');
							out = out.replace(/THEMEN &amp; TRENDS/i, 'тренды');
							out = out.replace(/SALE/g, 'Распродажа');

							out = out.replace(/Dessous/g, 'Нижнее белье');
							out = out.replace(/Strick/g, 'Трикотаж');
							out = out.replace(/Pumps/g, 'Туфли на каблуке');
							out = out.replace(/Taschen/g, 'Сумки');
							out = out.replace(/Pantoletten/g, 'Босоножки');
							out = out.replace(/Kleider/g, 'Платья');
							
							out = out.replace(/NEU/g, 'NEW');
							out = out.replace(/In den Warenkorb/g, 'Добавить в корзину');

							
							out = out.replace(/Bestellnummer/g, 'Артикул');
							out = out.replace(/Produktdetails/g, 'Описание товара');
							out = out.replace(/Materialinfos/g, 'Состав');
							out = out.replace(/Produktansichten/g, 'Посмотреть товар');

							out = out.replace(/Kurzgr&#246;&#223;en/g, 'Короткие размеры');
							out = out.replace(/Kurzgr&#246;&#223;e/g, 'рост 156-163см');

							out = out.replace(/Normalgr&#246;&#223;e/g, 'рост 164-172');

							out = out.replace(/Langgr&#246;&#223;en/g, 'Длинные размеры');
							out = out.replace(/Langgr&#246;&#223;e/g, 'рост от 173см');

							out = out.replace(/Ihre gew&#228;hlte Gr&#246;&#223;e/g, 'Выбранный размер');

                            out = out.replace('"web11647Banner"', 'bye-bye my dear banner');
                            out = out.replace('fl_main fl_col_5 fl_col_advisoryservice web-11080 touch-me', 'bye-bye my dear banner');
                            out = out.replace('fl_main fl_col_6 fl_main_last fl_col_advisory web-11080 touch-me', 'bye-bye my dear banner');

							out = out.replace(/Zur&#252;ck/g, 'Назад');
							out = out.replace(/Weiter/g, 'Вперед');

							out = out.replace(/Cupgr&#246;&#223;en/g, 'Размеры чашек');
							out = out.replace(/lieferbar in 5 bis 6 Wochen/g, 'доступны в теч. 5 - 6 недель');

							out = out.replace(/Au&#223;enmaterial/g, 'Внешний материал');
							out = out.replace(/F&#252;llung/g, 'Наполение');
							out = out.replace(/Futter/g, 'Подкладка');
							out = out.replace(/Besatz/g, 'Отделка');


							out = out.replace('//static.criteo.net/js/ld/ld.js', '');
							out = out.replace(/adition.com/g, '');
							out = out.replace(/googleadservices.com/g, '');

							out = out.replace(/madeleine\.122\.2o7\.net/g, '');

							res.write(out);
						}
					});

					response.on('end', function() {
						res.end();
					});
				});

				request.on('error', function(err) {
					throw new Error('Marke request error - ' + err.message);
				});

				request.write(_post);
				request.end();
			});
		});

	}).listen(5055);

}

setInterval(function() {
	global.gc(); // --expose-gc
}, 100);