<template>
  <div>
    <h1 @click="change">{{ msg }}{{ Token }}</h1>
    <h1 @click="back">回到home</h1>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import userInfo from './store/modules/index'
  /**
   *
   * 简单配置：
   * 第二个参数将作为 alias
   * @route('/sys')
   *
   */
  // , mapGetters, mapMutations, mapActions
  @Component
  export default class extends Vue {
    msg = 'Welcome to Your Sys.js'
    get Token(): string {
      return userInfo.Token
    }
    change(): void {
      // 跳转到其他模块的某个页面下就这样咯
      // window.location.href = '/page2.html#/exchange'
      window.location.href = '/page2.html'
      // this.$router.push({
      //   path: '/page2.html'
      // })
    }
    back(): void {
      // window.location.href = '/page1.html'
      this.$router.push({
        path: 'home',
      })
    }
  }
</script>
