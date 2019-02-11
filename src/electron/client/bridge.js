import { ipcRenderer as ipc } from 'electron'
import * as shell from 'shelljs'
import initShell from './shell'
import initDialog from './dialog'

const { which } = shell

shell.config.execPath = (
  which('node') ||
  which('nodejs') ||
  process.execPath ||
  ''
).toString()

const Bridge = function() {}

/**
 * @static Worker存储器
 */
Bridge.WorkerStore = new Array()

/**
 * @static 添加Worker
 * @param {Object} worker 工作进程
 */
Bridge.pushWorkerStore = function(worker) {
  let store = []
  Bridge.WorkerStore.push(worker)
  // 移除已结束的worker
  Bridge.WorkerStore.forEach(worker => worker.killed || store.push(worker))
  // 重置worker管理器
  Bridge.WorkerStore = store
}

initShell(Bridge)
initDialog(Bridge)

const bridge = (window.bridge = new Bridge())

// 再退出应用前关闭所有正在工作的worker
ipc.on('before-quit', () => {
  Bridge.WorkerStore.forEach(worker => bridge.kill(worker))
})

console.info('bridge脚本注入成功！')
