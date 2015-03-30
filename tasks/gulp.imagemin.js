/**
 *
 * Imagemin Task
 *
 * @url:    http://fallwater.ca/
 * @author: Jeff Waterfall
 * @source: https://github.com/sindresorhus/gulp-imagemin
 * @dependencies:
 *      - https://github.com/sindresorhus/gulp-changed
 *      - https://github.com/mikaelbr/gulp-notify
 *
 */

module.exports = function( gulp, _, plugins, paths, settings ) {
    "use strict"; 

    // Default settings
    var defaults = {
        imagemin : {
            optimizationLevel : 7,
            progressive       : true, 
            interlaced        : true
        },
        paths : {
            src  : './images/**/*',
            dest : './images',
        }
    };
    // Extend defaults with settings params
    settings = _.merge(defaults, settings);

    // Imagemin task
    var task = gulp.task('imagemin', function() {
        gulp.src( settings.paths.src )
            //.pipe( plugins.changed( settings.paths.dest ) )
            .pipe( plugins.imagemin( settings.imagemin ) )
            .pipe( gulp.dest( settings.paths.dest ) )
            .pipe( plugins.notify({
                message: 'Imagemin task complete'
            }));
    });

    // Return the task and settings
    return { task: task, settings: settings };

    // Watch task?
    //var watchImages = gulp.watch( settings.paths.watch, ['imagemin'] );

    // Watch events
//    watchImages.on('change', function(event) {
//       console.log('Event type: ' + event.type); // added, changed, or deleted
//       console.log('Event path: ' + event.path); // The path of the modified file
//    });

    //return watchImages;
};
