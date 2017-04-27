<template>
  <div>
    <h2>{{ buildpack.name }}</h2>
    <a :href="github" target="_blank">Github</a>
  </div>
</template>

<script>
import buildpacks from '../data.json'

export default {
  name: 'buildpack',
  props: ['id'],
  data: function () {
    var id = this.id
    var buildpack = buildpacks.find(function (b) { return b.id === id })
    return { buildpack }
  },
  computed: {
    link: function () {
      return `/buildpacks/${this.buildpack.id}`
    },
    github: function () {
      return `https://github.com/${this.buildpack.repo}`
    }
  }
}
</script>

<style scoped>
</style>
