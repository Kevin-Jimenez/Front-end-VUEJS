<template>
  <div class="#app">
    <CrudApp/>
    <v-data-table/>
  </div>
</template>

<script>
import CrudApp from './components/CrudApp.vue'

export default {
  name: 'App',
  components: {
    CrudApp
  }
}
</script>

<style>

</style>
