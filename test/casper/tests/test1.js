var includeTest = require('../include/test');

casper.test.begin('testing.html contains stuff', 3, function (test) {

    casper.start('./test/pages/test1.html', function () {
        test.assertTitle('Test Page');
        test.assertSelectorHasText('h1', 'Test!');
    });

    casper.then(function () {
        this.click('button');
        test.assertSelectorHasText('h1', 'New title');

        includeTest.sayHi();
        casper.sayHiAgain();
    });

    casper.run(function() {
        test.done();
    });

});