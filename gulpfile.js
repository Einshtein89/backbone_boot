var gulp = require('gulp');

const paths = {
    js : 'src/main/resources/static/js/**/*.js',
    css : 'src/main/resources/static/css/**/*.css',
    targetJs : 'target/classes/static/js',
    targetCss : 'target/classes/static/css',
};

gulp.task('watch', function(){
    gulp.watch(paths.js, ['devJs']);
    gulp.watch(paths.css, ['devCss']);
});

gulp.task('devJs', function() {
    return gulp.src(paths.js).pipe(gulp.dest(paths.targetJs));
});

gulp.task('devCss', function() {
    return gulp.src(paths.css).pipe(gulp.dest(paths.targetCss));
});