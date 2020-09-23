import store from '../index'
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from 'vuex-module-decorators'
class State {
  Token: string
}
// class userInfo {
@Module({
  namespaced: true,
  name: 'Exam',
  store,
  dynamic: true,
})
class UserInfo extends VuexModule implements State {
  // namespaced = true
  // state: State = new State()
  Token = ''
  getToken(state: State) {
    return state.Token
  }

  @Mutation
  TOKEN(token: string) {
    this.Token = token
  }

  // actions = {
  @Action
  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
  hideFooter(token: string) {
    this.TOKEN(token)
  }
}
export default getModule(UserInfo)
