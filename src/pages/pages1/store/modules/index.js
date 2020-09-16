const userInfo = {
  namespaced: true,
  state:() => ({
    Token : '123456787asddbqndbqkdjzjkeqwe2h'
  }),
  getter: {
    getToken () { 
      return state.Token
    }
  },
  mutations: {
    TOKEN (state, token) { 
      state.Token = token
    }
  },
  action: {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    hideFooter (context, token) { 
      //num为要变化的形参
      context.commit('TOKEN', token);
    }
  }
}
export default userInfo