var gulp = require('gulp');
var brfs = require('gulp-brfs');
var rename = require('gulp-rename');

gulp.task('dist', function(){
	return gulp.src('./selectCountry.brfs.js')
		.pipe(brfs())
		.pipe(rename('selectCountry.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', function () {
    gulp.watch(['./*.brfs.js', './*.tpl'], ['dist']);
});