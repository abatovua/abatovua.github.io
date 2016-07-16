var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
 
var autoprefixer = require('autoprefixer');
 
gulp.task('scss', function () {
    var processors = [
        autoprefixer
    ];
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['scss']);
});