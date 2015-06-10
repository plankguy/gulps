/**
 *
 * Sass Task
 *
 * @url:        http://fallwater.ca/
 * @author:     Jeff Waterfall
 * @source:     https://github.com/dlmanning/gulp-sass
 * @dependencies:
 *      - https://github.com/floridoo/gulp-sourcemaps
 *      - https://github.com/sindresorhus/gulp-autoprefixer
 *      - https://github.com/gulpjs/gulp-util
 *      - https://github.com/mikaelbr/gulp-notify
 *
 */

module.exports = function( gulp, _, plugins, paths, settings ) {
    "use strict"; 

    // Default settings
    var defaults = {
        sassOptions : {
            outputStyle     : 'nested',
            precision       : 3,
            errLogToConsole : false
        },
        paths : {
            src   : 'static/scss/**/*.{scss,sass}',
            dest  : 'static/css'
        },
        autoprefixer: 'last 2 versions'
    };
    // Extend defaults with settings params
    settings = _.merge(defaults, settings);

    // Sass task
    var task = gulp.task('sass', function () {
        gulp.src( settings.paths.src )
            .pipe( plugins.sass(settings.sassOptions)
                .on('error', function(error) {
                    return plugins.notify().write("Sass error: " + error.message + ' in ' + error.fileName.match(/[^\\/]+$/) + ' line ' + error.lineNumber);
                })
                .on('end', function() {
                    return plugins.notify().write('Sass task complete');
                })
            )
            .pipe( plugins.autoprefixer( settings.autoprefixer ) )
            .pipe( plugins.sourcemaps.write() )
            .pipe( gulp.dest( settings.paths.dest ) );
    });

    // Return the task and settings
    return { 
        task: task, 
        settings: settings
    };
};
