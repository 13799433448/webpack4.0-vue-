import Vue from "vue"
import Element from "element-ui"

interface Com {
  [key: string]: any;
}

const componentObj: Com = {
  'Element': Element,
}

const componentsHandler = {
  install(): void {
    Object.keys(componentObj).forEach((key) => Vue.use(componentObj[key]))
  },
}

export default componentsHandler
