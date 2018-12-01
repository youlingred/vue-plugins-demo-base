'use strict';

const gulp = require('gulp');
const path = require('path');
const name = require('./package').name.split('-').pop();
const sass = require('gulp-sass');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const distPath = path.resolve(__dirname, `../../dist/themes/${name}`);
const globalConfig = require('../../build/config/global');
console.log(globalConfig)
const cssType = globalConfig.cssType;
//note 根据cssType判断cssGulp使用何种解析器
function cssGulp(){
  if(cssType==='less'){
    return less
  }else if(cssTyp==='sass'){
    return sass.sync
  }
}
gulp.task('compile', function () {
  return gulp.src(`./src/*.${cssType}`)
    .pipe(cssGulp()())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest(distPath));
});
gulp.task('copyimage', function() {
  return gulp.src('./src/images/**')
    .pipe(gulp.dest(`${distPath}/images`));
});
gulp.task('copyfont', function () {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest(`${distPath}/fonts`));
});
gulp.task('build', ['compile','copyimage','copyfont']);

