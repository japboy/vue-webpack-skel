const fs = require('fs')
const path = require('path')

const rimraf = require('rimraf')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const vendorConfig = require('./development/webpack.vendor.config')
const mainConfigs = require('./development/webpack.main.config')

const vendorManifestPath = path.resolve(mainConfigs[0].output.path, 'vendor-manifest.json')
const packagePath = path.resolve(__dirname, '..', 'package.json')

const hmr = process.env.HMR === '1'
const textReset = '\x1b[0m'
const textBright = '\x1b[1m'

function fixed (number, digit = 2) {
  return (`0${number}`).slice(-digit)
}
function now () {
  const date = new Date()
  // date.setTime(date.getTime() + (1000 * 60 * 60 * 9))
  return `${fixed(date.getHours())}:${fixed(date.getMinutes())}:${fixed(date.getSeconds())}`
}

function buildVendorAssets (callback) {
  process.stdout.write(` 💪 ${textBright}Full-building...${textReset}\n\n`)

  rimraf('../assets/**/*', (rmError) => {
    if (rmError) throw rmError

    Webpack(vendorConfig, (vendorError, stats) => {
      if (vendorError) throw vendorError

      if (stats.hasErrors()) {
        process.stdout.write(`${stats.toString('errors-only')}\n\n`)
        process.stdout.write(` ⛔️ ${textBright}Error occurs${textReset}\n\n`)
        process.exit(1)
      }
      process.stdout.write(`${stats.toString('minimal')}\n\n`)
      process.stdout.write(` ⚡️ ${textBright}Built vendor assets${textReset}\n\n`)

      callback.apply(this)
    })
  })
}

function buildMainAssetsAndStartDevServer () {
  if (!hmr) {
    const watchEnabledMainConfigs = mainConfigs.map(config => Object.assign({}, config, { watch: true }))
    Object.assign(mainConfigs, watchEnabledMainConfigs)
  }
  const compiler = Webpack(mainConfigs, (error, stats) => {
    if (error) throw error
    if (stats.hasErrors()) {
      process.stdout.write(`${stats.toString('errors-only')}\n\n`)
      process.stdout.write(` ⛔️ ${textBright}Error occurs${textReset}\n\n`)
    } else {
      process.stdout.write(`${stats.toString('minimal')}\n\n`)
      process.stdout.write(` ⚡️ ${textBright}Built partial assets${textReset} @${now()}\n\n`)
    }
  })

  if (hmr) {
    const statsOptions = { stats: 'minimal' }
    const devServerOptions = mainConfigs[0].devServer
    const options = Object.assign({}, statsOptions, devServerOptions)
    const server = new WebpackDevServer(compiler, options)

    server.listen(devServerOptions.port, devServerOptions.host, () => {
      const protocol = devServerOptions.https ? 'https' : 'http'
      process.stdout.write(` 🌏 ${textBright}Launched server:${textReset} ${protocol}://${devServerOptions.host}:${devServerOptions.port}\n\n`)
    })
  }
}

fs.stat(vendorManifestPath, (vendorError, vendorStats) => {
  if (vendorError) {
    buildVendorAssets(buildMainAssetsAndStartDevServer)
    return
  }

  const assetVendorManifestLastModified = Date.parse(vendorStats.mtime)

  fs.stat(packagePath, (packageError, packageStats) => {
    if (packageError) throw packageError

    const packageLastModified = Date.parse(packageStats.mtime)

    if (assetVendorManifestLastModified < packageLastModified) {
      buildVendorAssets(buildMainAssetsAndStartDevServer)
      return
    }

    buildMainAssetsAndStartDevServer()
  })
})
