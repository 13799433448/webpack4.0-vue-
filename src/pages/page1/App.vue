<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class extends Vue {}
</script>
<style lang="scss" scoped></style>
