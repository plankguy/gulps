module.exports = function( gulp, $, paths ) {
  "use strict";
    //var gulp        = require('gulp'),
    //    iconfont    = require('gulp-iconfont'), // https://github.com/nfroidure/gulp-iconfont
    //    consolidate = require('gulp-consolidate');

    // Icon font task
    gulp.task('iconfont', function() {
        gulp.src( [paths.images + 'icons/svgs/*.svg'] )
            .pipe( iconfont({
                fontName : 'icons'
            }))
            .on('codepoints', function( codepoints, options ) {
                //gulp.src( paths.css + 'templates/iconfont.css' )
                gulp.src( paths.templates + '_iconfont.scss' )
                    .pipe( consolidate( 'lodash', {
                        glyphs    : codepoints,
                        fontName  : 'icons',
                        fontPath  : '../fonts/', // relative from dest
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


    var watchIcons = gulp.watch( paths.images + 'icons/svgs/*.svg', ['iconfont'] );

    watchIcons.on('change', function(event) {
       console.log('Event type: ' + event.type); // added, changed, or deleted
       console.log('Event path: ' + event.path); // The path of the modified file
    });

    return watchIcons;
};
