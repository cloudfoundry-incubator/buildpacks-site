export const setReleases = (state, { id, data }) => {
  var idx = state.buildpacks.findIndex(b => b.id === id)
  var releases = data.map((r) => r.tag_name)
  state.buildpacks = [
    ...state.buildpacks.slice(0, idx),
    { ...state.buildpacks[idx], ...{ releases } },
    ...state.buildpacks.slice(idx + 1)
  ]
}

export const setError = (state, err) => {
  state.error = err
}

export const setRepoData = (state, { id, data }) => {
  var idx = state.buildpacks.findIndex(b => b.id === id)
  state.buildpacks = [
    ...state.buildpacks.slice(0, idx),
    { ...state.buildpacks[idx], ...{ description: data.description } },
    ...state.buildpacks.slice(idx + 1)
  ]
}

export const setManifest = (state, { repo, version, data }) => {
  var newData = {}
  newData[`${repo}-${version}`] = data
  state.manifests = { ...state.manifests, ...newData }
}
