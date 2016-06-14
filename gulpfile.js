var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify')
var vueify = require('vueify');
var babelify = require('babelify');


gulp.task('vue',function(){
	browserify('./src/main.js')
	.transform(vueify)
    .transform(babelify, { presets: ['es2015'], plugins: ["transform-runtime"] })
	.bundle()
	.pipe(fs.createWriteStream("./dist/bundle.js"))
});