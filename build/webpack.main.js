const path = require('path')
const os = require('os')

const __root = path.resolve(__dirname, '..')

const jsRules = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                electron: '4.0.1'
              },
              useBuiltIns: 'entry',
              modules: false
            }
          ]
        ],
        plugins: [
          ['@babel/plugin-transform-runtime', { corejs: 2 }],
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      }
    }
  ]
}

module.exports = [
  {
    devtool: 'source-map',
    target: 'electron-main',
    mode: 'none',
    entry: path.resolve(__root, 'src/electron/main.js'),
    output: {
      path: path.resolve(__root, 'dist'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [jsRules]
    },
    parallelism: os.cpus().length,
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
    node: {
      __dirname: false,
      __filename: false
    }
  },
  {
    devtool: 'source-map',
    target: 'electron-renderer',
    mode: 'none',
    entry: {
      bridge: path.resolve(__root, 'src/electron/client/bridge.js')
    },
    output: {
      path: path.resolve(__root, 'dist/client'),
      filename: '[name].js',
      pathinfo: process.env.NODE_ENV === 'production'
    },
    module: {
      rules: [jsRules]
    },
    parallelism: os.cpus().length,
    optimization: {
      flagIncludedChunks: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      noEmitOnErrors: true,
      concatenateModules: true,
      nodeEnv: process.env.NODE_ENV || 'production',
      minimize: process.env.NODE_ENV === 'production',
      runtimeChunk: false
    },
    node: {
      __dirname: false,
      __filename: false
    }
  }
]
