<template>
  <div class="bg-cf-blue h4 flex">
    <div class="self-end w-100">
      <div class="mw9 center ph3 ph5-l">
        <h4 class="mv0 fw5 white pl2 o-70">Filter By:</h4>
        <router-link :to="{ name: 'BuildpackIndex' }" class="link pa2 dib mr1">
          <h2 class="mv0 white f4">Buildpacks</h2>
        </router-link>
        <router-link :to="{ name: 'DependenciesIndex' }" class="link pa2 dib">
          <h2 class="mv0 white f4">Dependencies</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
  .bp-multiselect.multiselect .multiselect__input,
  .bp-multiselect.multiselect .multiselect__input .multiselect__single {
    font-size: 1.2em;
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
  }

  a.router-link-active {
    opacity: 1;
    transition: opacity .2s ease-out;
  }

  a:not(.router-link-active) {
    opacity: .7;
  }
</style>
