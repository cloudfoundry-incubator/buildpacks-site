<template>
  <div class="buildpacks">
    <buildpack v-for="buildpack in buildpacks" :buildpack="buildpack" :key="buildpack.id"></buildpack>
  </div>
</template>

<script>
import buildpacks from '../data.json'
import buildpack from './LiBuildpack'

export default {
  name: 'buildpacks',
  components: { buildpack },
  data () {
    return {
      buildpacks: buildpacks
    }
  }
}
</script>

<style scoped>
  div.buildpacks {
    background: #f4f4f4;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
