<template>
<div class="mw8 center w-100 ph3 ph4-ns pv3 pv4-ns">
  <div class="db">
    <router-link to="/" class="blue link f6">
      Back to Index
    </router-link>
  </div>
  <div class="flex-m flex-l items-center justify-between mb3">
    <h1 class="mt2 mb3 mb0-ns">
      {{ buildpack.name }}
      <small class="ml2 gray fw5">{{version}}</small>
    </h1>
    <div class="flex items-center">
      <a class="f6 fw6 link dim br1 ph3 pv2 dib ba b--blue bg-blue white mr2" target="_blank" :href="githubUrl">
        <div class="flex items-center">
          <i class="icon ion-social-github mr2"></i>
          GitHub
        </div>
      </a>
      <a class="f6 fw6 link dim br1 ph3 pv2 dib ba bg-white blue" target="_blank" :href="docsUrl">Documentation</a>
    </div>
  </div>
  <hr class="b--black-10 mb0"/>
  <div class="flex-ns justify-between nl4-ns nr4-ns">
    <div class="w-100 w-70-ns ph4-ns">
      <div class="mb2">
        <h4 class="f5 fw6 mb3 gray">Description</h4>
        <p class="f4 lh-copy measure-wide mt0 mb3">{{ data.description }}</p>
      </div>
      <div class="mb2">
        <DependenciesTable :repo="buildpack.repo" :version="version"></DependenciesTable>
      </div>
    </div>
    <div class="w-100 w-30-ns ph4-ns mt4 mt0-ns bl-ns b--black-10">
      <h4 class="f5 fw6 mb3 gray">Versions</h4>
      <SiblingVersionList :id="buildpack.id" :repo="buildpack.repo"></SiblingVersionList>
    </div>
  </div>
</div>
</template>

<script>
import DependenciesTable from '@/components/DependenciesTable'
import SiblingVersionList from '@/components/SiblingVersionList'
import buildpacks from '../data.json'

export default {
  name: 'BuildpackDetail',
  props: ['id', 'version'],
  components: {
    SiblingVersionList,
    DependenciesTable
  },
  data () { return { buildpack: {}, data: {}, releases: [] } },
  created () { this.fetchData() },
  watch: { '$route': 'fetchData' },
  computed: {
    githubUrl: function () {
      return `https://github.com/${this.buildpack.repo}/releases/tag/${this.$route.params.version}`
    },
    docsUrl: function () {
      return '#'
    }
  },
  methods: {
    fetchData () {
      this.data = {}
      this.releases = []

      var id = this.id
      var buildpack = buildpacks.find(function (b) { return b.id === id })
      this.buildpack = Object.assign({}, buildpack)

      this.$fetch(`https://api.github.com/repos/${this.buildpack.repo}`,
        (data) => { this.data = data; true },
        (err) => { this.error = err; true })
    }
  }
}
</script>
