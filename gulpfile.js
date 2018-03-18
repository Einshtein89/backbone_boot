let gulp = require('gulp');

const paths = {
    srcStatic : 'src/main/resources/static/**/*.*',
    targetStatic : 'target/classes/static/',
    srcTemplates : 'src/main/resources/templates/**/*.*',
    targetTemplates : 'target/classes/templates/',
};

gulp.task('watch', function(){
    gulp.watch(paths.srcStatic, ['static']);
    gulp.watch(paths.srcTemplates, ['templates']);
});

gulp.task('static', function() {
        gulp.src(paths.srcStatic).pipe(gulp.dest(paths.targetStatic));
});

gulp.task('templates', function() {
    gulp.src(paths.srcTemplates).pipe(gulp.dest(paths.targetTemplates));
});