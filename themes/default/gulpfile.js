'use strict';

const gulp = require('gulp');
const path = require('path');
const name =require('./package').name.split('-').pop();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const distPath = path.resolve(__dirname,`../../dist/themes/${name}`);

gulp.task('compile', function() {
  return gulp.src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest(distPath));
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest(`${distPath}/fonts`));
});

gulp.task('build', ['compile', 'copyfont']);

