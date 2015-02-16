/* 
 * Iconfont Task
 *
 * @url:        http://fallwater.ca/
 * @author:     Jeff Waterfall
 * @dependencies:
 *      - https://github.com/gulpjs/gulp
 *      - https://github.com/jackfranklin/gulp-load-plugins
 *
 * Copyright 2015 Jeff Waterfall
 */

// Required Plugins
var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')(); // https://github.com/jackfranklin/gulp-load-plugins

// Define default paths
var paths = {
    tasks     : './tasks/',
    static    : 'static/',
    images    : 'static/images/',
    css       : 'static/css/',
    scss      : 'static/scss/',
    js        : 'static/js/',
    fonts     : 'static/fonts/',
    templates : 'static/templates/'
};


/*
 * Iconfont
 *
 ********************************************************
 */

// Settings / Options
paths.icons = {
    src       : paths.images + 'icons/svgs/*.svg',
    watch     : paths.images + 'icons/svgs/*.svg',
    cssurl    : '../fonts/'
}

// Require Task
var iconfont = require( paths.tasks + 'gulp.iconfont' )( gulp, plugins, paths );
//console.log('iconfont watch task:');
//console.log(iconfont);


/*
 * SCSS
 *
 ********************************************************
 */

// goes here




/*
 * Watch
 *
 ********************************************************
 */

gulp.task('watch', function() {
    // watch Icons
    iconfont;
    //watchIcons;

    //livereload.listen();
});

// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
