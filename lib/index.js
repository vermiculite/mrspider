"use strict";

var from2 = require('from2');
var url = require('url');

class Spider {

    constructor(options) {
        this.urls = {};
        this.baseUrl = options.baseUrl;
        this.linkExtractors = [];
        this.dataExtractors = [];
        this.politeness = options.politeness || 1000;
    }

    addUrls(links) {
        links.forEach(link => {
            link = url.resolve(this.baseUrl || '', link);
            this.urls[link] = {
                url: link,
                fetched: false,
                fetching: false
            }
        });
    }

    addFetcher(fetcher) {
        this.fetcher = fetcher;
    }

    addParser() {
        this.parser = parser;
    }

    addLinkExtractor(linkExtractor) {
        this.linkExtractors.push(linkExtractor);
    }

    addDataExtractor(dataExtractor) {
        this.dataExtractors.push(dataExtractor)
    }

    start() {
        let {fetcher, parser, politeness} = this;
        let thePipe = createReadStream.call(this, politeness)
            .pipe(fetcher)
            .pipe(parser);
    
        this.linkExtractors.forEach(le => thePipe = thePipe.pipe(le));
        this.dataExtractors.forEach(de => thePipe = thePipe.pipe(le));
        thePipe.on('end', ()=> {
            console.log('finished');
        })
    }
}

function createReadStream(politeness) {
    return from2({
        highWaterMark: 1,
        objectMode: true
    }, (size, next) => {
        setTimeout(() => {
            let url = this.urls.shift();
            let page = url ? {
                url,
                spider: this
            } : null;
            next(null, page);
        }, politeness);
    });
}


module.exports = function (options) {
    return new Spider(options);
};