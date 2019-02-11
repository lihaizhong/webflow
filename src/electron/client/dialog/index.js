import { remote } from 'electron'

const { dialog } = remote

export default function initDialog(Bridge) {
  /**
   * @exports 打开系统对话框
   * @param {String} buttonLabel 按钮描述
   * @param {Array} properties 系统对话框配置
   */
  Bridge.prototype.openDialog = function(
    buttonLabel = '添加项目',
    properties = ['openDirectory', 'createDirectory']
  ) {
    return new Promise(resolve => {
      dialog.showOpenDialog(
        null,
        {
          properties,
          buttonLabel
        },
        filePaths => resolve(filePaths)
      )
    })
  }
}
