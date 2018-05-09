
var Spider = require('../..').Spider;

describe('spider', function () {

    var spider;
    var validConfig;

    beforeEach(function() {
        validConfig = {};
        spider = Spider(validConfig);
    });


    describe('#addUrl', function() {

        it('should be retrieved from stream', function() {
            spider.addUrl('http://abc.com');
            spider.urls.length.should.equal(1)
        });


        it('should retrieve all from the stream if #addUrl called many times...', function() {
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
            spider.urls.length.should.equal(10)
        });

        

        it('should get the full url using base url and relative url', function() {
            var spider = new Spider();

            spider.addUrl('/con', 'http://abc.com/');
            const urls = spider.urls.map(url => url.href)
            urls.should.contain('http://abc.com/con')
        });

    })
});
