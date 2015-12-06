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

    });

    describe('#addErrorHandler', function() {

        it('should throw an error given a non existant handler', function() {
            var spider = Spider();
            (function () {
                spider.addErrorHandler(null);
            }).should.throw(Error);
        });

        it('should throw an error given a non function handler', function() {
            var spider = Spider();
            (function () {
                spider.addErrorHandler('I am a string');
            }).should.throw(Error);
        });

    });
});
