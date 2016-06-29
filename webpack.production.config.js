const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    "bootstrap-loader",
    "./src/index.jsx"
  ],

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
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
      loaders: ["style", "css?sourceMap", "resolve-url"]
    },{
      test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports?jQuery=jquery'
    },{
      test: /\.sass$/,
      loaders: ["style", "css?sourceMap", "resolve-url",  "sass?sourceMap"]
    }]
  },
  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    contentBase: './dist',
    hot: false
  },

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