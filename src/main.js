import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import 'tachyons'

Vue.config.productionTip = false

Vue.filter('humanReadableDate', function (date) {
  return moment(date).format('MMM Do YY')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
