import Vue from 'vue'
// import 'whatwg-fetch'

Vue.mixin({
  beforeCreate () {
    if (this.$options.fetch !== undefined) {
      this._fetch = this.$options.fetch
    }
  },
  methods: {
    '$fetch' (url, resolve, reject) {
      if (this._fetch !== undefined) {
        return this._fetch(url, resolve, reject)
      } else {
        return fetch(url).then(resp => resp.json()).then(resolve).catch(reject)
      }
    }
  }
})
