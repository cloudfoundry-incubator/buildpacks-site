import Vue from 'vue'
import BuildpackIndex from '@/components/BuildpackIndex'
import router from '@/router'

describe('BuildpackIndex.vue', () => {
  var vm
  beforeEach(() => {
    const Constructor = Vue.extend(BuildpackIndex)
    const fetch = (url, resolve, reject) => {}
    const BuildpackTile = Vue.component('BuildpackTile', {
      props: ['buildpack'],
      render: function (createElement) {
        return createElement('div', { class: 'buildpack' }, this.buildpack.name)
      }
    })
    vm = new Constructor({ router, fetch, components: { BuildpackTile } }).$mount()
  })

  it('should render list', () => {
    expect(vm.$el.querySelectorAll('div.buildpack'))
      .to.have.length.above(8)
  })

  it('should list buildpack names', () => {
    const text = vm.$el.textContent
    expect(text).to.contain('Go Buildpack')
    expect(text).to.contain('Ruby Buildpack')
  })
})
