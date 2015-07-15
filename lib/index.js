'use strict';

var cheerio = require('cheerio');
var Level = require('./Level');
var WebPage = require('./WebPage');
var UrlCollection = require('./UrlCollection');

class Spider {


    constructor() {
        this.urls = new UrlCollection();
        this.levels = [];
        this.webpage = new WebPage();
        this.webpage.on('load', this.executeLevels.bind(this));
    }


    addUrl(url) {
        this.urls.add(url);
        return this;
    }


    start() {
        var self = this;
        setInterval(self.crawl.bind(self), 1000);
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
        return self;
    }
}

module.exports = Spider;