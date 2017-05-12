import Vue from 'vue'
import Router from 'vue-router'
import BuildpackIndex from '@/components/BuildpackIndex'
import BuildpackDetail from '@/components/BuildpackDetail'
import NotFound from '@/components/NotFound'
import buildpacks from '../data'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BuildpackIndex',
      component: BuildpackIndex,
      meta: { pageClass: 'bg-near-white' },
      props: { buildpacks }
    },
    {
      path: '/buildpacks/:id/:version',
      name: 'BuildpackDetail',
      component: BuildpackDetail,
      meta: { pageClass: 'bg-white' },
      props: (route) => {
        return {
          version: route.params.version,
          buildpack: buildpacks.find(b => b.id === route.params.id)
        }
      }
    },
    {
      path: '*',
      component: NotFound,
      meta: { pageClass: 'bg-near-white' }
    }
  ]
})
