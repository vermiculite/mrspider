'use strict';
var Spider = require('../../lib/index');
var Level = require('../../lib/Level');

describe('spider', function() {


    var spider;
    var level;

    beforeEach(function functionName() {
        spider = new Spider();
        level = {
            pattern: /http:\/\/google.com/,
            action: function() {}
        }
    });

    it('should be ok', function() {
        (function() {
            var spider = new Spider();
        }).should.not.throw(Error);
    });


    describe('#start', function() {


        it('should return the instance of spider', function() {
            var returns = spider.start();
            returns.should.equal(spider);
        });


        it('should start a timer', function() {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            setInterval.restore();
        });


        it('should start a timer to fire every second', function() {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            var firstCall = setIntervalSpy.args[0];
            firstCall[1].should.equal(1000);
            setInterval.restore();
        });


        it('should start a timer', function() {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            setInterval.restore();
        });


        it('should start a timer with the crawl function', function() {
            var setIntervalSpy = sinon.spy(global, 'setInterval');
            spider.start();
            setIntervalSpy.called.should.equal(true);
            setInterval.restore();
        });
    });

    describe('#addUrl', function() {


        it('should return a spider instance', function() {
            var returns = spider.addUrl();
            returns.should.equal(spider);
        });


        it('should add a url to the urls array', function() {
            spider.addUrl('http://google.com');
            spider.urls.should.have.length(1);
        });


        //it('should not add the same url to the urls array twive', function() {
        //    spider.addUrl('http://google.com');
        //    spider.addUrl('http://google.com');
        //    spider.urls.should.have.length(1);
        //});
    });

    describe('#addLevel', function() {


        it('should return an instance of spider', function() {
            var returns = spider.addLevel(level);
            returns.should.equal(spider);
        });


        it('should add a level to the crawler', function() {
            spider.addLevel(level);
            spider.levels.should.be.an('array').with.length(1);
        });


        it('should add a level instance to the crawler', function() {
            spider.addLevel(level);
            spider.levels[0].should.be.an.instanceOf(Level);
        });


    });


    describe('#crawl', function() {


        it('should return an instance of spider', function() {
            var returns = spider.crawl()
            returns.should.equal(spider);
        });


        it('should pop a url from the urls', function() {
            //   var popSpy = sinon.spy(spider.urls, 'pop');
            //   spider.crawl();
            //   popSpy.called.should.equal(true);
            //   spider.urls.pop.restore();
        });
    });


    describe('#executeLevels', function() {


        it('should call all levels when webpage loads', function() {
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

    });

});