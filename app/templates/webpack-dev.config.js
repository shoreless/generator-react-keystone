var webpack           = require('webpack');  
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path              = require('path');

var DevEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
    // INCLUDE_STYLES: Adds style require() calls to the components to prevent them from being required on the server
    'INCLUDE_STYLES': JSON.stringify(true)
  }
});

var sassLoaders = [
  'css-loader',
  'autoprefixer-loader' +
    '?browsers=last 2 version',
  'sass-loader' +
    '?includePaths[]=' + path.resolve(__dirname, "./app")    // includes app dir for libsass
];

module.exports = {  

    entry: {
      site: './app/client.jsx',
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
            // { test: /\.jsx$/,  loaders: ['react-hot', 'jsx-loader?harmony'], exclude: /node_modules/ },
            { test: /\.jsx?$/,  loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) },
            { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
        ]
    },
    
    plugins: [
      DevEnvPlugin,
      new ExtractTextPlugin('[name].css'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()    // don't reload if there are errors
    ]

};