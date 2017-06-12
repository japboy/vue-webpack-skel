const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const env = process.env

module.exports = [
  {
    /**
     * @see https://webpack.js.org/configuration/entry-context/
     */
    entry: {
      main: path.resolve('.', 'src', 'index.js'),
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
      path: path.resolve('.', 'docs', 'assets'),
      publicPath: '/assets/'
    },

    /**
     * @see https://webpack.js.org/configuration/module/
     */
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                esModule: true
              }
            }
          ]
        }
      ]
    },

    /**
     * @see https://webpack.js.org/configuration/plugins/
     */
    plugins: [
      /**
       * @see https://webpack.js.org/plugins/environment-plugin/
       */
      new webpack.EnvironmentPlugin({
        NODE_ENV: env.NODE_ENV || 'development'
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

      /**
       * @see https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
       */
      new webpack.optimize.ModuleConcatenationPlugin(),

      /**
       * @see https://github.com/webpack-contrib/uglifyjs-webpack-plugin
       */
      new UglifyJSPlugin({
        sourceMap: true
      })
    ],

    /**
     * @see https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      compress: true,
      contentBase: path.resolve('.', 'docs'),
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
