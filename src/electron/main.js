import url from 'url'
import path from 'path'
import { BrowserWindow, app, globalShortcut } from 'electron'
import { initBeforeQuitHook } from './hooks'
import initExtensions from './extensions'
import initControllers from './controllers'
import DataStore from './db'

let mainWindow = null

// 创建主窗口
function createWindow() {
  // 创建主窗口
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    center: true,
    show: false,
    resizable: false,
    maximizable: false,
    title: 'webflow',
    titleBarStyle: 'hiddenInset',
    webPreferences: { nodeIntegration: true }
  })

  if (process.env.NODE_ENV === 'development') {
    // 打开开发者工具
    initExtensions(['VUEJS_DEVTOOLS'])
    mainWindow.webContents.openDevTools()
  }

  // 初始化Controllers
  initControllers()
  // 设置全局配置
  DataStore.setConfig({})

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('close', () => {
    mainWindow = null
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(
      url.format({
        pathname: 'localhost:8080',
        protocol: 'http',
        slashes: true
      })
    )
  } else {
    // 载入html文件
    mainWindow.loadURL(
      url.format({
        pathname: path.resolve(__dirname, '../client', 'index.html'),
        protocol: 'file',
        slashes: true
      })
    )
  }
}

// 创建窗口时，调用这个函数
app.on('ready', createWindow)

app.on('will-quit', () => {
  initBeforeQuitHook(mainWindow)
  globalShortcut.unregisterAll()
})

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
  // 在macOS上，除非用户用`cmd + Q`确定地退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，通常在应用程序中重新创建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})
