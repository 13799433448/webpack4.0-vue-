<template>
  <div id="app">
    <el-button type="primary" @click="change">{{ msg }}</el-button>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script lang="ts">
  // 单行注释也是可以的
  /*
   * @route({
   *   path: '/home',
   *   name: 'home',
   *   // 注意：这里 meta 字段的值只支持一层对象
   *   meta: {
   *     requiresAuth: true,
   *     userType: "member",
   *   }
   * })
   */
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class extends Vue {
    msg = '点我切换1'
    change(): void {
      this.$message.success('转换')
      this.$router.push({
        path: '/user',
      })
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    color: aqua;
  }
</style>
