'use strict';

var WebPage = require('./WebPage');
var UrlCollection = require('./UrlCollection');
var middleware = require('./middlewareManager');

function Spider() {
    this.urls = new UrlCollection();
    this.middlewares = middleware();
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
        let webpage = new WebPage(url);
        self.middlewares.execute(webpage, self);
    }
    return self;
};

Spider.prototype.stop = function () {
    clearInterval(this.intervalId);
};

module.exports = Spider;
