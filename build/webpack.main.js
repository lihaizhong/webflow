const path = require('path')
const os = require('os')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const __root = path.resolve(__dirname, '..')

module.exports = {
  devtool: 'source-map',
  target: 'electron-main',
  mode: 'none',
  entry: path.resolve(__root, 'src/electron/main.js'),
  output: {
    path: path.resolve(__root, 'dist/electron'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  parallelism: os.cpus().length,
  node: {
    __dirname: false,
    __filename: false
  },
  optimization: {
    flagIncludedChunks: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    noEmitOnErrors: true,
    concatenateModules: true,
    // namedModules: true,
    // namedChunks: true,
    nodeEnv: process.env.NODE_ENV || 'production',
    // splitChunks: {
    //   chunks: 'all',
    //   name: 'common'
    // },
    // runtimeChunk: {
    //   name: 'runtime'
    // },
    minimize: process.env.NODE_ENV === 'production'
  },
  plugins: [new CleanWebpackPlugin('dist/electron', { root: __root })]
}
