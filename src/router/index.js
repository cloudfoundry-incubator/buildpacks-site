import Vue from 'vue'
import Router from 'vue-router'
import BuildpackIndex from '@/components/BuildpackIndex'
import BuildpackDetail from '@/components/BuildpackDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BuildpackIndex',
      component: BuildpackIndex,
      meta: { pageClass: 'bg-near-white' }
    },
    {
      path: '/buildpacks/:id/:version',
      name: 'BuildpackDetail',
      props: true,
      component: BuildpackDetail,
      meta: { pageClass: 'bg-white' }
    }
  ]
})
