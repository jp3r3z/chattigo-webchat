const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const assets = require('postcss-assets');
const baseURL = 'https://api.chattigo.com/';

module.exports = {
  devtool: 'source-map',

  entry: [
    "bootstrap-loader",
    "./src/index.jsx"
  ],

  output: {
    path: __dirname + '/dist',
    publicPath: baseURL,
    filename: 'chattigo-webchat.js'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel"
    },{
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack'
      ]
    },{
      test: /\.(woff2?)$/,
      loader: 'url?limit=10000'
    },{
      test: /\.(ttf|eot)$/,
      loader: 'file'
    },{
      test   : /\.css$/,
      loaders: ["style", "css?sourceMap", "postcss", "resolve-url"]
    },{
      test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports?jQuery=jquery'
    },{
      test: /\.sass$/,
      loaders: ["style", "css?sourceMap", "postcss", "resolve-url", "sass?sourceMap"]
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: './dist',
    hot: false
  },

  postcss: [
    autoprefixer({ browsers: ['last 5 versions'] }),
    assets({
        loadPaths: ['dist/'],
        baseUrl: baseURL
      })
  ],

  imageWebpackLoader: {
    pngquant:{
      quality: "65-90",
      speed: 4
    },
    svgo:{
      plugins: [
        {
          removeViewBox: false
        },
        {
          removeEmptyAttrs: false
        }
      ]
    }
  }
}
