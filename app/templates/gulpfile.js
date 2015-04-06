var gulp             = require('gulp');
// var jshint           = require('gulp-jshint');
// var jshintReporter   = require('jshint-stylish');
// var watch            = require('gulp-watch');
var webpack          = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var gutil            = require('gulp-util');
var gulpBump         = require('gulp-bump');

var webpackDevConfig = require('./webpack-dev.config.js');
var webpackConfig    = require('./webpack.config.js');

/*
 * Create variables for our project paths so we can change in one place
 */
// var paths = {
// 	src: ['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
// };


// // gulp lint
// gulp.task('lint', function(){
// 	gulp.src(paths.src)
// 		.pipe(jshint())
// 		.pipe(jshint.reporter(jshintReporter));

// });

// // gulp watcher for lint
// gulp.task('watch:lint', function () {
// 	gulp.src(paths.src)
// 		.pipe(watch())
// 		.pipe(jshint())
// 		.pipe(jshint.reporter(jshintReporter));
// });



function bump (bumpOptions) {
	gulp.src(['./bower.json', './package.json'])
	  .pipe(gulpBump(bumpOptions))
	  .pipe(gulp.dest('./'));
}

gulp.task('bump:patch', function () {
	bump({type:'patch'});
});

gulp.task('bump:minor', function () {
	bump({type:'minor'})
});

gulp.task('bump:major', function () {
	bump({type:'major'})
});


gulp.task('webpack', function (callback) {
	webpack(webpackConfig, function (err, stats) {
		if (err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({}) );
      callback();
	});
});


gulp.task('webpack-dev-server', function(callback) {
  var webpackPort = 8899;

  // modify some webpack config options
  webpackDevConfig.devtool = 'eval';
  webpackDevConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), {
    publicPath: '/' + webpackDevConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(webpackPort, 'localhost', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'Assets available from http://localhost:' + webpackPort + '/' + webpackDevConfig.output.publicPath);
    callback();
  });
});

gulp.task('dev', ['webpack-dev-server'])