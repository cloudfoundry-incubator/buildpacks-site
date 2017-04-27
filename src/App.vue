<template>
  <div id="app">
    <Top></Top>
    <router-view></router-view>
  </div>
</template>

<script>
import Top from '@/components/Top'

export default {
  name: 'app',
  components: { Top }
}
</script>

<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: sans-serif; }
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
