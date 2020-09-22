<template>
  <div id="page2">
    <div @click="change">page2</div>
  </div>
</template>
<script>
  export default {
    methods: {
      change() {
        // 跳转到其他模块的某个页面下就这样咯
        // window.location.href = '/page2.html#/exchange'
        window.location.href = '/pages1.html#/sys'
        // this.$router.push({
        //   path: '/page2.html'
        // })
      },
    },
  }
</script>
