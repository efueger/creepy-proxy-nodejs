var config = require('config'),
    cluster = require('cluster');

var SITENAME = config.get('site.name'),
    SITEDOMAIN = config.get('site.domain'),
    SITE = SITENAME + SITEDOMAIN,
    HEADERPARAMS = {
        param: {
            catalog: config.get('header.catalog'),
            alias: config.get('header.alias'),
            info: config.get('header.info')
        },
        options: {
            height: config.get('options.height'),
            width: config.get('options.width')
        }
    };
var replaces = config.get('replaces');

if (cluster.isMaster) {
    console.log('Start master');
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();

    cluster.on('disconnect', function (worker) {
        console.error('Worker disconnect!');
        cluster.fork();
    });

} else {
    console.log("Start worker");
    var http = require("http"),
        request = require("request"),
        replacestream = require("replacestream"),
        querystring = require("querystring"),
        proxy = require("./proxy"),
        includes = require("./includes")(SITENAME, querystring.stringify(HEADERPARAMS.param), HEADERPARAMS.options);


    var server = http.createServer(function (req, res) {
        console.log('Trying to access: ' + req.headers.host + req.url);

        var _header = {};
        if ('user-agent' in req.headers) _header['User-Agent'] = req.headers['user-agent'];
        if ('content-type' in req.headers) _header['Content-Type'] = req.headers['content-type'];
        if ('cookie' in req.headers) _header['Cookie'] = req.headers['cookie'];
        var host = req.headers.host.replace(SITENAME + '.catalogi.ru', SITE);

        _header['Host'] = host;

        proxyfull = "http://" + proxy() + ":3129";
        console.log("Accessing via:" + proxyfull);

        var proxiedReq = request.defaults({
            proxy: proxyfull,
            headers: _header
        });
        var start = new Date();
        console.log("Request starting: " + start);
        var piper = proxiedReq.get("http://" + host + req.url)
            .on('error', function (err) {
                console.error(err);

                try {
                    var killtimer = setTimeout(function () {
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
            })
            .on('response', function (response) {
                if ('location' in response.headers) response.setHeader('Location', response.headers['location'].replace(SITE, SITENAME + '.catalogi.ru'));

                var _cookie = [];

                if ('set-cookie' in response.headers) {
                    _cookie = response.headers['set-cookie'];
                    _cookie.push([
                        'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
                        'googtrans=%2Fde%2Fru; path=/; domain=' + SITENAME + '.catalogi.ru'
                    ]);
                    res.setHeader('Set-cookie', _cookie);
                } else {
                    _cookie.push([
                        'googtrans=%2Fde%2Fru; path=/; domain=.catalogi.ru',
                        'googtrans=%2Fde%2Fru; path=/; domain=' + SITENAME + '.catalogi.ru'
                    ]);
                    res.setHeader('Set-cookie', _cookie);
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
                console.log(new Date() - start);
            })
            .pipe(replacestream(SITE, SITENAME + '.catalogi.ru'));

        replaces.forEach(function (item, i, arr) {
            console.log(item.type + " " + item.from);
            if (item.type === "usual") {
                piper = piper.pipe(replacestream(item.from, item.to));
            }
            else if (item.type === "regex") {
                piper = piper.pipe(replacestream(new RegExp(item.from, item.args), item.to));
            }
        });

        piper.pipe(replacestream('</body>', includes.body.top + includes.body.bottom + '</body>'))
            .pipe(replacestream('<head>', '<head>' + includes.head))
            .pipe(replacestream(new RegExp('/images', 'ig'), 'http://' + SITENAME + '.catalogi.ru/images'))
            .pipe(res);

    }).listen(config.get('site.port'));
}