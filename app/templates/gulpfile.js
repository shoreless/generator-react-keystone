var gulp             = require('gulp');
// var jshint           = require('gulp-jshint');
// var jshintReporter   = require('jshint-stylish');
// var watch            = require('gulp-watch');
var webpack          = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig    = require('./webpack.config.js');
var gutil            = require('gulp-util');

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





gulp.task("webpack-dev-server", function(callback) {
  var webpackPort = 8899;

  // modify some webpack config options
  webpackConfig.devtool = "eval";
  webpackConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/' + webpackConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(webpackPort, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "Assets available from http://localhost:" + webpackPort + '/' + webpackConfig.output.publicPath);
  });
});

gulp.task('dev', ['webpack-dev-server'])