'use strict';


class UrlCollection {


    constructor() {
        this.items = [];
    }


    add(url) {
        if(url && !containsItem.call(this, url)){
            this.items.push({
                value: url,
                got: false
            });
        }
    }


    next() {
        var nextItem;
        this.items.some(function(item) {
            var getIt = !item.got;
            if(getIt) {
                item.got = true;
                nextItem = item.value;
            }
            return getIt;
        });
        return nextItem;
    }


    hasNext() {
        return this.items.some(function(item) {
            return !item.got;
        });
    }
}


function containsItem(find) {
    return this.items.some(function(item) {
        return item.value === find;
    });
}

module.exports = UrlCollection;