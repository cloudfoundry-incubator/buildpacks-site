<template>
  <header class="bg-white bb b--black-10 tc pv3">
    <router-link :to="{ name: 'BuildpackIndex' }">
      <img class="w4 w5-l" src="../assets/cf-logo.png" alt="CloudFoundry">
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader'
}
</script>
