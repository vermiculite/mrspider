'use strict';

var Spider = require('.');
console.log('hello from your friendly habitaclia crawler...');
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
    .start();