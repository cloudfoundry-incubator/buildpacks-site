import Vue from 'vue'
import Buildpacks from '@/components/Buildpacks'
import router from '@/router'

describe('Buildpacks.vue', () => {
  var vm
  beforeEach(() => {
    const Constructor = Vue.extend(Buildpacks)
    vm = new Constructor({ router: router }).$mount()
  })

  it('should render list', () => {
    expect(vm.$el.querySelectorAll('li'))
      .to.have.length.above(8)
  })

  it('should list buildpack names', () => {
    const text = vm.$el.querySelector('ul').textContent
    expect(text).to.contain('Go Buildpack')
    expect(text).to.contain('Ruby Buildpack')
  })

  it('should list github', () => {
    const text = vm.$el.querySelector('ul').textContent
    expect(text).to.contain('Github')
  })
})
