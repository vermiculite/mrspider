'use strict';

function WebPage(url) {
    this.url = url;
    this.data = {url: url};
}

WebPage.prototype.setContent = function (htmlString) {
    var self = this;
    self.content = htmlString;
};

module.exports = WebPage;
