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
// 	sass: {
// 		main: './public/styles/site.scss',
// 		appComponents: './app/**/*.scss',
// 		dest: './public/styles'
// 	}

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




// Task that finds all stylesheets in the app folder and injects an import tag for it in site.scss
// gulp.task('sass:inject', function () {
//   gulp.src(paths.sass.main)
//     .pipe(inject(gulp.src(paths.sass.appComponents, {read: false}), {
//       starttag: '// inject:scss',
//       endtag: '// endinject',
//       relative: true,
//       transform: function (filepath) {
//         return '@import "' + filepath.slice(0, -5) + '";';
//       }
//     }))
//     .pipe(gulp.dest(paths.sass.dest));
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

gulp.task('dev', ['sass:inject', 'webpack-dev-server'])