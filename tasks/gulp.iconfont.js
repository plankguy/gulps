/* 
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
 *
 * Copyright 2015 Jeff Waterfall
 */

module.exports = function( gulp, _, plugins, paths, settings ) {
    "use strict"; 

    // Default settings
    var defaults = {
        fontName    : 'icons',
        cssClass    : 'i',
        template    : './templates/_iconfont.scss',
        paths : {
            src       : './svgs/*.svg',
            watch     : './svgs/*.svg',
            scss      : './scss/',
            fonts     : './fonts/',
            cssurl    : '../fonts/'
        }
    };
    // Extend defaults with settings params
    settings = _.assign(defaults, settings);

console.log(settings);

    // Icon font task
    gulp.task('iconfont', function() {
        gulp.src( settings.paths.src )
            .pipe( plugins.iconfont({
                fontName : settings.fontName
            }))
            .on('codepoints', function( codepoints, options ) {
                gulp.src( settings.template )
                    .pipe( plugins.consolidate( 'lodash', {
                        glyphs    : codepoints,
                        fontName  : settings.fontName,
                        fontPath  : settings.paths.cssurl, // relative from dest
                        className : settings.cssClass
                    }))
                    .pipe( gulp.dest( paths.scss ) );
            })
            .on('codepoints', function( codepoints, options ) {
                // CSS templating, e.g.
                console.log( codepoints, options );
            })
            .pipe( gulp.dest( paths.fonts ) )
            .pipe( notify({
                message : 'Iconfont task complete'
            }));
    });

    // Watch task
    var watchIcons = gulp.watch( settings.paths.watch, ['iconfont'] );

    // Watch events
    watchIcons.on('change', function(event) {
       console.log('Event type: ' + event.type); // added, changed, or deleted
       console.log('Event path: ' + event.path); // The path of the modified file
    });

    return watchIcons;
};
