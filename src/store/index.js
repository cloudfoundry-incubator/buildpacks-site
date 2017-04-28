import Vue from 'vue'
import Vuex from 'vuex'
import data from '../data'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const extra = { releases: [], description: null }
const state = {
  buildpacks: data.map(b => { return { ...b, ...extra } }),
  manifests: {},
  error: null
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: true
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
