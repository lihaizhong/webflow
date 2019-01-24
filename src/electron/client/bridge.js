import { ipcRenderer } from 'electron'
import { exec } from 'shelljs'

let WorkerStore = []
let ApiStore = {}

function pushWorkerStore(worker) {
  let store = []
  WorkerStore.push(worker)
  // 移除已结束的worker
  WorkerStore.forEach(worker => {
    if (!worker.killed) {
      store.push(worker)
    }
  })

  WorkerStore = store
}

const bridge = {
  /**
   * 执行shell指令
   * @param {string} command shell指令
   * @param {object} options exec参数
   * @param {function} callback 回调函数
   * @return {object} worker worker实例
   */
  exec(command, options = {}, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    if (typeof callback !== 'function') {
      callback = function() {}
    }

    if (typeof options.async !== 'boolean') {
      options.async = true
    }

    // 创建一个子进程
    const worker = exec(command, options)
    // 将worker推入管理器中
    pushWorkerStore(worker)

    // 监听指令内容信息
    worker.stdout.on('data', data =>
      callback(null, { type: 'stdout', data: data, worker })
    )
    // 监听指令错误信息
    worker.stderr.on('data', data =>
      callback(null, { type: 'stderr', data: data, worker })
    )
    // 监听自己进程的关闭
    worker.on('exit', (code, signal) =>
      callback(null, { type: 'exit', code, signal })
    )
    // 监听进程关闭
    worker.on('close', (code, signal) =>
      callback(null, { type: 'close', code, signal })
    )
    // 监听错误信息
    worker.on('error', error => callback(error, null))

    return worker
  },
  kill(worker) {
    worker.connected && worker.disconnect()
    worker.killed || worker.kill('SIGINT')
  },
  request(payload, callback) {
    if (!payload.method) {
      throw new Error(`method不能为空`)
    }

    if (typeof callback !== 'function') {
      callback = function() {}
    }

    ApiStore[payload.method] = callback
    ipcRenderer.send('request-api', payload)
  }
}

export default {
  install(Vue) {
    // 再退出应用前关闭所有正在工作的worker
    ipcRenderer.on('before-quit', () => {
      WorkerStore.forEach(worker => bridge.kill(worker))
    })

    // 接收消息
    ipcRenderer.on('response-api', (event, response) => {
      const method = ApiStore[response.method]
      delete ApiStore[response.method]
      method && method(response, event)
    })

    Vue.prototype.$bridge = bridge
    Vue.Bridge = bridge
  }
}
