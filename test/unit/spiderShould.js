'use strict';
var Spider = require('../../lib/index');

describe('spider', function () {

    var spider;
    var level;

    beforeEach(function functionName() {
        spider = Spider();
        level = {
            pattern: /http:\/\/google.com/,
            action: function () {
            }
        }
    });

    it('should be ok', function () {
        (function () {
            var spider = Spider();
        }).should.not.throw(Error);
    });

    describe('#addUrl', function () {

        it('should return a spider instance', function () {
            var returns = spider.addUrl();
            returns.should.equal(spider);
        });

        it('should add a url given a call to addUrl', function() {
            var spider = new Spider();
            spider.addUrl('http://abc.com');
            spider.urls.hasNext().should.equal(true);
            spider.urls.next().should.equal('http://abc.com');

        });

        it('should construct a full url given a baseUrl and a path', function() {
            var spider = Spider({
                baseUrl: 'http://www.fotocasa.es'
            });
            var path = '/garaje/barcelona-capital/puerta-automatica-la-sagrera-135229622';
            var spy = sinon.spy(spider.urls, 'add');
            spider.addUrl(path);

            spy.calledWith('http://www.fotocasa.es/garaje/barcelona-capital/puerta-automatica-la-sagrera-135229622').should.equal(true);
        });
    });

    describe('#crawl', function () {

        it('should return an instance of spider', function () {
            var returns = spider.crawl()
            returns.should.equal(spider);
        });

        it('should ask for the next url', function () {
            var nextSpy = sinon.spy(spider.urls, 'next');
            spider.crawl();
            nextSpy.called.should.equal(true);
            spider.urls.next.restore();
        });

        it('should call delayed crawl after all', function () {
           var spider = Spider();
            spider.use(function(page, spider, next) {
                next();
            });
            var spy = sinon.spy(spider, 'delayedCrawl');
            spider.crawl();
            setImmediate(function() {
                spy.called.should.equal(true);
            });

        });

    });

    describe('#addErrorHandler', function () {

        it('should throw an error given a non existant handler', function () {
            var spider = Spider();
            (function () {
                spider.addErrorHandler(null);
            }).should.throw(Error);
        });

        it('should throw an error given a non function handler', function () {
            var spider = Spider();
            (function () {
                spider.addErrorHandler('I am a string');
            }).should.throw(Error);
        });

    });

    describe('#delayedCrawl', function () {

        it('should call crawl after one second.', function (done) {
            this.timeout(2000);
            var spider = Spider();
            spider.crawl = done;
            spider.delayedCrawl();
        });
    });
});
