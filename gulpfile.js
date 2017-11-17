var gulp = require('gulp');

const paths = {
    js : 'src/main/resources/static/js/**/*.js',
    css : 'src/main/resources/static/css/**/*.css',
    html : 'src/main/resources/static/**/*.html',
    targetJs : 'target/classes/static/js',
    targetCss : 'target/classes/static/css',
    targetHtml : 'target/classes/static/',
};

gulp.task('watch', function(){
    gulp.watch(paths.js, ['devJs']);
    gulp.watch(paths.css, ['devCss']);
    gulp.watch(paths.html, ['devHtml']);
});

gulp.task('devJs', function() {
    return gulp.src(paths.js).pipe(gulp.dest(paths.targetJs));
});

gulp.task('devCss', function() {
    return gulp.src(paths.css).pipe(gulp.dest(paths.targetCss));
});

gulp.task('devHtml', function() {
    return gulp.src(paths.html).pipe(gulp.dest(paths.targetHtml));
});