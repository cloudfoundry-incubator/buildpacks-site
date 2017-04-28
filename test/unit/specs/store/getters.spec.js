import sinon from 'sinon'
import * as getters from '@/store/getters'

describe('store/getters.js', () => {
  describe('#buildpacks', () => {
    it('returns the buildpacks from state', () => {
      const buildpacks = sinon.spy()
      const actual = getters.buildpacks({ buildpacks })
      expect(actual).to.equal(buildpacks)
    })
  })
})

