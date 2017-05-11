<template>
  <div class="mb3 mb4-l ba b--black-10 drop-shadow">
    <div class="pa3 bg-white">
      <h1 class="name ma0 dark-gray f4">{{buildpack.name}}</h1>
      <hr/>
      <div class="mt3 mb1" v-if="latestVersion">
        <h4 class="fw5 tracked ttu f7 ma0 black-50">Latest</h4>
        <h2 class="fw5 f4 mb0 mt2">
          <router-link class="latestversion blue link no-underline" :to="{ name: 'BuildpackDetail', params: { id: buildpack.id, version: latestVersion } }">
            {{ latestVersion }}
          </router-link>
        </h2>
      </div>
    </div>
    <div class="ph3 pv2 bt b--black-10" v-if="githubUrl">
      <a :href="githubUrl" target="_blank" class="github link f6 mid-gray">
        <i class="icon ion-social-github mr1"></i>
        GitHub
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildpackTile',
  props: ['buildpack'],
  computed: {
    githubUrl () {
      if (!this.latestVersion) { return false }
      return `https://github.com/${this.buildpack.repo}/releases/tag/${this.latestVersion}`
    },
    latestVersion () {
      var releases = this.buildpack.releases
      if (releases && releases[0]) {
        return releases[0].name
      }
      return false
    }
  }
}
</script>
