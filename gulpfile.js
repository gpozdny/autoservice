'use strict';

global.$ = {
    package: require('./package.json'),
    config: require('./gulp/config'),
    path: {
        task: require('./gulp/paths/tasks.js'),
        jsFoundation: require('./gulp/paths/js.foundation.js'),
        cssFoundation: require('./gulp/paths/css.foundation.js'),
        jsHammer: require('./gulp/paths/js.hammer.js'),
        jsCompare: require('./gulp/paths/js.compare.js'),
        cssCompare: require('./gulp/paths/css.compare.js'),
        app: require('./gulp/paths/app.js')
    },
    gulp: require('gulp'),
    del: require('del'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'pug',
        'js:foundation',
        'js:process',
        'js:hammer',
        'js:compare',
        'css:compare',
        'copy:image',
        'copy:fonts',
        'css:foundation',
        'sprite:svg',
        'sprite'

    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
