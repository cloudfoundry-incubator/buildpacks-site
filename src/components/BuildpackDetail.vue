<template>
<div class="buildpackdetail mw8 center w-100 ph3 ph4-ns pv3 pv4-ns">
  <div class="db">
    <router-link :to="{ name: 'BuildpackIndex' }" class="blue link f6">
      <i class="icon ion-android-arrow-back mr1"></i>
      Back to Index
    </router-link>
  </div>
  <div class="flex-m flex-l items-center justify-between mb3">
    <h1 class="name mt2 mb3 mb0-ns condensed fw4">
      {{ buildpack.name }}
      <small class="ml1 gray fw4">{{version}}</small>
    </h1>
    <div class="flex items-center">
      <a class="github f6 fw6 link dim br1 ph3 pv2 dib ba b--blue bg-blue white mr2" target="_blank" :href="githubUrl">
        <div class="flex items-center">
          <i class="icon ion-social-github mr2"></i>
          GitHub
        </div>
      </a>
      <a class="f6 fw6 link dim br1 ph3 pv2 dib ba bg-white blue" target="_blank" :href="buildpack.docUrl" v-if="buildpack.docUrl">Documentation</a>
    </div>
  </div>
  <hr class="b--black-10 mb0"/>
  <div class="flex-ns justify-between nl4-ns nr4-ns">
    <div class="w-100 w-70-ns ph4-ns">
      <div class="mb2">
        <h4 class="f5 fw4 condensed mb2 gray">Release Date</h4>
        <p class="f4 lh-copy measure-wide mt0 mb3">{{ release.created_at | humanReadableDate }}</p>
      </div>
      <div class="mb2">
        <DependenciesTable :dependencies="release.dependencies"></DependenciesTable>
      </div>
    </div>
    <div class="w-100 w-30-ns ph4-ns mt4 mt0-ns bl-ns b--black-10">
      <h4 class="f5 fw4 condensed mb2 gray">Versions</h4>
      <SiblingVersionList :id="buildpack.id" :versions="versions"></SiblingVersionList>
    </div>
  </div>
</div>
</template>

<script>
import DependenciesTable from '@/components/DependenciesTable'
import SiblingVersionList from '@/components/SiblingVersionList'

export default {
  name: 'BuildpackDetail',
  props: ['buildpack', 'version'],
  components: {
    SiblingVersionList,
    DependenciesTable
  },
  computed: {
    release () {
      const version = this.version
      if (!version || !this.buildpack.releases) { return {} }
      return this.buildpack.releases.find(r => r.name === version)
    },
    versions () {
      if (!this.buildpack.releases) { return [] }
      return this.buildpack.releases.map(r => r.name)
    },
    githubUrl () {
      return `https://github.com/${this.buildpack.repo}/releases/tag/${this.version}`
    }
  }
}
</script>
