import Vue from 'vue'
import BuildpackIndex from '@/components/BuildpackIndex'
import router from '@/router'

describe('BuildpackIndex.vue', () => {
  var vm
  beforeEach(() => {
    const Constructor = Vue.extend(BuildpackIndex)
    const BuildpackTile = Vue.component('BuildpackTile', {
      props: ['buildpack'],
      render: function (createElement) {
        return createElement('div', { class: 'BuildpackTile' }, this.buildpack.name)
      }
    })
    const buildpacks = [ { name: 'Go Buildpack' }, { name: 'Ruby Buildpack' }, { name: 'Multi Buildpack' } ]
    vm = new Constructor({ router, propsData: { buildpacks }, components: { BuildpackTile } }).$mount()
  })

  it('renders buildpack names', () => {
    const text = vm.$el.textContent
    expect(text).to.contain('Go Buildpack')
    expect(text).to.contain('Ruby Buildpack')
    expect(text).to.contain('Multi Buildpack')
  })
})
