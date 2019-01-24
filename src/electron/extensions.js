import installExtension, {
  EMBER_INSPECTOR,
  REACT_DEVELOPER_TOOLS,
  BACKBONE_DEBUGGER,
  JQUERY_DEBUGGER,
  ANGULARJS_BATARANG,
  VUEJS_DEVTOOLS,
  REDUX_DEVTOOLS,
  REACT_PERF,
  CYCLEJS_DEVTOOL,
  MOBX_DEVTOOLS,
  APOLLO_DEVELOPER_TOOLS
} from 'electron-devtools-installer'

export default function initExtensions(devtoolsList = []) {
  devtoolsList.forEach(type => {
    let devtools = null
    switch (type) {
      case 'EMBER_INSPECTOR':
        devtools = EMBER_INSPECTOR
        break
      case 'REACT_DEVELOPER_TOOLS':
        devtools = REACT_DEVELOPER_TOOLS
        break
      case 'BACKBONE_DEBUGGER':
        devtools = BACKBONE_DEBUGGER
        break
      case 'JQUERY_DEBUGGER':
        devtools = JQUERY_DEBUGGER
        break
      case 'ANGULARJS_BATARANG':
        devtools = ANGULARJS_BATARANG
        break
      case 'VUEJS_DEVTOOLS':
        devtools = VUEJS_DEVTOOLS
        break
      case 'REDUX_DEVTOOLS':
        devtools = REDUX_DEVTOOLS
        break
      case 'REACT_PERF':
        devtools = REACT_PERF
        break
      case 'CYCLEJS_DEVTOOL':
        devtools = CYCLEJS_DEVTOOL
        break
      case 'MOBX_DEVTOOLS':
        devtools = MOBX_DEVTOOLS
        break
      case 'APOLLO_DEVELOPER_TOOLS':
        devtools = APOLLO_DEVELOPER_TOOLS
        break
      default:
        devtools = null
    }

    if (devtools) {
      installExtension(devtools)
        .then(name => console.log(`添加扩展工具：${name}`))
        .catch(error => console.error(`An Error Occurred`, error))
    }
  })
}
