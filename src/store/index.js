import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    onStatus:0,
    offStatus:0
  },
  mutations: {
    addOn(state,num){
      state.onStatus+=num
    },
    resetOn(state){
      state.onStatus=0
    }
  },
  actions: {
  },
  modules: {
  }
})
