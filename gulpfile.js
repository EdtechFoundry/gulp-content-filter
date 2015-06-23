var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');

var catchAll = ['./lib/*.js', './test/*.js'];

function vet(filename) {
    var src = filename ? filename : catchAll;
    return gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
}

gulp.task('vet', function () {
    vet();
});

gulp.task('watch', function () {
    gulp.start(['vet', 'test']);

    gulp.watch(catchAll, function (evt) {
        vet(evt.path);
        gulp.start('test');
    });
});

gulp.task('test', function () {
    return gulp.src(catchAll[1])
        .pipe(mocha());
});