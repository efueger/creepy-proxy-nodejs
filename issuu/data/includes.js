module.exports = function(catalog, param, options){
    return {
        head :[
            '<script type="text/javascript" src="http://www.'+catalog+'.catalogi.ru/static/common.js"></script>'
        ].join("\n"),
    }
}