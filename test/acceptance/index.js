var spider = require('../../lib/index')();

describe('Spider', function() {
    it('should work', function() {
        var spy = sinon.spy();
        spider.use(spy);
        spider.addUrl('http://wwww.abc.com');
        spider.start();
        setImmediate(function() {
            spy.calledOnce.should.equal(true);
            var firstArgs = spy.firstCall.args;
            firstArgs[0].url.should.equal('http://www.abc.com');
            firstArgs[1].url.should.equal(spider);
        });
    });
});