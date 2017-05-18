import Vue from 'vue'
import DependenciesIndex from '@/components/DependenciesIndex'
import router from '@/router'
import Multiselect from 'vue-multiselect'

describe('DependenciesIndex.vue', () => {
  var vm
  beforeEach(() => {
    const Constructor = Vue.extend(DependenciesIndex)
    const buildpacks = [
      {
        id: 'node',
        name: 'Node Buildpack',
        releases: [{
          name: 'v4.5.6',
          dependencies: [{
            name: 'node',
            version: '2.0.1'
          }, {
            name: 'node',
            version: '2.0.0'
          }]
        }, {
          name: 'v4.5.7',
          dependencies: [{
            name: 'node',
            version: '2.0.1'
          }]
        }, {
          name: 'v4.5.5',
          dependencies: [{
            name: 'node',
            version: '2.0.1'
          }]
        }]
      }, {
        id: 'ruby',
        name: 'Ruby Buildpack',
        releases: [{
          name: 'v5.6.7',
          dependencies: [{
            name: 'ruby',
            version: '2.2.1'
          }, {
            name: 'node',
            version: '2.0.0'
          }]
        }, {
          name: 'v5.6.8',
          dependencies: [{
            name: 'bundler',
            version: '0.23.3'
          }]
        }]
      }
    ]
    vm = new Constructor({ router, propsData: { buildpacks, primaryDeps: ['node', 'ruby'] }, components: { Multiselect } }).$mount()
  })

  it('the search bar filter has been populated with the dependencies list', () => {
    expect(vm.dependencies).to.deep.equal([
      { name: 'bundler', version: '0.23.3' },
      { name: 'node', version: '2.0.1' },
      { name: 'node', version: '2.0.0' },
      { name: 'ruby', version: '2.2.1' }
    ])
  })

  it('categorize returns buildpack/version categorized by dependency', () => {
    expect(vm.categorize).to.deep.equal({
      bundler: {
        '0.23.3': {
          ruby: '5.6.8'
        }
      },
      node: {
        '2.0.0': {
          node: '4.5.6',
          ruby: '5.6.7'
        },
        '2.0.1': {
          node: '4.5.7'
        }
      },
      ruby: {
        '2.2.1': {
          ruby: '5.6.7'
        }
      }
    })
  })

  it('returns primary dependencies', () => {
    expect(vm.primary).to.deep.equal([
      {
        name: 'node',
        buildpacks: [
          { depVersion: '2.0.1', bpID: 'node', bpName: 'Node Buildpack', bpVersion: '4.5.7' },
          { depVersion: '2.0.0', bpID: 'node', bpName: 'Node Buildpack', bpVersion: '4.5.6' },
          { depVersion: '2.0.0', bpID: 'ruby', bpName: 'Ruby Buildpack', bpVersion: '5.6.7' }
        ]
      }, {
        name: 'ruby',
        buildpacks: [
          { depVersion: '2.2.1', bpID: 'ruby', bpName: 'Ruby Buildpack', bpVersion: '5.6.7' }
        ]
      }
    ])
  })
})