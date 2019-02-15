/**
 * 图标统一管理，方便后续替换
 */

let installed = false

const icons = {
  Deploy: '&#xe68a;',
  Setting: '&#xe623;',
  NewProject: '&#xe696;',
  ProjectManage: '&#xe60c;',
  Project: '&#xe60e;',
  Home: '&#xe611;',
  Delete: '&#xe6ea;',
  Task: '&#xe67f;',
  Start: '&#xe67b;',
  Stop: '&#xe810;'
}

export default {
  install(Vue) {
    if (installed) {
      return false
    }

    installed = true
    Vue.prototype.$icons = icons
    Vue.Icons = icons
  }
}
