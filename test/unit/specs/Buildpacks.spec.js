import Vue from 'vue'
import Buildpacks from '@/components/Buildpacks'

describe('Buildpacks.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Buildpacks)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
