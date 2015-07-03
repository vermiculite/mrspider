'use strict';

class Level {
    
    
    constructor(options) {
        verifyOptions(options);
        this.pattern = options.pattern;
        this.action = options.action;
    }
    
    
    execute(webpage) {
        if(webpage && this.pattern.test(webpage.url)) {
            this.action(webpage);
        }
    }
}

function verifyOptions(options) {
        if(!options) {
            throw new Error('a Level requires a configuration object.');    
        }
        if(!options.pattern) {
            throw new Error('a level requires a pattern to initialise.');
        }
        if(!(options.pattern instanceof(RegExp))) {
            throw new Error('Level requires the pattern to be a regex');
        }
        if(!options.action) {
            throw new Error('A level requires an action.');
        }
        if(typeof options.action !== 'function') {
            throw new Error('for a level the passed action needs to be function.');
        }
}

module.exports = Level;
