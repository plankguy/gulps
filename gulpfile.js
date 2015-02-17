/* 
 * Iconfont Task
 *
 * @url:        http://fallwater.ca/
 * @author:     Jeff Waterfall
 * @dependencies:
 *      - https://github.com/gulpjs/gulp
 *      - https://lodash.com/
 *      - https://github.com/jackfranklin/gulp-load-plugins
 *
 * Copyright 2015 Jeff Waterfall
 */

// Required Plugins
var gulp        = require('gulp'),
    _           = require('lodash'),
    plugins     = require('gulp-load-plugins')();

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
var iconsSettings = {
    template    : paths.templates + '_iconfont.scss',
    paths : {
        src       : paths.images + 'icons/svgs/*.svg',
        watch     : paths.images + 'icons/svgs/*.svg',
        cssurl    : '../fonts/'
    }
};
//iconsSettings.paths = _.assign(iconsSettings.paths, paths);

// Require Task
var iconfont = require( paths.tasks + 'gulp.iconfont' )( gulp, _, plugins, paths, iconsSettings );
//console.log('iconfont watch task:');
//console.log(iconfont);


/*
 * Sass
 *
 ********************************************************
 */

// Settings / Options
var sassSettings = {
    outputStyle : 'nested',
//    paths       : {}
};
//sassSettings.paths = _.assign(sassSettings.paths, paths);

// Require Task
var sass = require( paths.tasks + 'gulp.sass' )( gulp, _, plugins, paths, sassSettings );
//console.log('iconfont watch task:');
//console.log(iconfont);




/*
 * Watch
 *
 ********************************************************
 */

gulp.task('watch', function() {
    iconfont;
    sass;
    //livereload.listen();
});

// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
