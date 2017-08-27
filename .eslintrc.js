module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: '2017',
    sourceType:'module'
  },
  plugins: [
    'html'
  ],
  extends: [
    'standard',
    'plugin:vue/recommended'
  ]
}
