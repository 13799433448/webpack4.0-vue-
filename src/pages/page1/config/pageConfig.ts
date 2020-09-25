import Vue from 'vue'
import Element from 'element-ui'

const components = {
  Element,
}

const componentsHandler = {
  install(): void {
    Object.keys(components).forEach((key) => Vue.use(components[key]))
  },
}

export default componentsHandler
