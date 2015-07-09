'use strict';

var Spider = require('../lib/');

var s = new Spider();


//s.addUrl('http://fotocasa.es/info/mapa-web/')
s.addUrl('http://www.fotocasa.es/garaje/sevilla-capital/puerta-automatica-san-carlos-san-jose-134113068?opi=140&tti=3&ppi=3&pagination=1&RowGrid=25&tta=5&tp=1')
    .addLevel({
        pattern: /http:\/\/fotocasa.es\/info\/mapa-web/,
        action: function (webpage) {
            var links;
            var $ = webpage.dom;
            var parentRent = $('.box > .box-content > ul.bullet-list.bullet-1:last-child').last();
            links = parentRent.find('a')
                .map(function () {
                    return $(this).attr('href');
                })
                .toArray()
                .map(function (link) {
                    return link.replace('viviendas', 'garajes');
                })
                .forEach(function (link) {
                    s.addUrl(link);
                });
        }
    })
    .addLevel({
        pattern: /http:\/\/www.fotocasa.es\/garajes\/[^\/]+\/alquiler\/listado/,
        action: function (webpage) {
            console.log('got a listing');
            var $ = webpage.dom;
            var nextPageLink = $('.pagination-next a').attr('href');
            s.addUrl(nextPageLink);
            $('a[data="viewDetail"]').each(function() {
                s.addUrl($(this).attr('href'));
            });
        }
    })
    .addLevel({
        pattern: /http:\/\/www.fotocasa.es\/garaje\//,
        action: function(webpage) {
            console.log('in detail %s ?', webpage.url);
            var $ = webpage.dom;
            var detail = {};
            detail.title = $('h1.property-title').text().trim();
            detail.address = $('h1.property-title').text().trim();
            detail.area = $('#inificha > div > ul > li:nth-child(1)').text();
            detail.price = $('#inificha > div > ul > li:nth-child(3)').text();
            detail.images = $('#ficha_fotos img').map(function() {return $(this).attr('src')}).toArray();
            var mapScriptText = $('div.bloquemapa script:last-child').text();
            var re = /V.*\(([^\)]+)\)[^\(]+\(([^\)]+)/m;
            var coordinatesExtract = re.exec(mapScriptText);
            if(coordinatesExtract && coordinatesExtract.length === 3) {
                detail.longitude = coordinatesExtract[2];
                detail.latitude = coordinatesExtract[1];
            }
            console.log(detail);
        }
    })
    .addLevel({
        pattern: /.*/,
        action: function (webpage) {
            console.log(webpage.url);
        }
    })
    .start();