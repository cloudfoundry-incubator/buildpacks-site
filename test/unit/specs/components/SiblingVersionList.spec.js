import Vue from 'vue'
import SiblingVersionList from '@/components/SiblingVersionList'
import router from '@/router'
import { nodeListMap } from '../../helpers'

describe('SiblingVersionList.vue', () => {
  var vm, propsData
  beforeEach(() => {
    propsData = { id: 'multi', versions: ['v1.2.3', 'v1.2.2'] }

    const Constructor = Vue.extend(SiblingVersionList)
    vm = new Constructor({ router, propsData })
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
})
