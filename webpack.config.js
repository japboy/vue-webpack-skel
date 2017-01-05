const path = require('path')
const webpack = require('webpack')

module.exports = [
  {
    /**
     * @see https://webpack.js.org/configuration/entry-context/
     */
    entry: {
      main: path.resolve('.', 'src', 'main.js'),
      vendor: [
        'normalize.css',
        'vue'
      ]
    },

    /**
     * @see https://webpack.js.org/configuration/output/
     */
    output: {
      filename: '[name].js',
      path: path.resolve('.', 'dist'),
      publicPath: '/dist/'
    },

    /**
     * @see https://webpack.js.org/configuration/module/
     */
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

    /**
     * @see https://webpack.js.org/configuration/plugins/
     */
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),

      /**
       * @see https://webpack.js.org/guides/code-splitting-libraries/
       */
      new webpack.optimize.CommonsChunkPlugin({
        names: [
          'vendor',
          'manifest'
        ]
      }),

      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      })
    ],

    /**
     * @see https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      compress: true,
      contentBase: path.resolve('.'),
      port: 8080,
      historyApiFallback: true,
      https: true
    },

    /**
     * @see https://webpack.js.org/configuration/devtool/
     */
    devtool: 'inline-source-map'
  }
]