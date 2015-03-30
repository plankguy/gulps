/**
 *
 * Gulp Tasks
 *
 * @url:        http://fallwater.ca/
 * @author:     Jeff Waterfall
 * @dependencies:
 *      - https://github.com/gulpjs/gulp
 *      - https://lodash.com/
 *      - https://github.com/jackfranklin/gulp-load-plugins
 *
 */

"use strict";

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

// Get (require tasks)
function getTask( task, settings ) {
    return require( paths.tasks + task )( gulp, _, plugins, paths, settings );
}


/**
 *
 * Sass
 *
 *********************************************************/

// Settings / Options
var sassSettings = {
    sass : {
        outputStyle : 'nested'
    }
};
// Require Task
var sass = getTask( 'gulp.sass', sassSettings );


/**
 *
 * Iconfont
 *
 *********************************************************/

// Settings / Options
var iconsSettings = {
    template : paths.templates + '_iconfont-template.scss',
    iconfont : {
        fileName : '__iconfont.scss',
        fontPath : '../fonts/'
    },
    paths : {
        src  : paths.images + 'icons/svgs/*.svg',
        dest : paths.fonts,
        css  : paths.scss + 'functions/'
    }
};
// Require Tasks
var iconfont = getTask( 'gulp.iconfont', iconsSettings );


/**
 *
 * Imagemin
 *
 *********************************************************/

// Settings / Options
var imageminSettings = {
    paths : {
        src   : paths.images + '**/*',
        dest  : paths.images
    }
};
// Require Task
var imagemin = getTask( 'gulp.imageminconfont', imageminSettings );


/**
 *
 * Watch
 *
 *********************************************************/

//
gulp.task('watch', ['sass', 'iconfont'], function () {
    gulp.watch(sass.settings.paths.src, ['sass']);
    gulp.watch(iconfont.settings.paths.src, ['iconfont']);
    //livereload.listen();
});

// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
