<template>
  <div id="app" class="min-vh-100" :class="pageClass">
    <SiteHeader></SiteHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader'

export default {
  name: 'app',
  components: {
    SiteHeader
  },
  computed: {
    pageClass: function () {
      return this.$route.meta.pageClass
    }
  }
}
</script>

<style>
  @import url(http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);

  body, html {
    height: 100%;
    width: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  hr {
    border-top: 0;
  }

  .cf-blue {
  	color: #0c9ed5;
  }

  .bg-cf-blue {
  	background-color: #0c9ed5;
  }

  .drop-shadow {
  	box-shadow: 0 2px 4px rgba(50,50,93,.1);
  }

  div.error {
    background: red;
    color: white;
    font-weight: bold;
    text-align: center;
    padding: 1em;
  }
</style>
