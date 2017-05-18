<template lang="html">
  <div>
    <ui-collapsible
      class="collapsible"
      v-for="dep in dependencies"
      :disableRipple="true"
      :title="dep.name"
      :open="dep.open"
      :key="dep.name">
      <div slot="header">
        <h2 class="mv0 f5 fw4 condensed">{{dep.name}}</h2>
      </div>
      <div class="flex flex-wrap nl3 nr3">
        <div class="w-100 w-33-l ph3 mb3" v-for="b in dep.buildpacks">
          <div class="dep-list-item pa3 ba b--black-10">
            <h3 class="dark-gray fw4 f5 mt0 mb2">{{dep.name}} {{b.depVersion}}</h3>
            <ul class="list pl0 ma0">
              <li class="mt1">
                <router-link :to="{ name: 'BuildpackDetail', params: { id: b.bpID, version: b.bpVersion }}" class="blue no-underline dim">
                  <span>{{ b.bpName }}</span>
                  <span>{{ b.bpVersion }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ui-collapsible>
  </div>
</template>

<script>
import UiCollapsible from 'keen-ui/lib/UiCollapsible'

export default {
  props: ['dependencies'],
  components: {
    UiCollapsible
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
