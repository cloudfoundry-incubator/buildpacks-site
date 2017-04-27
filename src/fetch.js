import Vue from 'vue'
// import 'whatwg-fetch'
import YAML from 'js-yaml'

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
        var p = fetch(url)
        if (url.endsWith('.yml')) {
          p = p.then(resp => resp.text()).then(txt => YAML.safeLoad(txt))
        } else {
          p = p.then(resp => resp.json())
        }
        p.then(resolve).catch(reject)
      }
    }
  }
})
