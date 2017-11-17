var gulp = require('gulp');

const paths = {
    src : 'src/main/resources/static/**/*.*',
    target : 'target/classes/static/',
};

gulp.task('watch', function(){
    gulp.watch(paths.src, ['dev']);
});

gulp.task('dev', function() {
    return gulp.src(paths.src).pipe(gulp.dest(paths.target));
});