const fs = require('fs')
const path = require('path')

const rimraf = require('rimraf')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackVendorConfig = require('./development/webpack.vendor.config')
const webpackMainConfig = require('./development/webpack.main.config')

const assetRootPath = path.resolve(__dirname, '..', 'docs', 'assets')
const assetVendorManifestPath = path.resolve(assetRootPath, 'vendor-manifest.json')
const packagePath = path.resolve(__dirname, '..', 'package.json')

function buildVendorAssets (callback) {
  rimraf(`${assetRootPath}/**/*`, (error) => {
    if (error) throw error

    Webpack(webpackVendorConfig, (error, stats) => {
      if (error) throw error

      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      if (stats.hasErrors()) {
        console.error('Build failed with errors.')
        process.exit(1)
      }

      callback()
    })
  })
}

function buildMainAssetsAndStartDevServer () {
  const compiler = Webpack(webpackMainConfig)
  const server = new WebpackDevServer(compiler, {
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    // @see https://webpack.js.org/configuration/dev-server/
    compress: true,
    contentBase: path.resolve(__dirname, '..', 'docs'),
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    https: true,
    port: 9000
  })

  server.listen(9000, '0.0.0.0', () => {
    console.log('Starting server on http://0.0.0.0:9000')
  })
}

fs.stat(assetVendorManifestPath, (error, stats) => {
  if (error) {
    console.warn(error.message)
    buildVendorAssets(buildMainAssetsAndStartDevServer)
    return
  }

  const assetVendorManifestLastModified = Date.parse(stats.mtime)

  fs.stat(packagePath, (error, stats) => {
    if (error) throw error

    const packageLastModified = Date.parse(stats.mtime)

    if (assetVendorManifestLastModified < packageLastModified) {
      buildVendorAssets(buildMainAssetsAndStartDevServer)
      return
    }
    buildMainAssetsAndStartDevServer()
  })
})
