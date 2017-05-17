<template>
  <section>
    <article class="ph2 pv4 ph4-ns">
      <div class="mw9 center">
        <div class="flex flex-wrap nl3-ns nr3-ns">
          <div class="w-100 w-50-m w-25-l ph3 flex" v-for="buildpack in buildpacks">
            <BuildpackTile :buildpack="buildpack"></BuildpackTile>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import Navigation from '@/components/Navigation'
import BuildpackTile from '@/components/BuildpackTile'

export default {
  name: 'BuildpackIndex',
  props: ['buildpacks'],
  components: {
    Navigation,
    BuildpackTile
  }
}
</script>
