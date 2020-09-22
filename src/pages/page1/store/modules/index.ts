import { ActionContext } from 'vuex'
class State {
  Token  = ''
}
class userInfo {
  namespaced = true
  state: State = new State()
  getter = {
    getToken(state: State) {
      return state.Token
    },
  }

  mutations = {
    TOKEN(state: State, token: string) {
      state.Token = token
    },
  }
  actions = {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    hideFooter(context: ActionContext<State, any>, token: string) {
      //num为要变化的形参
      context.commit('TOKEN', token)
    },
  }
}
export default userInfo
