<template>
  <div>
    <h1 @click="change" class="title">{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
  /**
   *
   *
   * @route('/user')
   *
   */
  import { Vue, Component } from "vue-property-decorator"
  @Component
  export default class YourComponent extends Vue {
    msg = "这是 User 页面"

    change(): void {
      this.$router.push({
        path: "sys",
      })
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    color: rgb(83, 179, 28);
  }
</style>
