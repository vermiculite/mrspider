'use strict';

var Spider = require('.');
var s = new Spider();
s.addUrl('http://www.habitaclia.com/alquiler.htm')
    .addLevel({
        pattern: /http:\/\/www.habitaclia.com\/alquiler.htm/,
        action: function(webpage) {
            var $ = webpage.dom;
            $('#cod_prov').find('option').each(function() {
                var province = $(this).val();
                var link = `http://www.habitaclia.com/alquiler-aparcamiento-en-${province}/buscador.htm`;
                s.addUrl(link);
            });
        }
    })
    .addLevel({
        pattern: /http:\/\/www.habitaclia.com\/alquiler-aparcamiento-en-[\w]+\/buscador.htm/,
        action: function (webpage) {
            var $ = webpage.dom;
            $('.verticalul a').each(function() {
                s.addUrl($(this).attr('href'));
            });
        }
    })
    .addLevel({
        pattern: /http:\/\/www.habitaclia.com\/alquiler-aparcamiento-en-[^\/]+\/provincia_[^\/]+\/\w+.htm/,
        action: function(webpage) {
            var $ = webpage.dom;
            var href = $('.ver-todo-zona a').attr('href');
            if(href) {
                s.addUrl(href);
            }  
        }
    })
    .addLevel({
        pattern: /http:\/\/www.habitaclia.com\/alquiler-aparcamientos-.*.htm/,
        action: function(webpage) {
            var $ = webpage.dom;
            $('.enlista .datos h3 > a').each(function() {
                s.addUrl($(this).attr('href'));
            });
            s.addUrl($('.paginacionlista a:last-child').attr('href'));
        }
    })
    .addLevel({
        pattern: /.*/,
        action: function (webpage) {
            console.log('crawling %s...', webpage.url);
        }
    })
    .addLevel({
        pattern: /http:\/\/www.habitaclia.com\/alquiler-aparcamiento_.*i\d+.htm/,
        action: function (webpage) {
            console.log('in detail %s ?', webpage.url);
            var $ = webpage.dom;
            var detail = {};
            var coords = {};
            detail.title = $('h1.h1ficha').text();
            detail.address = $('.dir_ex.sprite').text().trim();
            detail.area = $('#inificha > div > ul > li:nth-child(1)').text();
            detail.price = $('#inificha > div > ul > li:nth-child(3)').text();
            detail.images = $('#ficha_fotos img').map(function() {return $(this).attr('src')});
            eval($('#contents_n > div:nth-child(8) > div.bodis > div.bottom-ficha.radius.ohidden > div.bloquemapa > script:nth-child(5)').text());
            if(process.oGMapsConfig) {
                coords.lat = oGMapsConfig.VGPSLat;
                coords.lng = oGMapsConfig.VGPSLon;
            }
            detail.coords = coords;
            console.log(detail);
        }
    })
    .start();
