import { BrowserWindow, app, globalShortcut } from 'electron'
import config from './config'
import { initBeforeQuitHook } from './hooks'
import initExtensions from './extensions'

let mainWindow = null

// 创建主窗口
function createWindow() {
  // 创建主窗口
  mainWindow = new BrowserWindow({
    title: config.title,
    width: config.width,
    height: config.height,
    center: true,
    show: true,
    resizable: config.resizable,
    maximizable: config.maximizable,
    titleBarStyle: config.titleBarStyle,
    allowRunningInsecureContent: process.env.NODE_ENV !== 'production',

    webPreferences: {
      preload: config.preload,
      nodeIntegration: config.nodeIntegration,
      plugins: config.plugins,
      contextIsolation: false
    }
  })

  if (process.env.NODE_ENV === 'development') {
    // 打开开发者工具
    initExtensions(['VUEJS_DEVTOOLS'])
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', () => {
    mainWindow = null
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(config.dev.url)
  } else {
    mainWindow.loadURL(config.build.url)
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
