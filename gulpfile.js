// Include the necessary modules.

// Npm install dependencies -- > npm install gulp browser-sync gulp-sass gulp-postcss autoprefixer gulp-concat gulp-sourcemaps gulp-uglify


var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');
    postcss = require('gulp-postcss');
    autoprefixer = require('autoprefixer');
    concat = require('gulp-concat');
    sourcemaps = require('gulp-sourcemaps');
    uglify = require('gulp-uglify');


// Configure Browsersync.
gulp.task('browser-sync', function() {


    // Initial Browsersync
    browserSync.init({
        server: {
          baseDir: 'app'
        },
      })

    gulp.watch("app/sass/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);

});


// Configure Sass task to run when the specified .scss files change.
// Browsersync will also reload browsers.

gulp.task('sass', function() {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/slick-carousel/slick/slick-theme.css',
        'node_modules/aos/dist/aos.css',
        'app/sass/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' })
            .on('error', sass.logError)
        )
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false,
                grid: true
            })
        ]))
        .pipe(concat('./style.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());

});



gulp.task('js', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/aos/dist/aos.js',
        'app/js/theme/*.js'
    ])
    .pipe(concat('theme.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
 
});

// Create the default task that can be called using 'gulp'.
// The task will process sass, run browser-sync and start watching for changes.
gulp.task('default', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch("app/sass/*.scss", ['sass']);
    gulp.watch("app/js/**/*.js", ['js']);
    
})