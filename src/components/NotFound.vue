<template>
  <div>
    <h1>Sorry, that page could not be found</h1>
    <p>Would you like to return to the <router-link :to="{ name: 'BuildpackIndex' }">home</router-link> page</p>
  </div>
</template>

<style scoped>
  div {
    text-align: center;
    margin: 3em 0;
  }
</style>
