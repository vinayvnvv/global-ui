var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var env = require('./../env.json');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var custom = require('./../../customize/custom.json');


var sassService = function() {
	this.buildCss = function(callback) {
		var custom_modules = (custom ? ( custom.modules ? ( custom.modules.components ? custom.modules.components : null) : null) : null);
		var sassMainFile = (custom_modules?env.src.sassCustomizedMainFile:env.src.sassMainFile);
		console.log(env.project.logsPrefix + 'compiling sass....'.blue);
		return gulp.src(sassMainFile)
			    .pipe(sass()
			    		.on('error', sass.logError)
			    	)
			    .pipe(rename(env.project.shortName + ".css"))
    			.pipe(gulp.dest(env.outDir.cssFile))
    			.on('end', ()=> {
	                    if(callback) callback();
	            });
	}

	this.minifyCss = function(callback) {
	  console.log(env.project.logsPrefix + 'minifiyng CSS!!....'.blue);
	  return gulp.src(env.outDir.cssFile + "/" + env.project.shortName + ".css")
	    .pipe(cleanCSS({compatibility: 'ie8'}))
	    .pipe(rename(env.project.shortName + ".min.css"))
	    .pipe(postcss([
            autoprefixer({browsers: ['last 2 versions']})
        ]))
	    .pipe(gulp.dest(env.outDir.cssFile))
	    .on('end', ()=> {
	    				console.log(env.project.logsPrefix + 'minified success....'.green);
	                    if(callback) callback();
	            });
	}
}

module.exports = new sassService();