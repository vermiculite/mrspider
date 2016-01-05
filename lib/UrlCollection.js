'use strict';


function UrlCollection() {
    this.items = [];
}


UrlCollection.prototype.add = function (url) {
    if (url && !containsItem.call(this, url)) {
        this.items.push({
            value: url,
            got: false
        });
    }
};


UrlCollection.prototype.next = function () {
    var nextItem = null;
    this.items.some(function (item) {
        var getIt = !item.got;
        if (getIt) {
            item.got = true;
            nextItem = item.value;
        }
        return getIt;
    });
    return nextItem;
};

UrlCollection.prototype.hasNext = function () {
    return this.items.some(function (item) {
        return !item.got;
    });
};


function containsItem(find) {
    return this.items.some(function (item) {
        return item.value === find;
    });
}

module.exports = UrlCollection;
