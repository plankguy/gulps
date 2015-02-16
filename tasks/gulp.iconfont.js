/* 
 * Iconfont Task
 *
 * @url:        http://fallwater.ca/
 * @author:     Jeff Waterfall
 * @source:     https://github.com/nfroidure/gulp-iconfont
 * @dependencies:
 *      - https://github.com/nfroidure/gulp-iconfont
 *      - https://github.com/timrwood/gulp-consolidate
 *
 * Copyright 2015 Jeff Waterfall
 */

module.exports = function( gulp, plugins, paths ) {
  "use strict";

    // Icon font task
    gulp.task('iconfont', function() {
        gulp.src( paths.icons.src )
            .pipe( plugins.iconfont({
                fontName : 'icons'
            }))
            .on('codepoints', function( codepoints, options ) {
                //gulp.src( paths.css + 'templates/iconfont.css' )
                gulp.src( paths.templates + '_iconfont.scss' )
                    .pipe( plugins.consolidate( 'lodash', {
                        glyphs    : codepoints,
                        fontName  : 'icons',
                        fontPath  : paths.icons.cssurl, // relative from dest
                        className : 'i'
                    }))
                    .pipe( gulp.dest( paths.scss ) );
            })
            .on('codepoints', function( codepoints, options ) {
                // CSS templating, e.g.
                console.log( codepoints, options );
            })
            .pipe( gulp.dest( paths.fonts ) );
    });

    // Watch task
    var watchIcons = gulp.watch( paths.icons.watch, ['iconfont'] );

    // Watch events
    watchIcons.on('change', function(event) {
       console.log('Event type: ' + event.type); // added, changed, or deleted
       console.log('Event path: ' + event.path); // The path of the modified file
    });

    return watchIcons;
};
