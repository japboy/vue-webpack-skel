const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const pkg = require('../../package.json')

const env = Object.assign({}, process.env, { NODE_ENV: process.env.NODE_ENV || 'production' })

module.exports = [
  {
    /**
     * @see https://webpack.js.org/configuration/entry-context/
     */
    entry: {
      main: path.resolve(__dirname, '..', '..', 'src', 'index.js'),
      vendor: Object.keys(pkg.dependencies)
    },

    /**
     * @see https://webpack.js.org/configuration/output/
     */
    output: {
      filename: '[name].js',
      chunkFilename: '[chunkhash:7]-chunk.js',
      path: path.resolve(__dirname, '..', '..', 'docs', 'assets'),
      publicPath: './assets/'
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
                sourceMap: false,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {},
                  // specify directory path to postcss.config.js
                  path: path.resolve(__dirname)
                }
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              // @see https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md
              options: {
                // @see https://github.com/vuejs/vue-loader/blob/master/docs/en/features/css-modules.md#configuring-css-loader-query
                cssModules: {
                  // [hash:base64] changes depending on build platforms (eg. windows or mac)
                  localIdentName: '[hash:base64:7]'
                },
                postcss: {
                  config: {
                    ctx: {},
                    // specify directory path to postcss.config.js
                    path: path.resolve(__dirname)
                  }
                },
                cssSourceMap: false,
                esModule: true,
                cacheBusting: true
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
       * @see https://webpack.js.org/guides/code-splitting-libraries/
       */
      new webpack.optimize.CommonsChunkPlugin({
        names: [
          'vendor',
          'runtime'
        ]
      }),

      /**
       * @see https://webpack.js.org/plugins/environment-plugin/
       */
      new webpack.EnvironmentPlugin({
        NODE_ENV: env.NODE_ENV
      }),

      /**
       * @see https://webpack.js.org/plugins/hot-module-replacement-plugin/
       */
      new webpack.HotModuleReplacementPlugin(),

      /**
       * @see https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b
       */
      new webpack.optimize.ModuleConcatenationPlugin(),

      /**
       * @see https://github.com/webpack-contrib/uglifyjs-webpack-plugin
       */
      new UglifyJSPlugin({
        parallel: true,
        sourceMap: false
      })
    ],

    /**
     * @see https://webpack.js.org/configuration/devtool/
     */
    devtool: false
  }
]
