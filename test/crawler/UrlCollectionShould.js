'use strict';


var UrlCollection = require('../../lib/UrlCollection');



describe('UrlCollection', function() {


    describe('#hasNext', function () {


        it('should return false for a newly initialised instance', function () {
            var urlCollection = new UrlCollection();
            urlCollection.hasNext().should.equal(false);
        });


        it('should return true after adding to the collection', function () {
            var urlCollection = new UrlCollection();
            urlCollection.add('http://google.com');
            urlCollection.hasNext().should.equal(true);
        });
    });


    describe('#add', function () {


        it('should add a urll to the collection', function () {
            var urlCollection = new UrlCollection();
            urlCollection.add('http://google.com');
            urlCollection.hasNext().should.equal(true);
        });


        it('should return true after adding to the collection', function () {
            var urlCollection = new UrlCollection();
            urlCollection.add('http://google.com');
            urlCollection.hasNext().should.equal(true);
        });
    });
});