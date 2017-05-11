<template>
  <section>
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
import BuildpackTile from '@/components/BuildpackTile'
import buildpacks from '../data'

export default {
  name: 'BuildpackIndex',
  data () { return { buildpacks } },
  components: {
    BuildpackTile
  }
}
</script>
