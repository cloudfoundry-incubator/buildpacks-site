import Vue from 'vue'
import BuildpackTile from '@/components/BuildpackTile'
import router from '@/router'

describe('BuildpackTile.vue', () => {
  var vm, buildpack
  beforeEach(() => {
    buildpack = { id: 'multi', name: 'Multi Buildpack', repo: 'org/name', releases: [{name: 'v1.2.3', created_at: '2017-02-20'}, {name: 'v1.2.2', created_at: '2017-01-30'}] }

    const Constructor = Vue.extend(BuildpackTile)
    vm = new Constructor({ router, propsData: { buildpack } })
  })

  it('renders name', () => {
    vm.$mount()
    const text = vm.$el.textContent
    expect(text).to.contain('Multi Buildpack')
  })

  it('finds latest release', () => {
    vm.$mount()
    expect(vm.latestVersion.name).to.equal('v1.2.3')
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
