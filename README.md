[![NPM](https://nodei.co/npm/mrspider.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mrspider/)

![alt tag](https://travis-ci.org/vermiculite/mrspider.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/vermiculite/mrspider/badge.svg?branch=master&service=github)](https://coveralls.io/github/vermiculite/mrspider?branch=master)

# Mr Spider
## Crawl the web politely.
For use with [io.js](https://iojs.org/ "io.js") > 2.0 

```js

var Spider = require('mrspider');

var s = new Spider();

s.addUrl('http://blog.scrapinghub.com')
    .addLevel({
        /*
         *   Deal with all links on this domain.
         * */
        pattern: /http:\/\/blog.scrapinghub.com/,
        action: function (webpage) {
            // webpage.dom is a jquery like object
            var $ = webpage.dom;
            $('ul li a').each(function() {
                var link = $(this).attr('href');
                console.log(link);
                // add the url to be crawled.
                s.addUrl(link);
            })
        }
    })
    .addLevel({
        /*
         * For the categories do this.
         * */
        pattern: /http:\/\/blog\/scraping.com\/category/,
        action: function (webpage) {
            // here you could do something useful or ...
            console.log('do something for the categories.');
        }
    })
    /*
     * We have the flexibility to do what we like.
     * So here we match all urls and just log the url to the console.
     * */
    .addLevel({
        pattern: /.*/,
        action: function(webpage) {
            console.log('crawling %s', webpage.url);
        }
    })
    .start();

```


## Installation

```bash
$ npm i mrspider --save
```


## Features

  * Super simple api.
  * Use jquery selectors to scrape links/ information.
  * Use the full power of JavaScript giving you great flexibility.

## Tests

To run the test suite, first install the dependencies, then run `npm test`:
