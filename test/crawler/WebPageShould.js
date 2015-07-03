'use strict';
var WebPage = require('../../lib/WebPage');

describe('WebPage', function() {


    describe('#setContent', function() {


        it('should set dom property', function() {
            var webpage = new WebPage();
            webpage.setContent('<h1>Hello</h1>');
            should.exist(webpage.dom);
        });


        it('should set dom property as jquery like', function() {
            var webpage = new WebPage();
            webpage.setContent('<h1>Hello</h1>');
            var result = webpage.dom('h1').text();
            result.should.equal('Hello');

        });
    });


    describe('#load', function() {


        it('should load the supplied url and call setContent', function(done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');
            var webpage = new WebPage();
            var setContentSpy = sinon.spy(webpage, 'setContent');


            webpage.load('http://myapp.iriscouch.com/users/1');

            webpage.on('load', function() {
                setContentSpy.called.should.equal(true);
                done();
            });

        });


        it('should load the supplied url', function(done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');
            var webpage = new WebPage();


            webpage.load('http://myapp.iriscouch.com/users/1');

            webpage.on('load', function() {
                target.done();
                done();
            });

        });


        it('should load the supplied url setting the dom property', function(done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');
            var webpage = new WebPage();


            webpage.load('http://myapp.iriscouch.com/users/1');

            webpage.on('load', function(webpage) {
                should.exist(webpage.dom);
                webpage.dom('h1').text().should.equal('reply');
                target.done();
                done();
            });

        });
        
        it('should load the supplied url setting the url property', function(done) {
            var target = nock('http://myapp.iriscouch.com')
                .get('/users/1')
                .reply(200, '<h1>reply</h1>');
            var webpage = new WebPage();


            webpage.load('http://myapp.iriscouch.com/users/1');

            webpage.on('load', function(webpage) {
                webpage.url.should.equal('http://myapp.iriscouch.com/users/1');
                should.exist(webpage.dom);
                done();
            });

        });
        

    });
});