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
 * @usage:
 *      Development:
 *          gulp
 *      Production:
 *          NODE_ENV=production gulp
 */

"use strict";

// Required Plugins
var gulp        = require('gulp'),
    _           = require('lodash'),
    plugins     = require('gulp-load-plugins')();

// Define default paths
var env   = process.env.NODE_ENV || 'development',
    paths = {
        abs       : __dirname + '/', // /Users/you/path/to/this
        tasks     : './tasks/',
        static    : 'static/',
        images    : 'static/images/',
        css       : 'static/css/',
        scss      : 'static/scss/',
        js        : 'static/js/',
        fonts     : 'static/fonts/',
        templates : 'static/scss/templates/',
        sourcemaps: 'static/sourcemaps/'
    },
    watchTasks = [];


/**
 *
 * Get tasks
 * @return object - node module
 *
 */

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
        outputStyle : ( env === 'development' ) ? 'expanded' : 'compressed'
    },
    sourcemaps : {
        path : '../sourcemaps/css',
    },
    paths : {
        src        : paths.scss + '**/*.{scss,sass}',
        dest       : paths.css,
        sourcemaps : paths.sourcemaps + 'css'
    }
};
// Require Task
var sass = getTask( 'gulp.sass', sassSettings );
// Add task to watch array [optional]
watchTasks.push('sass');


/**
 *
 * Iconfont
 *
 *********************************************************/

// Settings / Options
var iconsSettings = {
    template : paths.templates + '_iconfont-template.scss',
    iconfontOptions : {
        fileName : '__iconfont.scss',
        fontPath : paths.abs + paths.fonts,
        normalize: true
    },
    paths : {
        src  : paths.images + 'icons/svgs/*.svg',
        dest : paths.fonts,
        css  : paths.scss + 'functions/'
    }
};
// Require Tasks
var iconfont = getTask( 'gulp.iconfont', iconsSettings );
// Add task to watch array [optional]
watchTasks.push('iconfont');


/**
 *
 * Imagemin
 *
 *********************************************************/

// Settings / Options
var imageminSettings = {
    paths : {
        src  : [paths.images + '**/*.{jpg,jpeg,png,gif}', '!' + paths.images + 'icons/svgs/**/*'],
        dest : paths.images
    }
};
// Require Task
var imagemin = getTask( 'gulp.imagemin', imageminSettings );
// Add task to watch array [optional]
//watchTasks.push('imagemin');


/**
 *
 * Watch
 *
 *********************************************************/

gulp.task('watch', watchTasks, function () {
    watchTasks.forEach(function (task, index, array) {
        gulp.watch( eval(task).settings.paths.src, [task] )
            .on('change', function(event) {
                console.log(event.path + ' ' + event.type);
            })
            .on('error', function(err) {
                console.log('Error: ' + err);
                this.emit('end');
            });
    });
});
// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
