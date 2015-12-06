'use strict';

var WebPage = require('./WebPage');
var UrlCollection = require('./UrlCollection');
var middleware = require('./middlewareManager');
var  ONE_SECOND = 1 * 1000;

function Spider(options) {
    this.urls = new UrlCollection();
    this.middlewares = middleware();
    this.politeness = options.politeness || ONE_SECOND;
}

Spider.prototype.addUrl = function (url) {
    this.urls.add(url);
    return this;
};

Spider.prototype.crawl = function () {
    var self = this;
    var url = self.urls.next();
    var webpage;
    if (url) {
        webpage = new WebPage(url);
        self.middlewares.execute(webpage, self, function() {
            console.log('hey there');
            self.delayedCrawl.call(self);
        });
    }
    return self;
};

Spider.prototype.delayedCrawl = function() {
  var self = this;
    setTimeout(self.crawl.bind(self), self.politeness);
};

Spider.prototype.use = function(fn) {
    var self = this;
    self.middlewares.use(fn);
    return self;
};

module.exports = function(options) {
    return new Spider(options || {});
};
