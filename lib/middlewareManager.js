'use strict';

var async = require('async');

function Middleware() {
    this.middlewares = [];
}

Middleware.prototype.use = function(fn) {
    if(typeof fn !== 'function') {
        throw new Error('MiddlewareManager can only use functions');
    }
    this.middlewares.push(fn);
};

Middleware.prototype.execute = function execute (page, spider, callback) {
    async.series(this.middlewares.map(function(fn) {
        return function(cb) {
            fn(page, spider, cb);
        }
    }), callback);
};


module.exports = function(options) {
    return new Middleware(options || {});
};
