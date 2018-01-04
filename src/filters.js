import Vue from 'vue'
import moment from 'moment'

Vue.filter('humanReadableDate', function (date) {
  return moment(date).format('MMM Do YYYY')
})

Vue.filter('uppercase', function (v) {
  return v.toUpperCase()
})

Vue.filter('timeElapsed', function (date) {
  return moment(date).fromNow()
})
