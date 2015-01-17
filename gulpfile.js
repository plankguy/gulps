// Required Plugins
var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')();
//,
//    iconfont    = require('gulp-iconfont'), // https://github.com/nfroidure/gulp-iconfont
//    consolidate = require('gulp-consolidate');

// Define default paths
var paths = {
    tasks    : './tasks/',
    static   : 'static/',
    images   : 'static/images/',
    css      : 'static/css/',
    scss     : 'static/scss/',
    js       : 'static/js/',
    fonts    : 'static/fonts/',
    templates: 'static/templates/'
};

// stub
var iconfont = require( paths.tasks + 'iconfont' )(gulp, $, paths);

console.log('iconfont:');
console.log(iconfont);
//gulp.loadTasks( paths.tasks + 'iconfont' );
/*
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
*/

gulp.task('watch', function() {
    // watch Icons
    //watchIcons;

    //livereload.listen();
});

// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
