<template>
  <section>
    <article>
      <HeroSearch></HeroSearch>
    </article>
    <article class="ph2 pv4 ph4-ns">
      <div class="mw9 center">
        <div class="flex flex-wrap nl3-ns nr3-ns">
          <div class="w-100 w-50-m w-25-l ph3" v-for="buildpack in buildpacks">
            <BuildpackTile :buildpack="buildpack"></BuildpackTile>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import HeroSearch from '@/components/HeroSearch'
import BuildpackTile from '@/components/BuildpackTile'
import { mapState } from 'vuex'
import store from '../store'

export default {
  name: 'BuildpackIndex',
  store,
  computed: {
    ...mapState([ 'buildpacks' ])
  },
  components: {
    HeroSearch,
    BuildpackTile
  }
}
</script>
