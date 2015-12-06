var async = require('async');
async.series([function (cb) {
    cb()
}, function (cb) {
    cb()
}, function (cb) {
    cb()
}], function () {
    console.log('called back!!!')
});
