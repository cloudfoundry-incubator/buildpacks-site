<template lang="html">
  <article>
    <div class="mt0 mb2 pb3">
      <multiselect
        class="bp-multiselect drop-shadow"
        v-model="value"
        :max="1"
        :options="dependencies"
        :multiple="true"
        :blockKeys="blockedKeys"
        :close-on-select="true"
        :clear-on-select="true"
        :hide-selected="true"
        placeholder="Filter by dependency name and version" label="name" track-by="name">
        <template slot="option" scope="props">
          <span class="fw6 condensed">{{props.option.name}}</span>
          <span class="fw4 gray ">{{props.option.version}}</span>
        </template>
      </multiselect>
    </div>
    <section class="bg-white ba b--black-10 drop-shadow pa3 pa4-l">
      <article>
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
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import DependencyBuildpacks from '@/components/DependencyBuildpacks'

export default {
  props: ['buildpacks', 'primaryDeps'],
  components: {
    Multiselect,
    DependencyBuildpacks
  },
  data () {
    return {
      value: [],
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
              arr.push({ name: d.name, version: d.version })
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
.bp-multiselect.multiselect .multiselect__input,
.bp-multiselect.multiselect .multiselect__input .multiselect__single {
  font-size: 1.2em;
  min-width: 305px;
}

.bp-multiselect .multiselect__option--disabled {
  background: transparent;
  font-size: 1.10em;
  font-weight: bold;
  color: rgba(0, 0, 0, .5)
}

.bp-multiselect .multiselect__option:not(.multiselect__option--disabled) {
  color: #222;
  font-size: 1.15em;
  font-weight: 300;
}

.bp-multiselect .multiselect__option:not(.multiselect__option--disabled):after {
  content: '';
}

.bp-multiselect .multiselect__option:not(.multiselect__option--disabled).selected {
  background: rgba(0, 0, 0, .05);
}

.bp-multiselect .multiselect__option.multiselect__option--highlight {
  color: #222;
  background-color: rgba(0, 0, 0, .1)
}

.bp-multiselect .multiselect__tags {
  border-radius: 0;
  border-color: rgba(0, 0, 0, .2);
}

.bp-multiselect .multiselect__tag {
  font-weight: bold;
  font-size: 1em;
}

.bp-multiselect .multiselect__tag {
  background: #0c9ed5;
}

.bp-multiselect .multiselect__tag-icon:focus,
.bp-multiselect .multiselect__tag-icon:hover {
  background: rgba(0, 0, 0, .2);
}

.collapsible .ui-collapsible__header {
  background: #f7f7f7;
}
</style>
