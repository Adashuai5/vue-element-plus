import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTableData: {}
  },
  mutations: {
    SET_TABLE_DATA(state, { type, data }) {
      state.currentTableData[type] = data
    }
  },
  actions: {
  },
  modules: {
  }
})
