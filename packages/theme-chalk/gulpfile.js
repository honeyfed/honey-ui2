'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compileTD() {
  return src('./src/tdesign/*.less')
    .pipe(
      less({
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['ie > 9', 'last 2 versions'],
            cascade: false
          })
        ]
      })
    )
    .pipe(cssmin())
    .pipe(dest('./lib/tdesign'));
}

function compile() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}

exports.build = series(compileTD, compile, copyfont);
