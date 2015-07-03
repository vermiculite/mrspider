'use strict';

var cheerio = require('cheerio');
var request = require('request');
var EventEmitter = require('events').EventEmitter;

class WebPage extends EventEmitter {


    setContent(htmlString) {
        var self = this;
        self.dom = cheerio.load(htmlString);
        self.emit('load', self);
    }


    load(url) {
        var self = this;
        self.url = url;
        request(url, responseHandler.bind(self));
    }
}


function responseHandler(error, response, body) {
    this.setContent(body);
}


module.exports = WebPage;