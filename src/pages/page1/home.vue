<template>
  <div>
    <h1 class="title" @click="change">111</h1>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  // 单行注释也是可以的
  /*
   * @route({
   *   path: "/home",
   *   name: "home",
   *   // 注意：这里 meta 字段的值只支持一层对象
   *   meta: {
   *     requiresAuth: true,
   *     userType: "member",
   *   }
   * })
   */

  @Component
  export default class extends Vue {
    msg = "点我切换1"
    get msgA(): string {
      return "11111"
    }
    change(): void {
      this.$router.push({
        path: "/user",
      })
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    color: aqua;
  }
</style>
