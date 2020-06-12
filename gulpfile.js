const gulp = require('gulp');

//gulpfile.task
//gulpfile.src
//gulpfile.dens
//gulpfile.watch

//Copy all HTML FILES
gulp.task('copyHTML', function() {
    gulp.src('src/*.html').pipe(gulp.dest('dist'))
})