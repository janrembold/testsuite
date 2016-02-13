casper.test.begin('testing.html contains stuff', 3, function (test) {

    casper.start('./test/test1.html', function () {
        test.assertTitle('Test Page');
        test.assertSelectorHasText('h1', 'Test!');
    });

    casper.then(function () {
        this.click('button');
        test.assertSelectorHasText('h1', 'New title');
    });

    casper.run(function() {
        test.done();
    });

});