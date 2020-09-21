<template>
  <div >
    <h1 @click="change"> {{ msg }}{{Token}} </h1>
    <h1 @click="back">回到pages1</h1>
  </div>
</template>

<script>
/**
 * 
 * 简单配置：
 * 第二个参数将作为 alias
 * @route("/sys")
 * 
 */
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      msg: 'Welcome to Your Sys.js'
    }
  },
  computed: {
     ...mapState('userInfo',[
        'Token'
    ]),
  },
  methods: {
    change(){
      // 跳转到其他模块的某个页面下就这样咯
      // window.location.href = '/page2.html#/exchange'
      window.location.href = '/page2.html'
      // this.$router.push({
      //   path: '/page2.html'
      // })
    },
    back() {
      window.location.href = "/page1.html";
    }
  }
}
</script>