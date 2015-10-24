/**
 * AS taken from this gist https://gist.github.com/gmarcus/934787
 * original dies after 840 fetches
 * @type {*}
 */

var Spider = require('../..');
var spider = new Spider();
var counter = 0;

spider
    .addUrl('http://itunes.apple.com/us/genre/ios/id36?mt=8')
    .addLevel(
    {
        pattern: /itunes.apple.com\/us\/genre\/*/,
        action: function (webpage) {
            console.log("Fetching page: %s, for the %s th time", webpage.url, ++counter);
            var $ = webpage.$();
            // spider all genres
            $('div#genre-nav.main.nav a').each(function () {
                spider.addUrl($(this).attr('href'));
            });
            // spider all letters per genre
            $('div#selectedgenre ul.list.alpha li a').each(function () {
                spider.addUrl($(this).attr('href'));
            });
            // spider all numbered pages of letters per genre
            $('div#selectedgenre ul.list.paginate li a').each(function () {
                spider.addUrl(
                    webpage.css(this).attr('href')
                );
            });
        }
    }).start();
