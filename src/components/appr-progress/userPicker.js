const defaults = {
  multiple: false
}
import Vue from 'vue'
import userPickerVue from './userPicker.vue'

const UserPickerConstructor = Vue.extend(userPickerVue)

let instance

const initInstance = () => {
  instance = new UserPickerConstructor({
    el: document.createElement('div')
  })
}

const UserPicker = function(selectedList, options) {
  if (Vue.prototype.$isServer) return

  if (!instance) {
    initInstance()
  }
  options = Object.assign({}, defaults, options)
  for (let prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop]
    }
  }

  if (!instance.visible) {
    Vue.nextTick(() => {
      instance.init(selectedList)
      instance.visible = true
    })
  }
}

export default UserPicker
