var helpers = require('../helpers');
var scrollPos;

helpers.startCasper();

casper.test.begin('Check tabs scroll position', {

    test: function(test) {

        casper.waitForSelector('.tabs .active', function then() {
            var startScrollY = casper.evaluate(function() {
                return window.scrollY;
            });
            test.assert(startScrollY === 0, 'ScrollY starts at 0');
            scrollPos = casper.evaluate(function(tabsTop) {
                window.scrollTo(0, tabsTop);
                return window.scrollY;
            }, casper.getElementBounds('.tabs').top);
            casper.click('.tabs .active + a');
        });

        casper.waitForSelector('.tabs .active', function then() {
            var scrollY = casper.evaluate(function() {
                return window.scrollY;
            });
            test.assert(scrollY > 0, 'Check scroll is greater than 0');
            test.assertEquals(scrollY, scrollPos, "Check scroll hasn't changed");
            casper.back();
        });

        casper.waitForSelector('.tabs .active', function then() {
            var scrollY = casper.evaluate(function() {
                return window.scrollY;
            });
            test.assert(scrollY > 0, 'Check scroll is greater than 0');
            test.assertEquals(scrollY, scrollPos, "Check scroll hasn't changed");
        });

        casper.run(function() {
            test.done();
        });
    },
});
