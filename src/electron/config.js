import path from 'path'
import url from 'url'

export default {
  width: 400,
  height: 600,
  title: 'webflow',
  resizable: false,
  maximizable: false,
  titleBarStyle: 'hidden',
  preload: path.join(__dirname, 'client/bridge.js'),
  nodeIntegration: false,
  plugins: true,
  dev: {
    url: url.format({
      pathname: 'localhost:8080',
      protocol: 'http',
      slashes: true
    })
  },
  build: {
    url: url.format({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    })
  }
}
