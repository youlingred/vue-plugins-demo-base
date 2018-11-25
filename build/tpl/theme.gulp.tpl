'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var cssType='scss'

gulp.task('compile', function() {
  return gulp.src(`./src/*.${cssType}`)
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist'));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('build', ['compile', 'copyfont']);
