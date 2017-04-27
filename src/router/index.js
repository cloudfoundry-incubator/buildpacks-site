import Vue from 'vue'
import Router from 'vue-router'
import Buildpacks from '@/components/Buildpacks'
import Buildpack from '@/components/Buildpack'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Buildpacks',
      component: Buildpacks
    },
    {
      path: '/index.html',
      name: 'Buildpacks',
      component: Buildpacks
    },
    {
      path: '/buildpacks/:id',
      name: 'Buildpack',
      component: Buildpack,
      props: true
    }
  ]
})
