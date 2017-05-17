<template lang="html">
  <section class="flex flex-column flex-auto">
    <article>
      <Navigation></Navigation>
    </article>
    <article class="pv4 bg-near-white flex-auto">
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
  components: {
    Navigation
  }
}
</script>
