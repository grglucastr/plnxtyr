var gulp = require('gulp'),
    inject = require('gulp-inject'),
    nodemon = require('gulp-nodemon'),
    wiredep = require('wiredep').Stream;

gulp.task('inject', function(){
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/libs',
        ignorePath: '../../public/'
    };

    var injectSrc = gulp.src(['./public/stylesheets/**/*.css',
                              './public/javascripts/**/*.js'], {read:false});

    var injectOptions = {
        ignorePath: '/public/'
    }

    return gulp.src('./views/templates/*.jade')
                .pipe(wiredep(options))
                .pipe(inject(injectSrc, injectOptions))
                .pipe(gulp.dest('./views/templates/'));
});

gulp.task('serve', function(){
    var options = {
        script: './bin/www',
        delayTime: 1,
        watch: ['*.js', './controllers/*.js', './routes/*.js','./services/*.js']
    }
    return nodemon(options).on('restart', function(){
        console.log('\n\n >>Server Restarting...');
    });
});
