var gulp        = require('gulp'),
    iconfont    = require('gulp-iconfont'), // https://github.com/nfroidure/gulp-iconfont
    consolidate = require('gulp-consolidate');

var paths = {
    static  : './static/',
    images  : './static/images/',
    css     : './static/css/',
    scss    : './static/scss/',
    js      : './static/js/',
    fonts   : './static/fonts/'
};

gulp.task('iconfont', function(){
    gulp.src( [paths.images + 'icons/svgs/*.svg'] )
        .pipe( iconfont({
            fontName         : 'icons',  // required
            //appendCodepoints : true      // recommended option
        }))
        .on('codepoints', function(codepoints, options) {
            //gulp.src( paths.css + 'templates/iconfont.css' )
            gulp.src( paths.css + 'templates/iconfont.css' )
                .pipe( consolidate( 'lodash', {
                    glyphs      : codepoints,
                    fontName    : 'icons',
                    fontPath    : '../fonts/',
                    className   : 'i'
                }))
                .pipe( gulp.dest( paths.css ) );
        })
        .on('codepoints', function( codepoints, options ) {
            // CSS templating, e.g.
            console.log( codepoints, options );
        })
        .pipe( gulp.dest( paths.fonts ) );
});

/*
var watcher = gulp.watch( paths.images + 'icons/svgs/*.svg', ['iconfont'] );

watcher.on('change', function(event) {
   console.log('Event type: ' + event.type); // added, changed, or deleted
   console.log('Event path: ' + event.path); // The path of the modified file
});
*/

gulp.task('watch', function() {
    // watch Icons
    gulp.watch( paths.images+'icons/svgs/*.svg', ['iconfont'] ).on('change', function(event) {
       console.log('Event type: ' + event.type); // added, changed, or deleted
       console.log('Event path: ' + event.path); // The path of the modified file
       //livereload.changed
    });

    //livereload.listen();
});

// Default task
gulp.task('default', function() {
    gulp.start('watch');
});
