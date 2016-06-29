var webpack = require('webpack');

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/index.jsx"
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "react-hot!babel"
    },{
      test: /.*\.(gif|png|jpe?g|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack'
      ]
    },{
      test   : /\.css$/,
      loaders: ["style", "css?sourceMap", "resolve-url"]
    },
    {
      test: /\.sass$/,
      loaders: ["style", "css?sourceMap", "resolve-url",  "sass?sourceMap"]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'chattigo-webchat.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: "source-map",
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};