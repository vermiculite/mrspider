'use strict';

function Middleware() {
    this.middlewares = [];
}

Middleware.prototype.use = function(fn) {
    this.middlewares.push(fn);
};


Middleware.prototype.execute = function execute (page) {
    async.series(this.middlewares.map(function(fn) {
        return function(next) {
            fn(page, next)
        }
    }));
};


module.exports = function(options) {
    return new Middleware(options || {});
};