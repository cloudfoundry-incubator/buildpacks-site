import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import BuildpackIndex from '@/components/BuildpackIndex'
import BuildpackDetail from '@/components/BuildpackDetail'
import DependenciesIndex from '@/components/DependenciesIndex'
import NotFound from '@/components/NotFound'
import buildpacks from '../data'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'buildpacks',
      name: 'Index',
      component: Index,
      meta: { pageClass: 'bg-near-white' },
      props: { buildpacks },
      children: [
        { path: '/buildpacks', name: 'BuildpackIndex', props: { buildpacks }, component: BuildpackIndex },
        { path: '/dependencies', name: 'DependenciesIndex', props: { buildpacks }, component: DependenciesIndex }
      ]
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
