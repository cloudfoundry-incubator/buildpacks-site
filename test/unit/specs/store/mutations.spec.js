// import sinon from 'sinon'
import * as mutations from '@/store/mutations'

describe('store/mutations.js', () => {
  describe('#setReleases', () => {
    const buildpacks = [
      { id: 'go', name: 'Go', releases: [] },
      { id: 'multi', name: 'Multi', releases: [] },
      { id: 'ruby', name: 'Ruby', releases: [] }
    ]

    it('sets a new buildpacks array with release', () => {
      var state = { buildpacks }
      expect(state.buildpacks).to.eq(buildpacks)

      mutations.setReleases(state, { id: 'multi', data: [{ tag_name: 'v1.2.3' }] })

      expect(state.buildpacks).to.not.eq(buildpacks)
      expect(state.buildpacks.length).to.eq(3)
      expect(state.buildpacks.map(b => b.id)).to.deep.eq(['go', 'multi', 'ruby'])
      expect(state.buildpacks.map(b => b.releases)).to.deep.eq([ [], ['v1.2.3'], [] ])
    })
  })

  describe('#setRepoData', () => {
    const buildpacks = [
      { id: 'go', name: 'Go', releases: [], description: 'desc1' },
      { id: 'multi', name: 'Multi', releases: [], description: 'desc2' },
      { id: 'ruby', name: 'Ruby', releases: [], description: 'desc3' }
    ]

    it('sets a new buildpacks array with release', () => {
      var state = { buildpacks }
      expect(state.buildpacks).to.eq(buildpacks)

      mutations.setRepoData(state, { id: 'multi', data: { somegthing: 'else', description: 'Repo is fantastic' } })

      expect(state.buildpacks).to.not.eq(buildpacks)
      expect(state.buildpacks.map(b => b.id)).to.deep.eq(['go', 'multi', 'ruby'])
      expect(state.buildpacks.map(b => b.description)).to.deep.eq([ 'desc1', 'Repo is fantastic', 'desc3' ])
    })
  })

  describe('#setManifest', () => {
    it('sets a new buildpacks array with release', () => {
      const manifests = {}
      var state = { manifests }

      const newManifest = sinon.spy()
      mutations.setManifest(state, { repo: 'cloudfoundry/go', version: 'v1.4.3', data: newManifest })

      expect(state.manifests).to.deep.equal({ 'cloudfoundry/go-v1.4.3': newManifest })
    })

    context('when data exists', () => {
      it('replaces the specified manifest', () => {
        const manifest1 = sinon.spy()
        const manifest2 = sinon.spy()
        const manifest3 = sinon.spy()
        const manifests = { 'repo-v1': manifest1, 'repo-v2': manifest2, 'repo-v3': manifest3 }
        var state = { manifests }

        const newManifest = sinon.spy()
        mutations.setManifest(state, { repo: 'repo', version: 'v2', data: newManifest })

        expect(state.manifests).to.deep.equal({
          'repo-v1': manifest1,
          'repo-v2': newManifest,
          'repo-v3': manifest3
        })
      })
    })
  })
})

