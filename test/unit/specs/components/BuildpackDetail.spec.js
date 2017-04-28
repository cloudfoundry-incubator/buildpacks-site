import Vue from 'vue'
import Vuex from 'vuex'
import BuildpackDetail from '@/components/BuildpackDetail'
import router from '@/router'
import { match } from 'sinon'

describe('BuildpackDetail.vue', () => {
  var vm, loadRepoData
  beforeEach(() => {
    loadRepoData = sinon.spy()
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
    const store = new Vuex.Store({
      state: {
        buildpacks: [
          { id: 'go', name: 'Go Buildpack' },
          { id: 'ruby', name: 'Ruby Buildpack', description: 'Best Ever', repo: 'a/b' }
        ]
      },
      actions: { loadRepoData }
    })
    router.push({ name: 'BuildpackDetail', params: { id: 'ruby', version: 'v3.2.1' } })
    vm = new Constructor({ router, store, propsData: { version: 'v3.2.1' }, components: { DependenciesTable, SiblingVersionList } }).$mount()
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

  it('calls loadRepoData upon creation', () => {
    expect(loadRepoData).to.have.been.calledWithMatch(match.any, 'ruby', match.any)
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
