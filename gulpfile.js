var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('css', function () {
    var processors = [
        cssnano(),
    ];
    return gulp.src('./sass/**/*.+(sass|scss)')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function (cb) {
    pump([
            gulp.src('./scripts/**/*.js'),
            uglify(),
            gulp.dest('./js/')
        ],
        cb
    )
    .pipe(browserSync.stream());
});

gulp.task('default', ['css', 'js'], function(){
    browserSync.init({
        server: './'
    });

    gulp.watch('./**/*.+(sass|scss)', ['css']);
    gulp.watch('./scripts/**/*.js', ['js']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});
