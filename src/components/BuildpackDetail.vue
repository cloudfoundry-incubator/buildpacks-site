<template>
<div class="buildpackdetail mw8 center w-100 ph3 ph4-ns pv3 pv4-ns" v-if="buildpack">
  <div class="db">
    <router-link to="/" class="blue link f6">
      Back to Index
    </router-link>
  </div>
  <div class="flex-m flex-l items-center justify-between mb3">
    <h1 class="name mt2 mb3 mb0-ns">
      {{ buildpack.name }}
      <small class="ml2 gray fw5">{{version}}</small>
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
      <div class="mb2" v-if="buildpack.description">
        <h4 class="f5 fw6 mb3 gray">Description</h4>
        <p class="description f4 lh-copy measure-wide mt0 mb3">{{ buildpack.description }}</p>
      </div>
      <div class="mb2" v-if="buildpack.repo">
        <DependenciesTable :repo="buildpack.repo" :version="version"></DependenciesTable>
      </div>
    </div>
    <div class="w-100 w-30-ns ph4-ns mt4 mt0-ns bl-ns b--black-10" v-if="buildpack.id">
      <h4 class="f5 fw6 mb3 gray">Versions</h4>
      <SiblingVersionList :id="buildpack.id" :versions="buildpack.releases"></SiblingVersionList>
    </div>
  </div>
</div>
</template>

<script>
import DependenciesTable from '@/components/DependenciesTable'
import SiblingVersionList from '@/components/SiblingVersionList'
import { mapState, mapActions } from 'vuex'
import store from '../store'

export default {
  name: 'BuildpackDetail',
  props: ['version'],
  store,
  components: {
    SiblingVersionList,
    DependenciesTable
  },
  computed: {
    ...mapState([ 'buildpacks' ]),

    buildpack () {
      const id = this.$route.params.id
      if (!id) { return {} }
      return this.buildpacks.find(b => b.id === id)
    },

    githubUrl () {
      return `https://github.com/${this.buildpack.repo}/releases/tag/${this.version}`
    }
  },
  methods: mapActions([ 'loadRepoData' ]),
  created () { this.loadRepoData(this.$route.params.id) }
}
</script>
