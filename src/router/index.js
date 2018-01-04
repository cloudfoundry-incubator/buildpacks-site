import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import BuildpackIndex from '@/components/BuildpackIndex'
import BuildpackDetail from '@/components/BuildpackDetail'
import DependenciesIndex from '@/components/DependenciesIndex'
import NotFound from '@/components/NotFound'
import primaryDeps from '@/data/primary_deps'

Vue.use(Router)
var error = false
var buildpacks = false
var beforeEnter = (to, from, next) => {
  if (buildpacks) {
    next()
  }
  var oReq = new XMLHttpRequest()
  oReq.addEventListener('load', function () {
    if (this.status >= 200 && this.status < 300) {
      error = false
      buildpacks = JSON.parse(this.responseText)
    } else {
      error = 'Error: Could not download buildpacks data'
      buildpacks = false
    }
    next()
  })
  oReq.addEventListener('error', function () {
    error = 'Error: Could not download buildpacks data'
    buildpacks = false
    next()
  })
  oReq.open('GET', 'https://buildpacks-site.s3.amazonaws.com/buildpacks.json')
  oReq.send()
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'buildpacks',
      name: 'Index',
      component: Index,
      beforeEnter,
      props: () => { return { error } },
      children: [
        { path: '/buildpacks', meta: { pageClass: 'bg-near-white' }, name: 'BuildpackIndex', props: () => { return { buildpacks } }, component: BuildpackIndex },
        { path: '/dependencies', meta: { pageClass: 'bg-near-white' }, name: 'DependenciesIndex', props: () => { return { buildpacks, primaryDeps } }, component: DependenciesIndex }
      ]
    },
    {
      path: '/buildpacks/:id/:version',
      name: 'BuildpackDetail',
      component: BuildpackDetail,
      meta: { pageClass: 'bg-white' },
      beforeEnter,
      props: (route) => {
        return {
          error: error,
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
