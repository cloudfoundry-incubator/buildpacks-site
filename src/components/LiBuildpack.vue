<template>
  <div class="buildpack">
    <div>
      <h2>{{buildpack.name}}</h2>
      <hr>
      <div class="latest">Latest</div>
      <router-link class="buildpack" :to="{ name: 'Buildpack', params: { id: buildpack.id }}">{{ latest_version }}</router-link>
    </div>
    <div class="footer">
      <a class="github" :href="github" target="_blank">Github</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'li-buildpack',
  props: ['buildpack'],
  data () { return { latest_version: '' } },
  created () {
    console.log(this.$fetch)
    this.$fetch(`https://api.github.com/repos/${this.buildpack.repo}/releases`,
      (data) => { this.latest_version = data[0].tag_name; true },
      (err) => {
        this.latest_version = 'error'
        console.log(err)
      }
    )
  },
  computed: {
    github () {
      return `https://github.com/${this.buildpack.repo}`
    }
  }
}
</script>

<style scoped>
  div.buildpack {
    background: white;
    border: 1px solid rgba(0, 0, 0, .1);
    box-shadow: 0 2px 4px rgba(50, 50, 93,.1);
    width:100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 30em) {
    div.buildpack {
      width: 48%;
    }
  }
  div.buildpack > div { padding: 1rem; }
  h2 {
    font-size: 1.25rem;
    color: #333;
    margin: 0;
  }
  hr { height: 0; border:0; border-top: 1px solid rgba(0,0,0,0.1); }
  div.latest {
    font-size: .75rem;
    text-transform: uppercase;
    letter-spacing: .1em;
    color: rgba(0,0,0,.5);
    font-weight: 500;
  }
  a.buildpack {
    text-decoration: none;
    color: #357edd;
    font-size: 1.25rem;
    font-weight: 500;
  }
  .footer {
    background: rgba(0, 0, 0, .1);
    border-top: 1px solid rgba(0, 0, 0, .2);
  }
  a.github {
    font-size: .875rem;
    color: #555;
    text-decoration: none;
  }
</style>
