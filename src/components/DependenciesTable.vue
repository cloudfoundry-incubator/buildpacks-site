<template>
  <div>
    <div v-if="dependencies.length > 0">
      <article class="mb2" v-if="regularDependencies.length > 0">
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
      <article v-if="outdatedDependencies.length > 0">
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
// import semver from 'semver'
// import moment from 'moment'
// let today = moment()

export default {
  props: ['dependencies'],
  name: 'DependenciesTable',
  computed: {
    regularDependencies () {
      return this.dependencies
    },
    outdatedDependencies () {
      return []
    }
  }
}
</script>
