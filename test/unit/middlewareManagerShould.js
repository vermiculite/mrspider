"use strict";
var middlewareManager = require('../../lib/middlewareManager')();

describe('middlewareManager', function() {

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
        var first = 'first';
        var second = 'second';
        var spy = sinon.spy();
        middlewareManager.use(spy);
        middlewareManager.execute(first, second);
        spy.calledOnce.should.equal(true);
        spy.firstCall.args[0].should.equal(first);
        spy.firstCall.args[1].should.equal(second);
    });
});