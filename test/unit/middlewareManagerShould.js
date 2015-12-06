"use strict";
var MiddlewareManager = require('../../lib/middlewareManager');

describe('middlewareManager', function() {

    var middlewareManager;

    beforeEach(function() {
        middlewareManager = MiddlewareManager();
    });

    describe('#use', function() {

        it('should not throw an error when called with a function', function() {
            (function() {
                middlewareManager.use(function() {});
            }).should.not.throw(Error);
        });

        it('should throw an error if not passed anything', function() {
            (function() {
                middlewareManager.use();
            }).should.throw(Error);
        });

        it('should throw an error given a non function', function() {
            (function() {
                middlewareManager.use('I am not a function');
            }).should.throw(Error);
        });
    });

    describe('#execute', function() {

        it('should call the function in the middleware with the correct arguments.', function() {
            var first = 'first';
            var second = 'second';
            var spy = sinon.spy();
            middlewareManager.use(spy);
            middlewareManager.execute(first, second);
            setImmediate(function() {
                spy.calledOnce.should.equal(true);
                spy.firstCall.args[0].should.equal(first);
                spy.firstCall.args[1].should.equal(second);
            });

        });

        it('should call the callback after executing all middleware.', function(done) {
            var first = 'first';
            var second = 'second';
            middlewareManager.use(function(page, spider, next) {
                next();
            });
            middlewareManager.execute(first, second, done);
        });
    });
});
