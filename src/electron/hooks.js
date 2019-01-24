function setHook(mainWindow, channel, ...args) {
  if (mainWindow) {
    mainWindow.webContents.send(channel, ...args)
  }
}

export function initBeforeQuitHook(mainWindow, ...args) {
  setHook(mainWindow, 'before-quit', ...args)
}
