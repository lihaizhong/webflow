import { ipcRenderer as ipc } from 'electron'

export default function initLog(Bridge) {
  let timer = null
  let messageList = []

  function sendMessage(message) {
    messageList.push(message)

    if (!timer) {
      timer = setTimeout(() => {
        let collection = messageList
        messageList = []
        ipc.send('log', collection)
      })
    }
  }
  Bridge.prototype.log = function(message) {
    if (message instanceof Error) {
      sendMessage(message.stack)
    } else if (typeof message === 'function') {
      sendMessage(message.toString())
    } else if (
      typeof message === 'string' ||
      typeof message === 'number' ||
      typeof message === 'boolean' ||
      message === null ||
      message === undefined
    ) {
      sendMessage(message)
    } else {
      sendMessage(JSON.stringify(message))
    }
  }
}
