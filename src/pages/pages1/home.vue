<template>
  <div id="app">
    <h1 @click="change" class="title">{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "点我切换1",
    };
  },
  methods: {
    change() {
      this.$router.push({
        path: "/user",
        query: {
          id: 12346
        }
      });
    }
  },
  created() {
    console.log('home')
  }
};
</script>
<style lang="scss" scoped>
 .title {
   color: aqua;
 }
</style>
