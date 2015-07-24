var Level = require('../../lib/Level');


describe('Level', function () {
    
    var config;
    
    beforeEach(function () {
        config = {
            pattern: /http:\/\/google.com/,
            action: function() {}
        }; 
    });
    
    it('should throw an error if called without configration', function () {
        (function () {
            var level = new Level();
        }).should.throw(Error)
    });
    
    
    it('should throw an error if not given a pattern in configuration object', function () {
        delete config.pattern;
        (function () {
            var level = new Level(config);
        }).should.throw(Error);
    });
        
    
    it('should throw an error if given a pattern regex in the configuration object', function () {
        config.pattern = 'Not a regex'          ;
        (function () {
            var level = new Level(config);
        }).should.throw(Error);
    });
    
    
    it('should throw an error if not passed an action to perform', function () {
        delete config.action;
        (function () {
            var level = new Level(config);
        }).should.throw(Error);
    });


    it('should throw an error if not passed an action to perform', function () {
        config.action = 'not a function';
        (function () {
            var level = new Level(config);
        }).should.throw(Error);
    });
    
    describe('#execute', function () {
       
       
       it('should execute the action given a url that matches the pattern', function () {
           config.action = sinon.spy();
           var level = new Level(config)
           level.execute({url: 'http://google.com'});
           config.action.called.should.equal(true);
       });
       
       
       it('should execute the action with the webpage given a url that matches the pattern', function () {
           config.action = sinon.spy();
           var level = new Level(config);
           var webapge = {url: 'http://google.com'}
           level.execute(webapge);
           config.action.called.should.equal(true);
           config.action.calledWith(webapge).should.equal(true)
       });
       
       it('should not execute the action given a url that does not match the pattern', function () {
           config.action = sinon.spy();
           var level = new Level(config)
           level.execute({url: 'http://yahoo.com'});
           config.action.called.should.equal(false);
       }) 
    });
});