const DBOpenRequest = window.indexedDB.open('webflow', 1)

let db = null
let readyList = []

function triggerReadyCallback(db) {
  readyList.forEach(callback => {
    callback(db)
  })
  readyList = []
}

DBOpenRequest.onerror = event => {
  console.error('数据库打开错误', DBOpenRequest.error, event)
}

DBOpenRequest.onerror = event => {
  console.info('数据库打开成功', event)
  db = DBOpenRequest.result
  triggerReadyCallback(db)
}

DBOpenRequest.onupgradeneeded = event => {
  console.info('数据库升级成功', event)
  db = event.target.result
  triggerReadyCallback(db)
}

DBOpenRequest.onblocked = event => {
  console.warn('数据库已经建立过连接', event)
}

export default function ready(callback) {
  if (typeof callback === 'function') {
    db ? callback(db) : readyList.push(callback)
  }
}
