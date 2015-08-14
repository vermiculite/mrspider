'use strict';

var cheerio = require('cheerio');
var Level = require('./Level');
var webPage = require('./WebPage');
var UrlCollection = require('./UrlCollection');


function Spider() {
    this.urls = new UrlCollection();
    this.levels = [];
    this.webpage = webPage;
    this.webpage.on('load', this.executeLevels.bind(this));
}


Spider.prototype.addUrl = function (url) {
    this.urls.add(url);
    return this;
};


Spider.prototype.start = function () {
    var self = this;
    self.intervalId = setInterval(self.crawl.bind(self), 1000);
    return self;
};


Spider.prototype.crawl = function () {
    var self = this;
    var url = self.urls.next();

    if (url) {
        self.webpage.load(url);
    }

    return self;
};


Spider.prototype.addLevel = function (level) {
    var self = this;
    self.levels.push(new Level(level));
    return self;
};


Spider.prototype.executeLevels = function (webpage) {
    var self = this;
    self.levels.forEach(function (level) {
        level.execute(webpage);
    });
    if (!this.urls.hasNext()) {
        self.stop();
    }
    return self;
};


Spider.prototype.stop = function () {
    clearInterval(this.intervalId);
};
removed class sugar to allow use with standard nod
module.exports = Spider;
