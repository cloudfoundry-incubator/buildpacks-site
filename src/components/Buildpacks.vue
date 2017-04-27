<template>
  <div class="hello">
    <h2>Buildpacks</h2>
    <ul>
      <buildpack v-for="buildpack in buildpacks" :buildpack="buildpack" :key="buildpack.id"></buildpack>
    </ul>
  </div>
</template>

<script>
import buildpacks from '../data.json'
import Buildpack from './LiBuildpack'

export default {
  name: 'buildpacks',
  components: { 'buildpack': Buildpack },
  data () {
    return {
      buildpacks: buildpacks
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 20px;
}

a {
  color: #42b983;
}
</style>
