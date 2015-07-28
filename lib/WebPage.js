'use strict';

var cheerio = require('cheerio');
var request = require('request');
var EventEmitter = require('events').EventEmitter;


const HEADERS = {
    'accept': "application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5"
    , 'accept-language': 'en-US,en;q=0.8'
    , 'accept-charset':  'ISO-8859-1,utf-8;q=0.7,*;q=0.3'
    , 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36'
}


class WebPage extends EventEmitter {


    setContent(htmlString) {
        var self = this;
        self.dom = cheerio.load(htmlString);
        self.emit('load', self);
    }


    load(url) {
        var self = this;
        self.url = url;
        request({url: url, headers: HEADERS}, responseHandler.bind(self));
    }

}


function responseHandler(error, response, body) {
    var self = this;
    if (body) {
        return self.setContent(body);
    }
    self.emit('error', this);
}


module.exports = WebPage;