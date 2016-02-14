var spawn = require('child_process').spawn;
var gulp = require('gulp');
var gutil = require('gulp-util');
var nunjucksRender = require('gulp-nunjucks-render');


gulp.task('test', ['nunjucks'], function () {

    var tests = ['test/casper/tests/'];
    var casperChild = spawn('casperjs', ['test'].concat(tests));

    casperChild.stdout.on('data', function (data) {
        gutil.log('CasperJS:', data.toString().slice(0, -1)); // Remove \n
    });

    casperChild.on('close', function (code) {
        var success = code === 0; // Will be 1 in the event of failure

        // Do something with success here
        if (!success) {
            process.exit(1);
        }
    });

});

gulp.task('nunjucks', function() {

    // Gets .html and .nunjucks files in pages
    return gulp.src('test/nunjucks/*.nunjucks')
        .pipe(nunjucksRender({
            path: ['test/nunjucks/partials/', 'test/nunjucks/layouts/']
        }))
        .pipe(gulp.dest('test/pages/'))

});