<template>
  <div>
    <h1 @click="change">{{ msg }}</h1>
  </div>
</template>

<script>


export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js'
    }
  },
  
  methods: {
    change(){
      this.$router.push({
        path: '/sys'
      })
    }
  }
}
</script>