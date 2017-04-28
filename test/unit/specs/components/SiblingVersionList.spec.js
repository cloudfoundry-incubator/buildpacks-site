import Vue from 'vue'
import Vuex from 'vuex'
import SiblingVersionList from '@/components/SiblingVersionList'
import router from '@/router'
import { nodeListMap } from '../../helpers'
import { match } from 'sinon'

describe('SiblingVersionList.vue', () => {
  var vm, propsData, loadReleases
  beforeEach(() => {
    propsData = { id: 'multi', versions: ['v1.2.3', 'v1.2.2'] }
    loadReleases = sinon.spy()

    const Constructor = Vue.extend(SiblingVersionList)
    const store = new Vuex.Store({ actions: { loadReleases } })
    vm = new Constructor({ router, store, propsData })
  })

  it('renders versions', () => {
    vm.$mount()
    var links = nodeListMap(
      vm.$el.querySelectorAll('a.link'),
      el => el.textContent.trim()
    )

    expect(links).to.deep.equal(['v1.2.3', 'v1.2.2'])
  })

  it('renders links', () => {
    vm.$mount()
    var links = nodeListMap(
      vm.$el.querySelectorAll('a.link'),
      el => el.getAttribute('href')
    )

    expect(links).to.deep.equal([
      '/buildpacks/multi/v1.2.3',
      '/buildpacks/multi/v1.2.2'
    ])
  })

  it('calls loadReleases upon creation', () => {
    vm.$mount()
    expect(loadReleases).to.have.been.calledWithMatch(match.any, 'multi', match.any)
  })
})
