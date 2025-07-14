"use strict";

var from2 = require('from2');
var url = require('url');

const politeness = 1000;

class Spider {
    constructor(options) {
        this.urls = [];
        this.baseUrl = options.baseUrl;
    }

    addUrl(link) {
        this.urls = [...this.urls, url.resolve(this.baseUrl || '', link)];
    }

    createReadStream() {
        return from2({
            highWaterMark: 1,
            objectMode: true
        }, (size, next) => {
            setTimeout(() => {
                let url = this.urls.shift();
                let page = url ? {
                    url, spider: this
                } : null;
                next(null, page);
            }, politeness);
        });
    }
}

export default function(options) {
    return new Spider(options);
};