var gulp = require('gulp');
var sass = require('gulp-sass');
var spawn = require('child_process').spawn;
var livereload = require('gulp-livereload');


var gulpActivity = function(app, http) {

	this.app = app;
	this.http = http;

	var sass_files  = [
	               'sass/*',
	               'sass/base/*',
	               'sass/utitlities/*',
	               'sass/elements/*',
	               'sass/test/*',
	               'sass/grids/*'
	               ];
	var css = ['css/*'];
	var html = [
	               'html/*'
	            ];

	this.start = function(port) {

		

		gulp.task('connect', function() {
				   http.listen(port, function(){
				   console.log('listening on :' + port);
				});
		});

		gulp.task('sass', function() {
			return gulp.src('sass/main.sass')
			    .pipe(sass().on('error', sass.logError))
    			.pipe(gulp.dest('./css'));
		})

		gulp.task('watch', function(event) {
			//livereload.listen();
			gulp.watch(sass_files, ['sass']);
			//gulp.watch(html, ['gulp-autoreload']);
		})

      
       gulp.task('gulp-autoreload', function() {
			spawn('gulp', ['default'], {stdio: 'inherit'});
            process.exit();
      });



		gulp.task('default', ['connect', 'sass', 'watch']);


	}
	
}
module.exports = gulpActivity;

