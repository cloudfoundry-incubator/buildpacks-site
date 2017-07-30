<template lang="html">
  <article>
    <div class="mt0 mb2 pb3">
      <v-select :options="dependencies" :on-change="selectVal"
        placeholder="Filter by dependency name and version"
        class="bp-multiselect drop-shadow"></v-select>
    </div>
    <section class="bg-white ba b--black-10 drop-shadow pa3 pa4-l">
      <article>
        <div class="mb4" v-if="matched.length > 0">
          <h2 class="f4 fw4 condensed mt0 mb3 mid-gray">Matched Dependencies</h2>
          <DependencyBuildpacks :dependencies="matched" />
        </div>
        <div class="mb4">
          <h2 class="f4 fw4 condensed mt0 mb3 mid-gray">Primary Dependencies</h2>
          <DependencyBuildpacks :dependencies="primary" />
        </div>
        <div class="mb4">
          <h2 class="f4 fw4 condensed mt0 mb3 mid-gray">Secondary Dependencies</h2>
          <DependencyBuildpacks :dependencies="secondary" />
        </div>
      </article>
    </section>
  </article>
</template>

<script>
import Semver from 'semver'
import vSelect from 'vue-select'
import DependencyBuildpacks from '@/components/DependencyBuildpacks'

export default {
  props: ['buildpacks', 'primaryDeps'],
  components: {
    vSelect,
    DependencyBuildpacks
  },
  data () {
    return {
      value: {},
      blockedKeys: ['Tab']
    }
  },
  computed: {
    dependencies () {
      var arr = []
      for (var b of this.buildpacks) {
        for (var r of b.releases) {
          for (var d of r.dependencies) {
            if (!arr.find(a => a.name === d.name && a.version === d.version)) {
              arr.push({ name: d.name, version: d.version, label: `${d.name} - ${d.version}` })
            }
          }
        }
      }
      return arr.sort(this.depCompare)
    },
    categorize () {
      var obj = {}
      for (var b of this.buildpacks) {
        for (var r of b.releases) {
          for (var d of r.dependencies) {
            obj[d.name] = obj[d.name] || {}
            obj[d.name][d.version] = obj[d.name][d.version] || {}
            const version = obj[d.name][d.version][b.id]
            const newVersion = r.name
            if (this._safeSemverCompare(newVersion, version) > 0) {
              obj[d.name][d.version][b.id] = newVersion
            }
          }
        }
      }
      return obj
    },
    _buildpackNames () {
      return this.buildpacks.reduce((obj, b) => {
        obj[b.id] = b.name
        return obj
      }, {})
    },
    matched () {
      const {name, version} = this.value || {}
      if (!name || !version) return []
      var obj = {}
      for (var b of this.buildpacks) {
        for (var r of b.releases) {
          for (var d of r.dependencies) {
            if (d.name === name && d.version === version) {
              obj[b.name] = obj[b.name] || { 'name': b.name, 'open': true, 'buildpacks': [] }
              obj[b.name].buildpacks.push({
                'depVersion': version, 'bpID': b.id, 'bpName': b.name, 'bpVersion': r.name
              })
            }
          }
        }
      }
      return Object.values(obj)
    },
    primary () {
      return this.primaryDeps.map(name => {
        return {
          name,
          buildpacks: this._convertCategoriesToDeps(this.categorize[name])
        }
      })
    },
    secondary () {
      var deps = Object.keys(this.categorize).filter(k => this.primaryDeps.indexOf(k) < 0).sort()
      return deps.map(name => {
        return {
          name,
          buildpacks: this._convertCategoriesToDeps(this.categorize[name])
        }
      })
    }
  },
  methods: {
    selectVal (val) {
      this.value = val
    },
    customLabel ({ name, version }) {
      return `${name} - ${version}`
    },
    _convertCategoriesToDeps (input) {
      if (!input) return []
      var arr = []
      for (let [depVersion, buildpacks] of Object.entries(input)) {
        for (let [bpID, bpVersion] of Object.entries(buildpacks)) {
          let bpName = this._buildpackNames[bpID]
          arr.push({ depVersion, bpID, bpName, bpVersion })
        }
      }
      return arr.sort(this.bpCompare)
    },
    _safeCompare (a, b) {
      if (a === undefined || a === null) a = ''
      if (b === undefined || b === null) b = ''
      return a.toString().localeCompare(b.toString())
    },
    _safeSemverCompare (a, b) {
      try {
        return Semver.compare(a.replace(/^v/, ''), b.replace(/^v/, ''))
      } catch (e) {
        return this._safeCompare(a, b)
      }
    },
    depCompare (a, b) {
      if (a.name === b.name) {
        return this._safeSemverCompare(b.version, a.version)
      } else {
        return this._safeCompare(a.name, b.name)
      }
    },
    bpCompare (a, b) {
      if (a.depVersion === b.depVersion) {
        if (a.bpName === b.bpName) {
          return this._safeSemverCompare(b.bpVersion, a.bpVersion)
        }
        return this._safeCompare(a.bpName, b.bpName)
      }
      return this._safeSemverCompare(b.depVersion, a.depVersion)
    }
  }
}
</script>

<style lang="css">
.bp-multiselect.v-select {
  background: white;
}
.bp-multiselect.v-select .dropdown-toggle {
  border-radius: 0;
}
.bp-multiselect.v-select:before {
    content: "\F2F5";
    display: inline-block;
    font-size: 1.25rem;
    font-family: "Ionicons";
    color: #999;
    left: 1rem;
    position: absolute;
    line-height: 34px;
}
.bp-multiselect.v-select .dropdown-toggle {
  padding-left: 40px;
}
.bp-multiselect.v-select .selected-tag {
  color: #fff;
  background-color: #0c9ed5;
  font-weight: bold;
  font-size: 14px;
  border: 0;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

.collapsible .ui-collapsible__header {
  background: #f7f7f7;
}
</style>
