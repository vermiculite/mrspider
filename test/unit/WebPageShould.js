'use strict';
var WebPage = require('../../lib/WebPage');

describe('webPage', function () {

    var webpage;

    beforeEach(function() {
        webpage = new WebPage();
    });

    afterEach(function () {
        webpage.removeAllListeners();
    });

    describe('#setContent', function () {
        it('should set content property', function () {
            webpage.setContent('<h1>Hello</h1>');
            should.exist(webpage.content);
        });
    });

    describe('#load', function () {

        it('should load the supplied url and call setContent', function (done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');
            var setContentSpy = sinon.spy(webpage, 'setContent');
            webpage.load('http://myapp.iriscouch.com/users/1');
            webpage.on('load', function () {
                setContentSpy.called.should.equal(true);
                setContentSpy.restore();
                done();
            });
        });

        it('should load the supplied url erroneousl and not call setContent', function (done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, null);
            var setContentSpy = sinon.spy(webpage, 'setContent');
            webpage.load('http://myapp.iriscouch.com/users/1');
            webpage.on('error', function () {
                setContentSpy.called.should.equal(false);
                setContentSpy.restore();
                done();
            });
        });


        it('should load the supplied url', function (done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');
            webpage.load('http://myapp.iriscouch.com/users/1');
            webpage.on('load', function () {
                target.done();
                done();
            });
        });
    });

});
