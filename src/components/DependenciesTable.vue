<template>
  <div>
    <h4 class="f5 fw4 condensed mb2 gray">Dependencies In This Version</h4>
    <div v-if="dependencies.length > 0">
      <article class="w-100 overflow-x-scroll" v-if="regularDependencies.length > 0">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>
              <th class="tl bb b--black-10 pv2">Name</th>
              <th class="tl bb b--black-10 pv2" style="min-width: 100px;">Version Line</th>
              <th class="tl bb b--black-10 pv2" style="min-width: 100px;">Deprecation Date</th>
              <th class="tl bb b--black-10 pv2">MD5</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dependency in regularDependencies">
              <td class="bb b--black-10 pv2">{{ dependency.name }}</td>
              <td class="bb b--black-10 pv2">{{ dependency.version}}</td>
              <td class="bb b--black-10 pv2">
                <span v-if="dependency.eol">
                  {{ dependency.eol }}
                </span>
                <span class="o-50" v-else>
                  Unknown
                </span>
              </td>
              <td class="bb b--black-10 pv2">{{ dependency.md5 }}</td>
            </tr>
          </tbody>
        </table>
      </article>
      <article class="w-100 overflow-x-scroll" v-if="outdatedDependencies.length > 0">
        <h4 class="f5 fw4 condensed mb2 gray">Outdated Dependencies</h4>
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>
              <th class="tl bb b--black-10 pv2">Name</th>
              <th class="tl bb b--black-10 pv2" style="min-width: 100px;">Version Line</th>
              <th class="tl bb b--black-10 pv2" style="min-width: 100px;">Deprecation Date</th>
              <th class="tl bb b--black-10 pv2">MD5</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dependency in outdatedDependencies">
              <td class="bb b--black-10 pv2">{{ dependency.name }}</td>
              <td class="bb b--black-10 pv2">{{ dependency.version}}</td>
              <td class="bb b--black-10 pv2">
                <span v-if="dependency.eol">
                  {{ dependency.eol }}
                </span>
                <span class="o-50" v-else>
                  Unknown
                </span>
              </td>
              <td class="bb b--black-10 pv2">{{ dependency.md5 }}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
    <p class="f4 black-50" v-else>
      No dependencies for this buildpack
    </p>
  </div>
</template>

<script>
import semver from 'semver'
import moment from 'moment'

let latestPatch = (deps, dep) => {
  deps = deps
    .filter(d => d.name === dep.name)
    .filter(d => {
      var diff
      try {
        diff = semver.diff(d.version, dep.version)
      } catch (e) {
        diff = undefined
      }
      return (!diff || diff === 'patch')
    })
    .map(d => d.version)
    .sort((a, b) => {
      try {
        return semver.rcompare(a, b)
      } catch (e) {
        return 0
      }
    })

  return deps[0]
}
let today = moment()
let outdated = (deps, dep) => {
  return latestPatch(deps, dep) !== dep.version || (dep.eol && moment(dep.eol).isBefore(today))
}

export default {
  props: ['dependencies'],
  name: 'DependenciesTable',
  computed: {
    regularDependencies () {
      return this.dependencies.filter(d => !outdated(this.dependencies, d))
    },
    outdatedDependencies () {
      return this.dependencies.filter(d => outdated(this.dependencies, d))
    }
  }
}
</script>
