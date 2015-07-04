'use strict';


class UrlCollection {


    constructor() {
        this.items = [];
    }

    add(url) {
        this.items.push({
            value: url,
            got: false
        });
    }


    next() {}


    hasNext() {

        return this.items.some(function(item) {
            return !item.got;
        });
    }
}


module.exports = UrlCollection;