<template>
  <div>
    <ul class="versions list f5 pl0 mv0">
      <li v-for="version in versions">
        <router-link :to="{ name: 'BuildpackDetail', params: { id: id, version: version } }" class="link blue dim lh-title fw6 db pv2 mb1 bb b--black-10 o-50">
          {{ version }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'

export default {
  name: 'SiblingVersionList',
  props: [ 'id', 'versions' ],
  store,
  methods: mapActions(['loadReleases']),
  created () { this.loadReleases(this.id) }
}
</script>

<style scoped>
  a.router-link-active {
    opacity: 1;
  }

  a:not(.router-link-active) {
    opacity: .5;
  }
</style>
