<template>
  <div class="mb3 mb4-l ba b--black-10 drop-shadow bg-white">
    <div class="pa3 flex flex-column h-100">
      <div class="flex-auto">
        <div class="flex items-center">
          <h1 class="name ma0 condensed f4 fw4">{{buildpack.name}}</h1>
          <a :href="githubUrl" target="_blank" class="github link f4 gray ml2" v-if="githubUrl">
            <i class="icon ion-social-github mr1"></i>
          </a>
        </div>
        <hr/>
        <p class="lh-copy dark-gray">{{ buildpack.description }}</p>
      </div>
      <div class="mt3 mb1" v-if="latestVersion">
        <div class="flex">
          <div>
            <h4 class="condensed f6 fw4 ma0 black-50">Latest</h4>
            <h2 class="fw4 f5 mb0 mt2">
              <router-link class="latestversion blue link no-underline" :to="{ name: 'BuildpackDetail', params: { id: buildpack.id, version: latestVersion } }">
                {{ latestVersion }}
              </router-link>
            </h2>
          </div>
          <div class="ml4">
            <h4 class="condensed f6 fw4 ma0 black-50">Released</h4>
            <h2 class="fw4 f5 mb0 mt2 mid-gray">I don't know</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'

export default {
  name: 'BuildpackTile',
  props: ['buildpack'],
  store,
  created () { this.loadReleases(this.buildpack.id) },
  computed: {
    githubUrl () {
      if (!this.latestVersion) { return false }
      return `https://github.com/${this.buildpack.repo}/releases/tag/${this.latestVersion}`
    },
    latestVersion () {
      var releases = this.buildpack.releases
      if (releases && releases[0]) {
        return releases[0]
      }
      return false
    }
  },
  methods: {
    ...mapActions([ 'loadReleases' ])
  }
}
</script>
