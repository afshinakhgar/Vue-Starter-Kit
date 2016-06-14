var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var vueify = require('vueify');


gulp.task('vue',function(){
	browserify('./src/main.js')
	.transform(vueify)
	.bundle()
	.pipe(fs.createWriteStream("./dist/bundle.js"));
});