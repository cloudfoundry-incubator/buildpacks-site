<template lang="html">
  <section class="flex flex-column flex-auto">
    <article v-if="error">
      <h1 style="text-align:center;margin-top:3em;">{{error}}</h1>
    </article>
    <article v-if="!error">
      <Navigation></Navigation>
    </article>
    <article class="pv4 bg-near-white flex-auto" v-if="!error">
      <div class="mw9 ph3 ph5-l center">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </article>
  </section>
</template>

<script>
import Navigation from '@/components/Navigation'
export default {
  props: ['error'],
  components: {
    Navigation
  }
}
</script>
