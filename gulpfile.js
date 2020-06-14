const gulp = require('gulp');

//Copy all HTML FILES
gulp.task('copyHTML', function() {
    gulp.src('src/*.html').pipe(gulp.dest('dist'))
})

gulp.task('copyStyle', function(){
    gulp.src('./style.css').pipe(gulp.dest('dist'))
})

gulp.task('copyScript', function() {
    gulp.src('src/script.js').pipe(gulp.dest('dist'))
})