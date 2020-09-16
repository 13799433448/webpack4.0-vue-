<template>
  <div>
    {{ msg }}{{Token}}
  </div>
</template>

<script>
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
  }
}
</script>