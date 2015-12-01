'use strict';

var WebPage = require('./WebPage');
var UrlCollection = require('./UrlCollection');
var middleware = require('./middlewareManager');


function Spider() {
    this.urls = new UrlCollection();
    this.middlewares = middleware();
    this.errorHandlers = [];
    this.webpage = new WebPage();
    this.webpage.on('load', this.executeLevels.bind(this));
    this.webpage.on('error', this.onPageLoadError.bind(this));
    this.middleware = middleware();
}


Spider.prototype.addUrl = function (url) {
    this.urls.add(url);
    return this;
};


Spider.prototype.addErrorHandler = function(errorHandler) {
    if(typeof errorHandler !== 'function') {
        throw new Error('Error handlers must be a function');
    }
    this.errorHandlers.push(errorHandler);
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


Spider.prototype.executeLevels = function (webpage) {
    var self = this;
    if (!this.urls.hasNext()) {
        self.stop();
    }
    return self;
};


Spider.prototype.onPageLoadError = function(webpage) {
    this.errorHandlers.forEach(function(errorHandler) {
        errorHandler(webpage);
    });
};


Spider.prototype.stop = function () {
    clearInterval(this.intervalId);
};


module.exports = Spider;
