<template>
  <div id="app">
    <h1 @click="change" class="title">{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>
<script>
// 单行注释也是可以的
/*
* @route({
 *   path: "home",
 *   name: "home",
 *   // 注意：这里 meta 字段的值只支持一层对象
 *   meta: { 
 *     requiresAuth: true,
 *     userType: "member",
 *   }
 * })
*/
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
