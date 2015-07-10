'use strict';


var UrlCollection = require('../../lib/UrlCollection');



describe('UrlCollection', function() {


    var urlCollection;


    beforeEach(function() {
        urlCollection = new UrlCollection();
    });


    describe('#hasNext', function () {


        it('should return false for a newly initialised instance', function () {
            urlCollection.hasNext().should.equal(false);
        });


        it('should return true after adding to the collection', function () {
            urlCollection.add('http://google.com');
            urlCollection.hasNext().should.equal(true);
        });
    });


    describe('#add', function () {


        it('should add a urll to the collection', function () {
            urlCollection.add('http://google.com');
            urlCollection.hasNext().should.equal(true);
        });


        it('should only add the url once', function () {
            urlCollection.add('http://google.com');
            urlCollection.hasNext().should.equal(true);
            urlCollection.next();
            urlCollection.hasNext().should.equal(false);
        });


        it('should not add undefined or null or the empty string', function () {
            urlCollection.add(undefined);
            urlCollection.hasNext().should.equal(false);
            urlCollection.add(null);
            urlCollection.hasNext().should.equal(false);
            urlCollection.add('')
            urlCollection.hasNext().should.equal(false);
        });
    });


    describe('#next', function () {


        it('should return undefined if it has no more', function () {
            var next = urlCollection.next();
            should.not.exist(next);
        });


        it('should return undefined if it has no more after exhausting all', function () {
            urlCollection.add('http://yahoo.es');
            var next = urlCollection.next();
            next = urlCollection.next();
            should.not.exist(next);
        });


        it('should return the url added', function() {
            urlCollection.add('http://yahoo.es');
            var got = urlCollection.next();
            got.should.equal('http://yahoo.es');
        });
    });
});