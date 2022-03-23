// npm install gulp sass gulp-csso gulp-concat gulp-sourcemaps browser-sync

const { src, dest, watch } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function css() {
  return src('sass/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(sourcemaps.write())
  .pipe(dest('./'))
  .pipe(browserSync.stream());
}

function js() {
  return src('./js/theme/*.js')
  .pipe(concat('theme.js'))   
  .pipe(uglify())                  
  .pipe(gulp.dest('js'))
  .pipe(browserSync.stream());
}

function browser() {
  browserSync.init({
      proxy: 'https://jllfoundation-local.jll.com',
      files: [
          './**/*.php',
          './js/theme/*.js'
      ]
  });

  watch('sass/**/*.scss', css);
  watch('./js/theme/*.js', js);
}

exports.css = css;
exports.js = js;
exports.default = browser;
