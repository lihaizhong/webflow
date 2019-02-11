import { ipcMain as ipc } from 'electron'
import ProjectController from './ProjectController'

const ControllerManager = {}
const controllers = [ProjectController]

controllers.forEach(Controller => {
  ControllerManager[Controller.name] = new Controller()
})

export default function initControllers() {
  ipc.on('request-api', (event, request) => {
    try {
      const methods = (request.method || '').split('.')
      const className = methods[0]
      const methodName = methods[1]
      const instance = ControllerManager[className]
      let response = {
        method: request.method
      }
      instance[methodName](request.data)
        .then(result => {
          response.data = result
          event.returnValue = response
          event.sender.webContents.send('response-api', response)
        })
        .catch(err => {
          throw err
        })
    } catch (ex) {
      throw ex
    }
  })
}
