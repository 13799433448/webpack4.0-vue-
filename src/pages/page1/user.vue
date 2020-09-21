<template>
  <div>
    <h1 @click="change" class="title">{{ msg }}</h1>
  </div>
</template>

<script>
/**
 * 
 *
 * @route("/user")
 * 
 */
export default {
  
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