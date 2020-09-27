import store from "../index"
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators"

interface State {
  Token: string
}

@Module({
  namespaced: true,
  name: "Exam",
  store,
  dynamic: true,
})
class UserModule extends VuexModule implements State {
  Token = ""

  @Action
  setToken(val: string) {
    this.SET_TOKEN(val)
  }

  @Mutation
  SET_TOKEN(val: string) {
    this.Token = val
  }

  get getToken() {
    return this.Token
  }
}

export default getModule(UserModule)
