// https://cli.vuejs.org/zh/config/
const path = require('path')

console.log(`当前环境：${process.env.NODE_ENV}`)

module.exports = {
  publicPath: '',
  productionSourceMap: false,
  parallel: true,
  css: {
    loaderOptions: {
      less: {
        noIeCompat: true,
        globalVars: {
          env: process.env.NODE_ENV || 'development'
        },
        resources: [path.resolve(__dirname, 'src/styles/theme.less')]
      }
    }
  }
}
