const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
]

const config = {
  entry: {
    app: ['./src/app']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
              presets: ['react', 'es2015']
          }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [path.join(__dirname, './src')]
  }
}

module.exports = config
