import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      // console.log(state)
      state.counter++
    }
  },
  actions: {
    add({ commit }) {
      // console.log(params)
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  modules: {}
})
