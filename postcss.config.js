module.exports = () => ({
  // @see https://github.com/postcss/postcss/blob/master/docs/source-maps.md#postcss-and-source-maps
  map: {
    inline: false
  },
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      // @see https://github.com/ai/browserslist#browserslist
      browsers: [
        'Android >= 4',
        'Chrome >= 50',
        'ChromeAndroid >= 50',
        'Edge >= 12',
        'Explorer >= 9',
        'ExplorerMobile >= 9',
        'Firefox >= 40',
        'FirefoxAndroid >= 40',
        'iOS >= 7',
        'Safari >= 6'
      ]
    },
    'cssnano': {
      autoprefixer: false
    }
  }
})
