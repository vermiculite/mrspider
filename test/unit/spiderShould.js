'use strict';
var Spider = require('../../lib/index');
var Level = require('../../lib/Level');

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

    describe('#addLevel', function () {


        it('should return an instance of spider', function () {
            var returns = spider.addLevel(level);
            returns.should.equal(spider);
        });


        it('should add a level to the unit', function () {
            spider.addLevel(level);
            spider.levels.should.be.an('array').with.length(1);
        });


        it('should add a level instance to the unit', function () {
            spider.addLevel(level);
            spider.levels[0].should.be.an.instanceOf(Level);
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


    describe('#executeLevels', function () {


        it('should call all levels when webpage loads given a matching pattern', function () {
            var actionSpy = sinon.spy();
            var level = new Level({
                pattern: /http/,
                action: actionSpy
            });
            var spider = new Spider();
            spider.addLevel(level)
                .executeLevels({
                    url: 'http://google.com'
                });
            actionSpy.called.should.equal(true);
        });


        it('should not call any levels when webpage loads given a nonmatching pattern', function () {
            var actionSpy = sinon.spy();
            var level = new Level({
                pattern: /http:\/\/yahoo.com/,
                action: actionSpy
            });
            var spider = new Spider();
            spider.addLevel(level)
                .executeLevels({
                    url: 'http://google.com'
                });
            actionSpy.called.should.equal(false);
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


        it('should be called automatically when there is no more to be crawled', function (done) {
            this.timeout(4000);
            var spider = new Spider();
            var stopSpy = sinon.spy(spider, 'stop');
            var abc = nock('http://abc.com')
                .get('/')
                .reply(200, 'okidoke');
            var def = nock('http://def.com')
                .get('/')
                .reply(200, 'okidokey');
            var ghi = nock('http://ghi.com')
                .get('/')
                .reply(200, 'okicoke');

            spider
                .addUrl('http://abc.com/')
                .addLevel({
                    pattern: /abc.com/,
                    action: function () {
                        console.log('abc');
                        spider.addUrl('http://def.com');
                    }
                })
                .addLevel({
                    pattern: /def.com/,
                    action: function () {
                        console.log('def');
                        spider.addUrl('http://ghi.com');
                    }
                }).start();

            spider.webpage.on('load', function (webpage) {
                console.log('Loaded a page... %s', webpage.url);
                if (webpage.url === 'http://ghi.com') {
                    abc.done();
                    def.done();
                    ghi.done();
                    stopSpy.called.should.equal(true);
                    done();
                }
            });
        });



        it('should not be called when request are outstanding', function (done) {
            this.timeout(10000);
            var spider = new Spider();
            var stopSpy = sinon.spy(spider, 'stop');
            var aaa = nock('http://aaa.com')
                .get('/')
                .reply(200, 'okidoke');
            var abc = nock('http://abc.com')
                .get('/')
                .delay(2000)
                .reply(200, 'okidoke');
            var def = nock('http://def.com')
                .get('/')
                .reply(200, 'okidokey');
            var ghi = nock('http://ghi.com')
                .get('/')
                .reply(200, 'okicoke');

            spider
                .addUrl('http://aaa.com')
                .addUrl('http://abc.com/')
                .addLevel({
                    pattern: /abc.com/,
                    action: function () {
                        console.log('abc');
                        spider.addUrl('http://def.com');
                    }
                })
                .addLevel({
                    pattern: /def.com/,
                    action: function () {
                        console.log('def');
                        spider.addUrl('http://ghi.com');
                    }
                }).start();

            spider.webpage.on('load', function (webpage) {
                console.log('Loaded a page... %s', webpage.url);
                if (webpage.url === 'http://ghi.com') {
                    aaa.done();
                    abc.done();
                    def.done();
                    ghi.done();
                    stopSpy.called.should.equal(true);
                    done();
                }
            });
        });
    });
});
