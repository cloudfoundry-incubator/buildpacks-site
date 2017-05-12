import Vue from 'vue'
import DependenciesTable from '@/components/DependenciesTable'
import router from '@/router'
import moment from 'moment'

describe('DependenciesTable.vue', () => {
  var vm, propsData
  context('multiple versions per line', () => {
    beforeEach(() => {
      propsData = { dependencies: [
        { name: 'ruby', version: '2.1.2' },
        { name: 'ruby', version: '2.1.3' },
        { name: 'ruby', version: '2.2.5' },
        { name: 'jruby', version: 'ruby-2.0.0-jruby-1.7.26' },
        { name: 'ruby', version: '2.2.4' },
        { name: 'node', version: '2.2.4' }
      ] }

      const Constructor = Vue.extend(DependenciesTable)
      vm = new Constructor({ router, propsData })
    })

    it('filters regular dependencies', () => {
      expect(vm.regularDependencies).to.deep.equal([
        { name: 'ruby', version: '2.1.3' },
        { name: 'ruby', version: '2.2.5' },
        { name: 'jruby', version: 'ruby-2.0.0-jruby-1.7.26' },
        { name: 'node', version: '2.2.4' }
      ])
    })

    it('filters outdated dependencies', () => {
      expect(vm.outdatedDependencies).to.deep.equal([
        { name: 'ruby', version: '2.1.2' },
        { name: 'ruby', version: '2.2.4' }
      ])
    })
  })

  context('deprecated dependencies', () => {
    var ruby, nodejs
    beforeEach(() => {
      ruby = { name: 'ruby', version: '2.1.2', eol: moment().add(2, 'days').format('YYYY-MM-DD') }
      nodejs = { name: 'node', version: '2.2.5', eol: moment().subtract(2, 'days').format('YYYY-MM-DD') }
      propsData = { dependencies: [ ruby, nodejs ] }

      const Constructor = Vue.extend(DependenciesTable)
      vm = new Constructor({ router, propsData })
    })

    it('filters regular dependencies', () => {
      expect(vm.regularDependencies).to.deep.equal([ ruby ])
    })

    it('filters old expired dates into outdated', () => {
      expect(vm.outdatedDependencies).to.deep.equal([ nodejs ])
    })
  })
})
