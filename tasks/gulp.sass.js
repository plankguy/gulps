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
        sass : {
            outputStyle : 'compressed',
            precision   : 3
        },
        paths : {
            src     : paths.scss + '**/*.{scss,sass}',
            watch   : paths.scss + '**/*',
        },
        autoprefixer: 'last 2 versions'
    };
    // Extend defaults with settings params
    settings = _.merge(defaults, settings);

    // Sass task
    var task = gulp.task('sass', function () {
        gulp.src( settings.paths.src )
            .pipe( plugins.sass({
                outputStyle     : settings.sass.outputStyle,
                precision       : settings.sass.precision,
                errLogToConsole : true
            }))
            .pipe( plugins.autoprefixer( settings.autoprefixer ) )
            .pipe( plugins.sourcemaps.write() )
//            .on( 'error', function( err ) {
//                new plugins.gutil.PluginError('CSS', err, { showStack: true });//gutil.log( err );
//                this.emit('end');
//            })
            .pipe( gulp.dest( paths.css ) )
            .pipe( plugins.notify({
                message : 'Sass task complete'
            }));
    });

    // Return the task and settings
    return { task: task, settings: settings };
};
