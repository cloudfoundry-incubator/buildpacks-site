import Vue from 'vue'
import DependenciesIndex from '@/components/DependenciesIndex'
import router from '@/router'
import vSelect from 'vue-select'

describe('DependenciesIndex.vue', () => {
  var vm, buildpacks, Constructor
  beforeEach(() => {
    buildpacks = [
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
    Constructor = Vue.extend(DependenciesIndex)
    vm = new Constructor({ router, propsData: { buildpacks, primaryDeps: ['node', 'ruby'] }, components: { vSelect } }).$mount()
  })

  it('the search bar filter has been populated with the dependencies list', () => {
    expect(vm.dependencies).to.deep.equal([
      { name: 'bundler', version: '0.23.3', label: 'bundler - 0.23.3' },
      { name: 'node', version: '2.0.1', label: 'node - 2.0.1' },
      { name: 'node', version: '2.0.0', label: 'node - 2.0.0' },
      { name: 'ruby', version: '2.2.1', label: 'ruby - 2.2.1' }
    ])
  })

  it('categorize returns buildpack/version categorized by dependency', () => {
    expect(vm.categorize).to.deep.equal({
      bundler: {
        '0.23.3': {
          ruby: 'v5.6.8'
        }
      },
      node: {
        '2.0.0': {
          node: 'v4.5.6',
          ruby: 'v5.6.7'
        },
        '2.0.1': {
          node: 'v4.5.7'
        }
      },
      ruby: {
        '2.2.1': {
          ruby: 'v5.6.7'
        }
      }
    })
  })

  it('returns primary dependencies', () => {
    expect(vm.primary).to.deep.equal([
      {
        name: 'node',
        buildpacks: [
          { depVersion: '2.0.1', bpID: 'node', bpName: 'Node Buildpack', bpVersion: 'v4.5.7' },
          { depVersion: '2.0.0', bpID: 'node', bpName: 'Node Buildpack', bpVersion: 'v4.5.6' },
          { depVersion: '2.0.0', bpID: 'ruby', bpName: 'Ruby Buildpack', bpVersion: 'v5.6.7' }
        ]
      }, {
        name: 'ruby',
        buildpacks: [
          { depVersion: '2.2.1', bpID: 'ruby', bpName: 'Ruby Buildpack', bpVersion: 'v5.6.7' }
        ]
      }
    ])
  })

  context('a primary dependency is not in the dataset', () => {
    beforeEach(() => {
      vm = new Constructor({ router, propsData: { buildpacks, primaryDeps: ['node', 'missing', 'ruby'] }, components: { vSelect } }).$mount()
    })
    it('returns an empty dependency', () => {
      expect(vm.primary).to.deep.equal([
        {
          name: 'node',
          buildpacks: [
            { depVersion: '2.0.1', bpID: 'node', bpName: 'Node Buildpack', bpVersion: 'v4.5.7' },
            { depVersion: '2.0.0', bpID: 'node', bpName: 'Node Buildpack', bpVersion: 'v4.5.6' },
            { depVersion: '2.0.0', bpID: 'ruby', bpName: 'Ruby Buildpack', bpVersion: 'v5.6.7' }
          ]
        }, {
          name: 'missing',
          buildpacks: []
        }, {
          name: 'ruby',
          buildpacks: [
            { depVersion: '2.2.1', bpID: 'ruby', bpName: 'Ruby Buildpack', bpVersion: 'v5.6.7' }
          ]
        }
      ])
    })
  })

  it('returns secondary dependencies', () => {
    expect(vm.secondary).to.deep.equal([
      {
        name: 'bundler',
        buildpacks: [
          { depVersion: '0.23.3', bpID: 'ruby', bpName: 'Ruby Buildpack', bpVersion: 'v5.6.8' }
        ]
      }
    ])
  })
})
