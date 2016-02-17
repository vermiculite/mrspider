"use strict";

var from2 = require('from2');
const politeness = 1000;

class Spider {
    constructor(options) {
        this.urls = [];
    }

    addUrl(url) {
        this.urls = [...this.urls, url];
    }

    crawl() {
        return from2({
            highWaterMark: 1,
            objectMode: true
        }, handleCrawl.bind(this));
    }
}

function handleCrawl(size, next) {
    if(!this.urls.length) {
        return setTimeout(() => {next(null, null);}, politeness);
    }
    var url = this.urls[0];
    this.urls = this.urls.slice(1);
    setTimeout(() => {next(null, {url, spider: this});}, politeness);
}

module.exports = function(options) {
    return new Spider(options);
};