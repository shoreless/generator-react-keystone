'use strict';

var gulp             = require('gulp');
var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var gutil            = require('gulp-util');
var gulpBump         = require('gulp-bump');
var inject           = require('gulp-inject');

/* Config files */
var webpackDevConfig = require('./webpack-dev.config.js');
var webpackConfig    = require('./webpack.config.js');


/*
 * paths to files that gulp needs to access
 */
var paths = {
  sass: {
    mainFile: './app/styles/site.scss',
    globPattern: './app/**/_*.scss'
  },
  desitnation: {
    styles: './app/styles'
  }
};


/*
 * Task that finds all stylesheets in the app folder and
 * injects an import tag for it in site.scss
 */
gulp.task('injectSass', function () {
  return gulp.src(paths.sass.mainFile)
    .pipe(inject(gulp.src(paths.sass.globPattern, {read: false}), {
      starttag: '// inject:scss',
      endtag: '// endinject',
      relative: true,
      transform: function (filepath) {
        return '@import "' + filepath.slice(0, -5) + '";';
      }
    }))
    .pipe(gulp.dest(paths.desitnation.styles));
});



/*
 * Webpack prod task
 */
gulp.task('webpack', ['injectSass'], function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err)
      throw new gutil.PluginError('webpack', err);

    gutil.log('[webpack]', stats.toString({}) );
    callback();
  });
});



/*
 * Webpack dev task
 */
gulp.task('webpack-dev-server', ['injectSass'], function(callback) {
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
    if (err)
      throw new gutil.PluginError('webpack-dev-server', err);

    gutil.log('[webpack-dev-server]', 'Assets available from http://localhost:' + webpackPort + '/' + webpackDevConfig.output.publicPath);
    callback();
  });
});



/*
 * Functions to bump the version number of the app
 */
function bump (bumpOptions) {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(gulpBump(bumpOptions))
    .pipe(gulp.dest('./'));
}

gulp.task('bump:patch', function () {
  bump({type: 'patch'});
});

gulp.task('bump:minor', function () {
  bump({type: 'minor'});
});

gulp.task('bump:major', function () {
  bump({type: 'major'});
});




gulp.task('dev', ['webpack-dev-server']);