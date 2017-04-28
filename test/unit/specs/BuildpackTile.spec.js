import Vue from 'vue'
import BuildpackTile from '@/components/BuildpackTile'
import router from '@/router'

describe('BuildpackTile.vue', () => {
  var vm
  beforeEach(() => {
    const fetch = (url, resolve, reject) => {
      resolve([{tag_name: 'v1.3.2'}, {tag_name: 'v1.2.1'}])
    }
    const Constructor = Vue.extend(BuildpackTile)
    vm = new Constructor({ router, fetch, propsData: { buildpack: { id: 'hwc', name: 'HWC Buildpack', repo: 'cloudfoundry-incubator/hwc-buildpack' } } }).$mount()
  })

  it('should link to the buildpack details page', () => {
    const el = vm.$el.querySelector('a.latestversion')
    expect(el.getAttribute('href')).to.equal('/buildpacks/hwc/v1.3.2')
  })

  it('shows the latest version', () => {
    const el = vm.$el.querySelector('a.latestversion')
    expect(el.textContent).to.contain('v1.3.2')
  })

  it('should link to github', () => {
    const el = vm.$el.querySelector('a.github')
    expect(el.getAttribute('href')).to.equal('https://github.com/cloudfoundry-incubator/hwc-buildpack/releases/tag/v1.3.2')
    expect(el.textContent).to.contain('GitHub')
  })
})
