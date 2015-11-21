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


        it('should set dom property as jquery like', function () {
            webpage.setContent('<h1>Hello</h1>');
            var result = webpage.$()('h1').text();
            result.should.equal('Hello');

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


        it('should load the supplied url setting the dom property', function (done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');


            webpage.load('http://myapp.iriscouch.com/users/1');

            webpage.on('load', function (webpage) {
                should.exist(webpage.$());
                webpage.$()('h1').text().should.equal('reply');
                target.done();
                done();
            });

        });

        it('should load the supplied url setting the url property', function (done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');


            webpage.load('http://myapp.iriscouch.com/users/1');

            webpage.on('load', function (webpage) {
                webpage.url.should.equal('http://myapp.iriscouch.com/users/1');
                should.exist(webpage.$());
                done();
            });

        });


    });

    describe('#raw', function() {


        it('should return the raw page as a string given a page with content', function() {
            var content = '<html><head><title></title></head><body></body></html>';
            webpage.setContent(content);
            var raw = webpage.raw();
            raw.should.equal(content);
        });
    });
});
