var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return sass('src/css/**/*.scss',{sourcemap:true})
        .on('error', sass.logError)
        // For inline sourcemaps
        .pipe(sourcemaps.write())

        // For file sourcemaps
        .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest('src/final'));
});

gulp.task('watch', function () {
    gulp.watch('src/css/**/*css', ['sass']);
});