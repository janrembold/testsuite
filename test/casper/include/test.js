module.exports = {
    sayHi: function() {
        console.log('Hello from module.exports');
    }
};

casper.sayHiAgain = function() {
    this.echo('Hello from casper function');
};