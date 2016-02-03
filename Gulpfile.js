var protractor = require("gulp-protractor").protractor,
    gulp = require('gulp');

gulp.task('webdriver_update', function (cb) {
    return require('gulp-protractor').webdriver_update(cb)
});

gulp.task('e2e', ['webdriver_update'], function (cb) {
    var protractor = require('gulp-protractor').protractor;

    gulp.src([
        './e2e/tests/*.spec.js'
    ]).pipe(protractor({
        configFile: './e2e/protractor.config.js'
    })).on('end', cb);
});

gulp.task('run-e2e', function (done) {
    var server = require("./app");

    var exec = require('child_process').exec;
    var child = exec('gulp e2e', function (err, stdErr, stdOut) {
        console.log(err);
        console.log(stdErr);
        console.log(stdOut);
        done();
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
});
