<template>
  <div class="mb3 mb4-l ba b--black-10 drop-shadow bg-white w-100">
    <div class="pa3 flex flex-column h-100">
      <div class="flex-auto">
        <div class="flex items-center">
          <h1 class="name ma0 condensed f4 fw4">
            <router-link class="color-inherit hover-blue link no-underline" :to="{ name: 'BuildpackDetail', params: { id: buildpack.id, version: latestVersion.name } }" v-if="latestVersion">
              {{buildpack.name}}
            </router-link>
            <span v-else>
              {{buildpack.name}}
            </span>
          </h1>
          <a :href="githubUrl" target="_blank" class="github link f4 gray ml2" v-if="githubUrl">
            <i class="icon ion-social-github mr1"></i>
          </a>
        </div>
        <hr/>
        <p class="lh-copy dark-gray">{{ buildpack.description }}</p>
      </div>
      <div class="mt3 mb1" v-if="latestVersion">
        <div class="flex" style="justify-content:space-between;">
          <div>
            <h4 class="condensed f6 fw4 ma0 black-50">Latest</h4>
            <h2 class="fw4 f5 mb0 mt2">
              <router-link class="latestversion blue link no-underline" :to="{ name: 'BuildpackDetail', params: { id: buildpack.id, version: latestVersion.name } }">
                {{ latestVersion.name }}
              </router-link>
            </h2>
          </div>
          <div class="ml2">
            <h4 class="condensed f6 fw4 ma0 black-50">Released</h4>
            <h2 class="fw4 f5 mb0 mt2 mid-gray">
              {{ latestVersion.created_at | humanReadableDate }}
            </h2>
          </div>
          <div class="ml2" v-if="buildpack.logo" style="align-self:center">
            <img :src="buildpack.logo" style="max-width:41px;max-height:41px;">
          </div>
        </div>
      </div>
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
      return `https://github.com/${this.buildpack.repo}/releases/tag/${this.latestVersion.name}`
    },
    latestVersion () {
      var releases = this.buildpack.releases
      if (releases && releases[0]) {
        return releases[0]
      }
      return false
    }
  }
}
</script>
