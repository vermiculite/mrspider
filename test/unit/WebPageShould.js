'use strict';
var WebPage = require('../../lib/WebPage');

describe('webPage', function () {

    var webpage;

    beforeEach(function() {

        webpage = new WebPage('http://www.abc.com');
    });

    describe('#setContent', function () {
        it('should set content property', function () {
            webpage.setContent('<h1>Hello</h1>');
            should.exist(webpage.content);
        });
    });

});
