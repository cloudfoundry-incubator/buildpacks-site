<template>
  <div class="version-list relative" v-bind:class="{'clipped': !showingAllBuildpacks}">
    <ul class="list f5 pl0 mv0">
      <li v-for="(version, index) in versions">
        <router-link :to="{ name: 'BuildpackDetail', params: { id: id, version: version } }" class="link blue dim lh-title fw6 db pv2 bb b--black-10 o-50 flex items-center justify-between">
          {{ version }}
          <span class="ttu f6 green" v-if="index === 0">
            <i class="icon ion-pricetag mr1"></i>
            latest
          </span>
        </router-link>
      </li>
    </ul>
    <div class="absolute left-0 right-0 bottom-0 mask flex items-center z-4" v-if="!showingAllBuildpacks">
      <button class="ba b--blue blue bg-white f6 fw6 pv2 w-100 pointer mt2 drop-shadow" @click="showAllVersions" type="button" v-if="!showingAllBuildpacks">
        Show Outdated Versions
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'id', 'versions' ],
  name: 'SiblingVersionList',
  data () {
    return {
      showingAllBuildpacks: false
    }
  },
  methods: {
    showAllVersions () {
      this.showingAllBuildpacks = true
    }
  }
}
</script>

<style scoped>
  li:last-of-type a {
    border-bottom: 0;
  }

  a {
    opacity: .65;
  }

  a:hover, a.router-link-active {
    opacity: 1;
  }

  .version-list.clipped {
    height: 225px;
    overflow: hidden;
  }

  .mask {
    background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,.75) 5%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,.75) 5%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,.75) 5%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    cursor: not-allowed;
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
    top: 36px; /* magic number for the height of one version list item */
  }
</style>
