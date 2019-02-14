import { exec } from 'shelljs'
import { shell } from 'electron'

export default function initShell(Bridge) {
  /**
   * @exports 执行shell指令
   * @param {string} command shell指令
   * @param {object} options exec参数
   * @param {function} callback 回调函数
   * @return {object} worker worker实例
   */
  Bridge.prototype.exec = function(command, options = {}, callback) {
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
    Bridge.pushWorkerStore(worker)
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
  }

  /**
   * @exports 杀死指定进程
   * @param {Object} Worker
   */
  Bridge.prototype.kill = function(worker) {
    // 断开连接
    worker.connected && worker.disconnect()
    // 杀死进程
    worker.killed || worker.kill('SIGINT')
  }

  Bridge.prototype.openExternal = function(url) {
    shell.openExternal(url)
  }
}
