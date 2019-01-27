var gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;


gulp.task('watcher', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/sass/main.scss', gulp.series('css'));
    //gulp.watch(paths.script, ['scripts']);
    gulp.watch('index.html', gulp.series('html'));
});


gulp.task('css', function () {
    return gulp.src('src/sass/main.scss')
        .pipe(sass({
            // includePaths: require('node-normalize-scss').with('other/path', 'another/path')
            // - or -
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%'], { cascade: false }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));
});


gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(browserSync.reload({stream:true}));
});



gulp.task('default', gulp.series(
    gulp.parallel( 'watcher')
));