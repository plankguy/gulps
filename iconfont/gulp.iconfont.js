/**
 *
 * Iconfont Task
 *
 * @url:        http://fallwater.ca/
 * @author:     Jeff Waterfall
 * @source:     https://github.com/nfroidure/gulp-iconfont
 * @dependencies:
 *      - https://github.com/gulpjs/gulp
 *      - https://lodash.com/
 *      - https://github.com/nfroidure/gulp-iconfont
 *      - https://github.com/timrwood/gulp-consolidate
 *      - https://github.com/mikaelbr/gulp-notify
 *      - https://github.com/hparra/gulp-rename
 *
 */

module.exports = function( gulp, _, plugins, paths, settings, env ) {
    "use strict"; 

    // Default settings
    var defaults = {
        template : './templates/_iconfont.scss',
        iconfont : {
            fontName  : 'icons',
            className : 'i',
            fileName  : '_icons.scss',
            fontPath  : '../fonts/' // css "url" - relative or absolute from css file
        },
        paths : {
            src  : './svgs/**/*.svg',
            dest : './fonts/',
            styles  : './scss/'
        }
    };
    // Extend defaults with settings params
    settings = _.merge(defaults, settings);

    // Icon font task
    var task = gulp.task('iconfont', function() {
        gulp.src( settings.paths.src )
            .pipe( plugins.iconfont(settings.iconfont) )
            .on('codepoints', function( codepoints, options ) {
                gulp.src( settings.template )
                    .pipe( plugins.consolidate( 'lodash', _.merge(settings.iconfont, { glyphs : codepoints } ) ) )
                    .pipe( plugins.rename( settings.iconfont.fileName ) )
                    .pipe( gulp.dest( settings.paths.styles ) );
            })
            .on('codepoints', function( codepoints, options ) {
                // CSS templating, e.g.
//                console.log( codepoints, options );
            })
            .pipe( gulp.dest( settings.paths.dest ) )
            .pipe( plugins.notify({
                message : 'Iconfont task complete'
            }));
    });

    //return task;

    // Watch task
    //var watch = gulp.watch( settings.paths.watch, ['iconfont'] );

    // Watch events
    /*watch.on('change', function(event) {
       console.log('Event type: ' + event.type); // added, changed, or deleted
       console.log('Event path: ' + event.path); // The path of the modified file
    });*/

/*console.log('-----------------');
console.log(task);
console.log('-----------------');
console.log(watch);
console.log('-----------------');*/

/*console.log('-----------------');
console.log(task, settings.paths.src);
console.log('-----------------');*/

    return { task: task, settings: settings };
};
