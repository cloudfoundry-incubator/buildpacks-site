import Vue from 'vue'
import '@/filters'
import BuildpackDetail from '@/components/BuildpackDetail'
import router from '@/router'

describe('BuildpackDetail.vue', () => {
  var vm
  beforeEach(() => {
    const Constructor = Vue.extend(BuildpackDetail)
    const DependenciesTable = Vue.component('DependenciesTable', {
      render: function (createElement) {
        return createElement('div', 'DependenciesTableComponent')
      }
    })
    const SiblingVersionList = Vue.component('SiblingVersionList', {
      props: ['buildpack'],
      render: function (createElement) {
        return createElement('div', 'SiblingVersionListComponent')
      }
    })
    const buildpack = { id: 'ruby', name: 'Ruby Buildpack', description: 'Best Ever', repo: 'a/b' }
    router.push({ name: 'BuildpackDetail', params: { id: 'ruby', version: 'v3.2.1' } })
    vm = new Constructor({ router, propsData: { version: 'v3.2.1', buildpack }, components: { DependenciesTable, SiblingVersionList } }).$mount()
    vm.$mount()
  })

  it('renders buildpack name', () => {
    var name = vm.$el.querySelector('h1.name').textContent.trim()
    expect(name.replace(/\s+/g, ' ').trim()).to.equal('Ruby Buildpack v3.2.1')
  })

  it('renders buildpack description', () => {
    var desc = vm.$el.querySelector('p.description').textContent.trim()
    expect(desc.trim()).to.equal('Best Ever')
  })

  it('renders github link', () => {
    var link = vm.$el.querySelector('a.github')
    expect(link.getAttribute('href')).to.equal('https://github.com/a/b/releases/tag/v3.2.1')
  })

  it('renders SiblingVersionListComponent', () => {
    expect(vm.$el.textContent).to.contain('SiblingVersionListComponent')
  })

  it('renders DependenciesTable', () => {
    expect(vm.$el.textContent).to.contain('DependenciesTableComponent')
  })
})
