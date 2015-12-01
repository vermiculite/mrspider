'use strict';
var Spider = require('../../lib/index');

describe('spider', function () {


    var spider;
    var level;

    beforeEach(function functionName() {
        spider = new Spider();
        level = {
            pattern: /http:\/\/google.com/,
            action: function () {
            }
        }
    });

    it('should be ok', function () {
        (function () {
            var spider = new Spider();
        }).should.not.throw(Error);
    });


    describe('#start', function () {


        it('should return the instance of spider', function () {
            var returns = spider.start();
            returns.should.equal(spider);
        });


        it('should start a timer', function () {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            setInterval.restore();
        });


        it('should start a timer to fire every second', function () {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            var firstCall = setIntervalSpy.args[0];
            firstCall[1].should.equal(1000);
            setInterval.restore();
        });


        it('should start a timer', function () {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            setInterval.restore();
        });


        it('should start a timer with the crawl function', function () {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            setInterval.restore();
        });
    });

    describe('#addUrl', function () {


        it('should return a spider instance', function () {
            var returns = spider.addUrl();
            returns.should.equal(spider);
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


        it('should load the webpage if it has a url', function () {
            var webpageLoadSpy = sinon.spy(spider.webpage, 'load');
            spider.addUrl('http://google.com');
            spider.crawl();
            webpageLoadSpy.called.should.equal(true);
            spider.webpage.load.restore();
        });


        it('should load the webpage if it has not got a url', function () {
            var webpageLoadSpy = sinon.spy(spider.webpage, 'load');
            spider.crawl();
            webpageLoadSpy.called.should.equal(false);
            spider.webpage.load.restore();
        });
    });

    describe('#addErrorHandler', function() {


        it('should throw an error given a non existant handler', function() {
            var spider = new Spider();
            (function () {
                spider.addErrorHandler(null);
            }).should.throw(Error);
        });


        it('should throw an error given a non function handler', function() {
            var spider = new Spider();
            (function () {
                spider.addErrorHandler('I am a string');
            }).should.throw(Error);
        });


        it('should call all added handlers given a page error', function() {
            var spies = [sinon.spy(), sinon.spy(), sinon.spy()];
            var spider = new Spider();
            spies.forEach(spider.addErrorHandler, spider);
            spider.webpage.emit('error', {url: 'test'});
            spies.forEach(function(spy) {
                spy.called.should.equal(true);
            });
        });


        it('should return itself to allow chaining', function() {
            var spy = sinon.spy();
            var spider = new Spider();
            var isSpider = spider.addErrorHandler(spy);
            isSpider.should.equal(spider);
        });
    });


    describe('#stop', function () {


        it('should stop the unit when called', function () {
            var clock = sinon.useFakeTimers();
            var spider = new Spider();
            var crawlSpy = sinon.spy(spider, 'crawl');

            spider.start();
            spider.stop();

            clock.tick(2000);

            crawlSpy.called.should.equal(false);

            clock.restore();
        });


        it('should not throw an error when called on a non started unit.', function () {
            var spider = new Spider();
            (function () {
                spider.stop();
            }).should.not.throw(Error);
        });
    });
});
