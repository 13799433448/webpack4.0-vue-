<template>
  <div id="app">
    <h1 @click="change">{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "点我切换",
    };
  },
  methods: {
    change() {
      this.$router.push({
        path: "/user",
      });
    },
  },
};
</script>
