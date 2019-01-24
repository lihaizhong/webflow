// https://cli.vuejs.org/zh/config/
const path = require('path')

module.exports = {
  publicPath: '',
  productionSourceMap: false,
  outputDir: path.resolve(__dirname, 'dist/client'),
  configureWebpack: config => {
    config.target = 'electron-renderer'
  }
}
