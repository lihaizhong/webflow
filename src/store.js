import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projectList: []
  },
  getters: {},
  mutations: {
    UPDATE_PROJECT_LIST(state, payload) {
      state.projectList = payload
    }
  },
  actions: {
    getProjectListAction() {},
    deleteProjectAction() {}
  }
})
