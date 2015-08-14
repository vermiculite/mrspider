'use strict';

var cheerio = require('cheerio');
var Level = require('./Level');
var webPage = require('./WebPage');
var UrlCollection = require('./UrlCollection');

class Spider {


    constructor() {
        this.urls = new UrlCollection();
        this.levels = [];
        this.webpage = webPage;
        this.webpage.on('load', this.executeLevels.bind(this));
    }


    addUrl(url) {
        this.urls.add(url);
        return this;
    }


    start() {
        var self = this;
        self.intervalId = setInterval(self.crawl.bind(self), 1000);
        return self;
    }


    crawl() {
        var self = this;
        var url = self.urls.next();

        if (url) {
            self.webpage.load(url);
        }

        return self;
    }


    addLevel(level) {
        var self = this;
        self.levels.push(new Level(level));
        return self;
    }


    executeLevels(webpage) {
        var self = this;
        self.levels.forEach(function (level) {
            level.execute(webpage);
        });
        if(!this.urls.hasNext()) {
            self.stop();
        }
        return self;
    }


    stop() {
        clearInterval(this.intervalId);
    }
}

module.exports = Spider;
