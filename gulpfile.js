var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify')
var vueify = require('vueify');
var babelify = require('babelify');
var sass = require('gulp-sass');

var resourceSrc = './resource/assets/';
var output = './dist/assets/';
var dist_dir = '';


gulp.task('vue',function(){
	browserify(resourceSrc+'js/main.js')
	.transform(vueify)
    .transform(babelify, { presets: ['es2015'], plugins: ["transform-runtime"] })
	.bundle()
	.pipe(fs.createWriteStream(output+"/js/bundle.js"))
});


var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'	
};
// Sass Compile 
gulp.task('sass',function(cb){
	gulp.src(resourceSrc+'sass/**/*.scss')
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(concat('app.css'))
	.pipe(gulp.dest(output+'css/src'))
	cb();
});


/*Minify and sourcemap For css Compiled by sass*/
gulp.task('css:min',['sass'], function() {
	setTimeout(
		function(){
			return gulp.src(output+'css/src/*.css')
		    .pipe(sourcemaps.init())
		    .pipe(minifyCss({compatibility: 'ie8'}))
		    .pipe(concat('app.css'))
		    .pipe(sourcemaps.write('.'))
		    .pipe(gulp.dest(output+'css/run'));
		},500
	);
});

gulp.task('watch',function(){
    gulp.watch('./src/main.js', ['vue']);
	gulp.watch(resourceSrc+'sass/**/*.scss',['sass']);
});
gulp.task('default', ['vue','sass'], function() {});
gulp.task('prod', ['vue','css:min'], function() {});