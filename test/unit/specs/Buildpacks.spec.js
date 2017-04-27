import Vue from 'vue'
import Buildpacks from '@/components/Buildpacks'
import router from '@/router'

describe('Buildpacks.vue', () => {
  var vm
  beforeEach(() => {
    const Constructor = Vue.extend(Buildpacks)
    const fetch = (url, resolve, reject) => {}
    const buildpack = Vue.component('buildpack', {
      props: ['buildpack'],
      render: function (createElement) {
        return createElement('div', { class: 'buildpack' }, this.buildpack.name)
      }
    })
    vm = new Constructor({ router, fetch, components: { buildpack } }).$mount()
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
