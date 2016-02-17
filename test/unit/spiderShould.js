'use strict';
var Spider = require('../../lib/index');

describe('spider', function () {

    var spider;
    var validConfig;

    beforeEach(function() {
        validConfig = {};
        spider = Spider(validConfig);
    });


    describe('#addUrl', function() {

        this.timeout(20000);

        it('should be retrieved from stream', function(done) {
            spider.addUrl('http://abc.com');
            var stream = spider.crawl();
            var datas = [];
            stream.on('data', function(data) {
                datas.push(data);
            });
            stream.on('end', function() {
                datas.length.should.equal(1);
                var data = datas[0];
                data.url.should.equal('http://abc.com');
                done();
            })
        });


        it('should retrieve all from the stream if #addUrl called many times...', function(done) {
            spider.addUrl('http://abc1.com');
            spider.addUrl('http://abc2.com');
            spider.addUrl('http://abc3.com');
            spider.addUrl('http://abc4.com');
            spider.addUrl('http://abc5.com');
            spider.addUrl('http://abc6.com');
            spider.addUrl('http://abc7.com');
            spider.addUrl('http://abc8.com');
            spider.addUrl('http://abc9.com');
            spider.addUrl('http://abc10.com');

            var datas = [];

            var stream = spider.crawl();

            stream.on('data', function(data) {
                datas = [...datas, data];
            });

            stream.on('end', function() {
                datas.length.should.equal(10);
                datas[0].url.should.equal('http://abc1.com');
                datas[9].url.should.equal('http://abc10.com');
                done();
            });
        });

        it('should process all urls even those added during processing', function(done) {
            spider.addUrl('http://abc.com/1');
            var extraUrl = 'http://abc.com/2';
            var urls = [];

            var stream = spider.crawl();

            stream.on('data', function(data) {
                if(extraUrl) {
                    data.spider.addUrl(extraUrl);
                    extraUrl = false;
                }
                urls = [...urls, data.url];
            });

            stream.on('end', function() {
                console.log(urls);
                urls.length.should.equal(2);
                done();
            });
        });
    })
});
