// import fs from 'fs'
// import path from 'path'
import NodeSSH from 'node-ssh'

const ssh = new NodeSSH()

export default function initFtp(Bridge) {
  Bridge.prototype.ftp = function(options) {
    ssh
      .connect(options)
      .then(() => {
        ssh
          .putFile('', '')
          .then(() => {})
          .catch(() => {})
      })
      .catch(() => {})
  }
}
