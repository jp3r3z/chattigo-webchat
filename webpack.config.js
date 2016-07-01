var webpack = require('webpack');
const baseURL = 'http://localhost:8080/';

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "bootstrap-loader",
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
      loaders: ["style", "css?sourceMap", "postcss", "resolve-url",  "sass?sourceMap"]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: baseURL,
    filename: 'chattigo-webchat.js'
  },
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
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
  postcss: function () {
    return [
      require('postcss-assets')({
        loadPaths: ['dist/'],
        baseUrl: 'http://localhost:8080/'
      })
    ];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};