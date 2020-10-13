import { deepClone } from '../../utils/index'
// const useChange = [ 'el-checkbox-group' ]

function vModel(self, dataObject, defaultValue) {
  dataObject.props.value = defaultValue
  // if(useChange.includes(conf.__config__.tag)){
  //   dataObject.on.change = (val) => {
  //     self.$emit('input', val)
  //   }
  // }else{
  dataObject.on.input = (val) => {
    self.$emit('input', val)
  }
  // }
}

const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.type
 * 文件内容为value，解析JSON配置中的__slot__
 */
const slotsFiles = require.context('./slots', false, /\.js$/)
const keys = slotsFiles.keys() || []
keys.forEach((key) => {
  const type = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = slotsFiles(key).default
  componentChild[type] = value
})

export default {
  name: 'RenderItem',
  render(h) {
    const dataObject = {
      attrs: {},
      props: {},
      on: {},
      style: {}
    }
    if (this.conf.__pc__.tag !== 'div') {
      dataObject.nativeOn = {}
    }
    const confClone = deepClone(this.conf)
    const children = []

    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    const childFunc = componentChild[confClone.__config__.type]
    if (childFunc) {
      children.push(childFunc(h, confClone))
    }

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    const privateProps = ['__config__', '__slot__', '__mobile__', '__pc__', 'renderKey', 'children']
    Object.keys(confClone).forEach((key) => {
      const val = confClone[key]
      if (privateProps.includes(key)) {
        return
      }
      if (key === '__vModel__') {
        vModel(this, dataObject, confClone.__config__.defaultValue, confClone)
      } else {
        dataObject.attrs[key] = val
      }
    })
    confClone.__pc__ &&
      Object.keys(confClone.__pc__).forEach((key) => {
        if (dataObject[key]) {
          dataObject[key] = { ...dataObject[key], ...confClone.__pc__[key] }
        }
      })

    return h(this.conf.__pc__.tag, dataObject, children)
  },
  props: ['conf']
}
