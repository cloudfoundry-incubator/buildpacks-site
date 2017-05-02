import 'whatwg-fetch'
import YAML from 'js-yaml'

export const loadReleases = ({ commit, state: { buildpacks } }, id) => {
  var buildpack = buildpacks.find(b => b.id === id)
  if (!buildpack) { return }
  if (buildpack.releases && buildpack.releases.length > 0) { return }
  fetch(
    `https://api.github.com/repos/${buildpack.repo}/releases`
  ).then(resp => {
    if (resp.ok) {
      return resp.json()
    }
    throw resp
  }).then(
    data => commit('setReleases', { id, data })
  ).catch(
    resp => resp.json().then(err => commit('setError', err.message))
  )
}

export const loadRepoData = ({ commit, state: { buildpacks } }, id) => {
  var buildpack = buildpacks.find(function (b) { return b.id === id })
  if (!buildpack) { return }
  if (buildpack.description) { return }
  fetch(
    `https://api.github.com/repos/${buildpack.repo}`
  ).then(resp => {
    if (resp.ok) {
      return resp.json()
    }
    throw resp
  }).then(
    data => commit('setRepoData', { id, data })
  ).catch(
    resp => resp.json().then(err => commit('setError', err.message))
  )
}

export const loadManifest = ({ commit, state: { manifests } }, { repo, version }) => {
  if (manifests[`${repo}-${version}`]) { return }
  fetch(
    `https://raw.githubusercontent.com/${repo}/${version}/manifest.yml`
  ).then(resp => {
    if (resp.ok) {
      return resp.text()
    }
    throw resp
  }).then(
    txt => YAML.safeLoad(txt)
  ).then(
    data => commit('setManifest', { repo, version, data })
  ).catch(
    resp => resp.json().then(err => commit('setError', err.message))
  )
}
