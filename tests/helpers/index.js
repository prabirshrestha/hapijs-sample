process.env.NODE_ENV = 'test';

var wd = GLOBAL.wd = require('wd');

var chai           = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
GLOBAL.expect = chai.expect;
GLOBAL.should = chai.should();

GLOBAL.getBrowser = function (done) {
    var browser = wd.promiseChainRemote();
    browser.init({ browserName: 'chrome' }).nodeify(done);
    return browser;
};

GLOBAL.getAbsoluteUrl = function (path) {
    if (path && path.indexOf('/') === 0) {
        path = path.substr(1);
    }
    return 'http://localhost:3000/';
};

GLOBAL.supertest = require('supertest');

/*
wd.addAsyncMethod('methodName', function (arg1, arg2) {
    var done    = wd.findCallback(arguments),
        browser = this;
    doSomething(browser, arg1, arg2, done);
});
*/

