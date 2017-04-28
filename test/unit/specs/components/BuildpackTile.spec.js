import Vue from 'vue'
import Vuex from 'vuex'
import BuildpackTile from '@/components/BuildpackTile'
import router from '@/router'

describe('BuildpackTile.vue', () => {
  var vm, buildpack, loadReleases
  beforeEach(() => {
    buildpack = { id: 'multi', name: 'Multi Buildpack', repo: 'org/name', releases: ['v1.2.3', 'v1.2.2'] }
    loadReleases = sinon.spy()

    const Constructor = Vue.extend(BuildpackTile)
    const store = new Vuex.Store({ actions: { loadReleases } })
    vm = new Constructor({ router, store, propsData: { buildpack } })
  })

  it('renders name', () => {
    vm.$mount()
    const text = vm.$el.textContent
    expect(text).to.contain('Multi Buildpack')
  })

  it('finds latest release', () => {
    vm.$mount()
    expect(vm.latestVersion).to.equal('v1.2.3')
  })

  it('interpolates Github URL', () => {
    vm.$mount()
    expect(vm.githubUrl).to.equal('https://github.com/org/name/releases/tag/v1.2.3')
  })

  context('releases is empty', () => {
    beforeEach(() => {
      buildpack.releases = []
    })

    it('returns latest release as false', () => {
      vm.$mount()
      expect(vm.latestVersion).to.equal(false)
    })
  })
})

