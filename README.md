
# Mr Spider
## Crawl the web politely.
[![NPM](https://nodei.co/npm/mrspider.png?downloads=true&downloadRank=true)](https://nodei.co/npm/mrspider/)

![alt tag](https://travis-ci.org/vermiculite/mrspider.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/vermiculite/mrspider/badge.svg?branch=master&service=github)](https://coveralls.io/github/vermiculite/mrspider?branch=master)

[![Join the chat at https://gitter.im/vermiculite/mrspider](https://badges.gitter.im/vermiculite/mrspider.svg)](https://gitter.im/vermiculite/mrspider?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Installation

```bash
$ npm i mrspider --save
```

## Example
[An example for parking data](https://github.com/vermiculite/mrspider-parking-example)

## Included streams

####Fetch the page

[mrspider request](https://github.com/vermiculite/mrspider-request)

```js
let spider = mr.Spider({
    baseUrl: 'http://www.idealista.com'
});
let mr = require('mrspider');
let request = mr.request();

spider.createReadStream.pipe(request);
```

####Parse DOM

[mrspider cheerio](https://github.com/vermiculite/mrspider-cheerio)

```js
let spider = mr.Spider({
    baseUrl: 'http://www.idealista.com'
});
let mr = require('mrspider');
let mrspiderCheerio = mr.cheerio;
spider.createReadStream().pipe(...).pipe(cheerio);
```

[mrspider JSDOM](https://github.com/vermiculite/mrspider-jsdom)

```js
let spider = mr.Spider({
    baseUrl: 'http://www.idealista.com'
});
let mr = require('mrspider');
let jsdom = mr.jsdom;
spider.createReadStream().pipe(...).pipe(jsdom);
```

####Parse Data

[mrspider regex data extractor](https://github.com/vermiculite/mrspider-regex-data-extractor)

[mrspider css data extractor](https://github.com/vermiculite/mrspider-css-data-extractor)

[mrspider css links](https://github.com/vermiculite/mrspider-css-links)

[mrspoder image extraction](https://github.com/vermiculite/mrspider-css-image-extraction)

####Data validation

[mrspider validator](https://github.com/vermiculite/mrspider-validator)

####Data persistence

[mrspider mongodb persister](https://github.com/vermiculite/mrspider-mongodb-persister)

## Features

  * Super simple api.
  * Streaming architecture allows complete customisation.
  * Use the full power of JavaScript giving you great flexibility.

## Tests

To run the test suite, first install the dependencies, then run `npm test`:

