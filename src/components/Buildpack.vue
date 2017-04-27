<template>
  <div>
    <h2>{{ buildpack.name }}</h2>

    <a :href="github" target="_blank">Github</a>
    <ul>
      <li v-for="release in buildpack.releases">
        {{ release.tag_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import buildpacks from '../data.json'

export default {
  name: 'buildpack',
  props: ['id'],
  data: function () {
    return { buildpack: { releases: [] } }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => vm.setBuildpack(to.params.id))
  },
  beforeRouteUpdate (to, from, next) {
    this.setBuildpack(to.params.id)
    next()
  },
  computed: {
    link: function () {
      return `/buildpacks/${this.buildpack.id}`
    },
    github: function () {
      return `https://github.com/${this.buildpack.repo}`
    }
  },
  methods: {
    setBuildpack (id) {
      var buildpack = Object.assign({}, buildpacks.find(function (b) { return b.id === id }))
      buildpack.releases = []
      this.buildpack = buildpack
      this.fetchData()
    },
    fetchData () {
      this.$http.get(`https://api.github.com/repos/${this.buildpack.repo}/releases`).then(resp => {
        this.buildpack.releases = resp.data
      }, err => {
        alert(err)
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
