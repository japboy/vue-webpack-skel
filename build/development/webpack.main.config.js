const path = require('path')
const webpack = require('webpack')

const env = Object.assign({}, process.env, { NODE_ENV: process.env.NODE_ENV || 'development' })

module.exports = [
  {
    /**
     * @see https://webpack.js.org/configuration/entry-context/
     */
    entry: {
      main: [
        'babel-polyfill',
        'whatwg-fetch',
        'web-animations-js',
        path.resolve(__dirname, '..', '..', 'src', 'index.js')
      ]
    },

    /**
     * @see https://webpack.js.org/configuration/output/
     */
    output: {
      filename: '[name].js',
      chunkFilename: '[name]-chunk.js',
      path: path.resolve(__dirname, '..', '..', 'docs', 'assets'),
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
                minimize: false,
                sourceMap: false,
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
              // @see https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md
              options: {
                cssSourceMap: true,
                esModule: true,
                // @see https://github.com/vuejs/vue-loader/blob/master/docs/en/features/css-modules.md#configuring-css-loader-query
                cssModules: {
                  // [hash:base64] changes depending on build platforms (eg. windows or mac)
                  localIdentName: '[hash:base64:7]'
                }
              }
            }
          ]
        }
      ]
    },

    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },

    /**
     * @see https://webpack.js.org/configuration/plugins/
     */
    plugins: [
      /**
       * @see https://webpack.js.org/plugins/dll-plugin/#dllreferenceplugin
       */
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '..', '..'), // PROJECT ROOT
        manifest: path.resolve(__dirname, '..', '..', 'docs', 'assets', 'vendor-manifest.json')
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
       * @see https://webpack.js.org/plugins/hot-module-replacement-plugin/
       */
      new webpack.optimize.ModuleConcatenationPlugin()
    ],

    // @see https://webpack.js.org/configuration/dev-server/
    devServer: {
      clientLogLevel: 'info',
      compress: true,
      contentBase: path.join(__dirname, '..', '..', 'docs'),
      host: '0.0.0.0',
      hot: true,
      https: true,
      port: 3000
    },

    /**
     * @see https://webpack.js.org/configuration/devtool/
     */
    devtool: 'source-map'
  }
]
