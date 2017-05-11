<template>
  <div class="mb3 mb4-l bg-white ba b--black-10 drop-shadow">
    <div class="pa3 flex flex-column h-100">
      <div class="flex-auto">
        <div class="flex items-center">
          <h1 class="name ma0 f4 condensed fw4">{{buildpack.name}}</h1>
          <a :href="githubUrl" target="_blank" class="link f4 ml2 gray">
            <i class="icon ion-social-github"></i>
          </a>
        </div>
        <hr/>
        <p class="lh-copy dark-gray">{{buildpack.description}}</p>
      </div>
      <div class="flex items-center mt2">
        <div class="">
          <h4 class="f6 fw4 condensed ma0 gray">Latest</h4>
          <h2 class="f5 fw4 mb0 mt2">
            <router-link class="latestversion blue link no-underline" :to="{ name: 'BuildpackDetail', params: { id: buildpack.id, version: latestVersion.name } }">
              {{ latestVersion.name }}
            </router-link>
          </h2>
        </div>
        <div class="ml4">
          <h4 class="f6 fw4 condensed ma0 gray">Released</h4>
          <h2 class="f5 mb0 mt2 fw4 mid-gray">
            {{ latestVersion.created_at | humanReadableDate }}
          </h2>
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
      return `https://github.com/${this.buildpack.repo}/releases/tag/${this.latestVersion}`
    },
    latestVersion () {
      var releases = this.buildpack.releases
      if (releases && releases[0]) {
        return releases[0]
      }
      return {}
    }
  }
}
</script>
