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
Bridge.BridgeStore = new Map()

/**
 * @static 添加Worker
 * @param {Object} worker 工作进程
 * @param {Object} bridge Bridge实例
 */
Bridge.pushWorkerStore = function(worker, bridge) {
  const workerStore = Bridge.BridgeStore.get(bridge)
  let store = []
  // 添加新任务
  workerStore.push(worker)
  // 移除已结束的worker
  workerStore.forEach(worker => worker.killed || store.push(worker))
  // 重置worker管理器
  Bridge.BridgeStore.set(bridge, store)
}

initShell(Bridge)
initDialog(Bridge)

// 再退出应用前关闭所有正在工作的worker
ipc.on('before-quit', () => {
  Bridge.BridgeStore.forEach((workerStore, bridge) => {
    workerStore.forEach(worker => bridge.kill(worker))
  })
})

window.getNewBridgeInstance = function() {
  const bridge = new Bridge()
  Bridge.BridgeStore.set(bridge, [])

  return bridge
}

console.info('bridge脚本注入成功！')
