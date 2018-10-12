// load gulp
var gulp = require('gulp');

// load plugins
var rename          = require('gulp-rename'),
    plumber         = require('gulp-plumber'),
    gutil           = require('gulp-util'),
    connect         = require('gulp-connect'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    ngAnnotate      = require('gulp-ng-annotate'),
    fs              = require('fs-extra');

var onError = function(err) {
    gutil.beep();
    gutil.log(gutil.colors.red(err));
};

// Create local server - create middleware URL for static assets
gulp.task('connect', function () {

    connect.server({
        root: './src',
        port: 8001,
        livereload: true
    });

    // watch .js files
    gulp.watch(['src/js/**/*.js', 'js']);
});

// js task
gulp.task('js', function() {
    return gulp.src([
        'src/js/angular-google-map.js'
    ])
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(concat('angular-google-map.min.js'))
    .pipe(ngAnnotate({ add: true }))
    .pipe(uglify({ mangle: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// default task
gulp.task('default', ['connect']);

// deploy task
gulp.task('deploy', ['js']);
