import path from 'path'
import * as DataStore from 'nedb'

let LocalStoreManager = {}
let SessionStoreManager = {}

let globalSettings = {
  path: './db',
  autoload: true
}

/**
 * 全局配置
 * @param {object} config 配置信息
 */
export function setConfig(config) {
  globalSettings = Object.assign({}, globalSettings, config)
}

/**
 * 创建一个本地存储器
 * @param {string} collection 集合名称
 * @param {object} options 集合配置
 */
export function createLocalStore(collection, options) {
  let store = LocalStoreManager[collection]

  if (store) {
    return LocalStoreManager
  }

  const config = Object.assign({}, globalSettings, options, {
    inMemoryOnly: true
  })
  const dbpath = path.join(config.path, `${collection}.db`)

  delete config.path
  delete config.filename

  store = new DataStore({
    filename: dbpath,
    ...config
  })
  LocalStoreManager[collection] = store

  return LocalStoreManager
}

/**
 * 创建一个缓存存储器
 * @param {string} collection 集合名称
 * @param {object} options 集合配置
 */
export function createSessionStore(collection, options) {
  let store = SessionStoreManager[collection]

  if (store) {
    return SessionStoreManager
  }

  const config = Object.assign({}, globalSettings, options)

  delete config.path
  delete config.filename
  delete config.autoload

  store = new DataStore(config)
  SessionStoreManager[collection] = store

  return SessionStoreManager
}

export default {
  setConfig,
  createLocalStore,
  createSessionStore
}
