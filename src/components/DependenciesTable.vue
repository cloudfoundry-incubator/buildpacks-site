<template>
  <div>
    <div v-if="hasDependencies">
      <article class="mb2">
        <h4 class="f5 fw6 mb3 gray">Dependencies In This Version</h4>
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>
              <th class="tl bb b--black-10 pv2">Name</th>
              <th class="tl bb b--black-10 pv2">Version Line</th>
              <th class="tl bb b--black-10 pv2">Deprecation Date</th>
              <th class="tl bb b--black-10 pv2">MD5</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dependency in regularDependencies">
              <td class="bb b--black-10 pv2">{{ dependency.name }}</td>
              <td class="bb b--black-10 pv2">{{ dependency.version}}</td>
              <td class="bb b--black-10 pv2">
                <span v-if="dependency.deprecation">
                  {{ dependency.deprecation.format('MMM Do YYYY') }}
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
      <article>
        <h4 class="f5 fw6 mb3 gray">Outdated Dependencies</h4>
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            <tr>
              <th class="tl bb b--black-10 pv2">Name</th>
              <th class="tl bb b--black-10 pv2">Version Line</th>
              <th class="tl bb b--black-10 pv2">Deprecation Date</th>
              <th class="tl bb b--black-10 pv2">MD5</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dependency in outdatedDependencies">
              <td class="bb b--black-10 pv2">{{ dependency.name }}</td>
              <td class="bb b--black-10 pv2">{{ dependency.version}}</td>
              <td class="bb b--black-10 pv2">
                <span v-if="dependency.deprecation">
                  {{ dependency.deprecation.format('MMM Do YYYY') }}
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
    <div v-else>
      no dependencies
    </div>
  </div>
</template>

<script>
import semver from 'semver'
import moment from 'moment'

let today = moment()
let current = (a) => {
  return !a.deprecation || a.deprecation.isAfter(today)
}

export default {
  props: ['repo', 'version'],
  name: 'DependenciesTable',
  computed: {
    hasDependencies () { return this.dependencies.length > 0 },
    deprecations () {
      if (!this.manifest.dependency_deprecation_dates) return []

      return this.manifest.dependency_deprecation_dates.map((a) => {
        return { name: a.name, match: new RegExp(a.match), date: moment(a.date) }
      })
    },
    dependencies () {
      return this.manifest.dependencies.map((a) => {
        var validSemver = semver.valid(a.version)
        var deprecation = ''
        for (var d of this.deprecations) {
          if (d.name === a.name && d.match.exec(a.version)) {
            deprecation = d.date
          }
        }
        return Object.assign(a, { validSemver, deprecation })
      }).sort((a, b) => {
        var cmp = a.name.localeCompare(b.name)
        if (cmp === 0 && a.validSemver && b.validSemver) {
          return semver.gt(b.version, a.version) ? 1 : -1
        }
        return cmp
      })
    },
    regularDependencies () {
      return this.dependencies.filter(current)
    },
    outdatedDependencies () {
      return this.dependencies.filter(a => !current(a))
    }
  },
  data: function () {
    return {
      manifest: { dependencies: [], dependency_deprecation_dates: [] }
    }
  },
  created () { this.fetchData() },
  watch: { '$route': 'fetchData' },
  methods: {
    fetchData () {
      this.manifest = { dependencies: [] }

      this.$fetch(`https://raw.githubusercontent.com/${this.repo}/${this.version}/manifest.yml`,
        (data) => { this.manifest = data; true },
        (err) => { console.log(err); this.error = err; true })
    }
  }
}
</script>
