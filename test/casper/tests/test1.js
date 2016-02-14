// include external scripts
var includeTest = require('../include/test');

// set options first
casper.options.viewportSize = { width: 1000, height: 600 };

// start testing
casper.test.begin('Testing tests',function (test) {

    casper.start('./test/pages/test1.html', function () {

        // simple wait
        casper.waitForSelector('h1');

        // call jQuery directly inside page
        this.echo(this.evaluate(function() {
            return $('h1:first').text();
        }));

        // test values from page context
        test.assertEval(function() {
            return $('h1:first').length > 0;
        }, 'H1 exists');

        test.assertEvalEquals(function() {
            return $('h1:first').text();
        }, 'Test!', 'H1 has text "Test!"');

        // simple assertions
        test.assertTitle('Test Page');
        test.assertVisible('h1');
        test.assertSelectorHasText('h1', 'Test!');

    });

    casper.then(function () {

        // click something
        this.click('button');

        // re-check
        test.assertSelectorHasText('h1', 'New title');

    });

    casper.then(function () {

        // includes from required script
        includeTest.sayHi();
        casper.sayHiAgain();

    });

    casper.run(function() {
        test.done();
    });

});