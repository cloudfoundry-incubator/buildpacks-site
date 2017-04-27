import Vue from 'vue'
import LiBuildpack from '@/components/LiBuildpack'
import router from '@/router'

describe('LiBuildpack.vue', () => {
  var vm
  beforeEach(() => {
    const Constructor = Vue.extend(LiBuildpack)
    vm = new Constructor({ router: router, propsData: { buildpack: { id: 'hwc', name: 'HWC Buildpack', repo: 'cloudfoundry-incubator/hwc-buildpack' } } }).$mount()
  })

  it('should link to the buildpack', () => {
    const el = vm.$el.querySelector('a.buildpack')
    expect(el.getAttribute('href')).to.equal('/buildpacks/hwc')
    expect(el.textContent).to.equal('HWC Buildpack')
  })

  it('should link to github', () => {
    const el = vm.$el.querySelector('a.github')
    expect(el.getAttribute('href')).to.equal('https://github.com/cloudfoundry-incubator/hwc-buildpack')
    expect(el.textContent).to.equal('Github')
  })
})
