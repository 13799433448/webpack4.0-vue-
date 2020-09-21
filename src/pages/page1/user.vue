<template>
  <div>
    <h1 @click="change" class="title">{{ msg }}</h1>
  </div>
</template>

<script>


export default {
  /**
 * 
 * 简单配置：
 * 第二个参数将作为 alias
 * @route("user/:id")
 * 
 */
  data () {
    return {
      msg: '这是 User 页面'
    }
  },
  
  methods: {
    change(){
      this.$router.push({
        path: 'sys'
      })
    }
  },
   created(){
    console.log(1111)
  }
}
</script>
<style lang="scss" scoped>
 .title {
   color: rgb(83, 179, 28);
 }
</style>