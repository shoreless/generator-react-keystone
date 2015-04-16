var webpack           = require('webpack');
var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DevEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  }
});

var sassLoaders = [
  'css-loader',
  'autoprefixer-loader' +
    '?browsers=last 2 version',
  'sass-loader' +
    '?includePaths[]=' + path.resolve(__dirname, './app')    // includes app dir for libsass
];

module.exports = {

  entry: {
    site: [
      'webpack/hot/dev-server',
      './app/client.jsx'
    ]
  },

  debug: true,
  devtool: 'eval',

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: 'dist/'
  },

  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.css', '.scss', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'bower_components', 'assets', 'app']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/,  loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) },
      { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(jpg|png)$/,  loader: 'url-loader?limit=8192' }
    ]
  },

  plugins: [
    DevEnvPlugin,
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()    // don't reload if there are errors
  ]

};