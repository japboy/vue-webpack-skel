const path = require('path')
const webpack = require('webpack')

module.exports = [
  {
    entry: path.resolve('.', 'src', 'main.js'),
    output: {
      path: path.resolve('.', 'dist'),
      publicPath: '/dist/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader?cacheDirectory=true',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1',
            'postcss-loader'
          ]
        },
        {
          test: /\.vue$/,
          loaders: [
            'vue-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
    ],
    devServer: {
      compress: true,
      contentBase: path.resolve(__dirname),
      port: 8080,
      historyApiFallback: true,
      https: true
    },
    devtool: 'inline-source-map'
  }
]

