var webpack           = require('webpack');
var path              = require('path');

var ProdEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

var sassLoaders = [
  'style',
  'css',
  'autoprefixer' +
    '?browsers=last 2 version',
  'sass' +
    '?includePaths[]=' + path.resolve(__dirname, './app')    // includes app dir for libsass
];

module.exports = {

  entry: {
    site: './app/client.jsx',
    style: './app/style/site.scss'
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    publicPath: 'dist/'
  },

  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    modulesDirectories: ['node_modules', 'bower_components']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loader: sassLoaders.join('!') },
      { test: /\.css$/,  loaders: ['style-loader', 'css-loader'] }
    ]
  },

  plugins: [
    ProdEnvPlugin,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new webpack.NoErrorsPlugin()    // don't reload if there are errors
  ]

};