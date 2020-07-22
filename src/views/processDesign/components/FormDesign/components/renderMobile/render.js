import { deepClone } from '../../utils/index'

const component = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__mobile__.renderType
 * 文件内容为函数返回VNode
 */
const slotsFiles = require.context('./slots', false, /\.js$/)
const keys = slotsFiles.keys() || []
keys.forEach((key) => {
  const type = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = slotsFiles(key).default
  component[type] = value
})

export default {
  name: 'RenderMobileItem',
  render(h) {
    const confClone = deepClone(this.conf)
    const node = []
    const childFunc = component[confClone.__mobile__.renderType]
    if (childFunc) {
      node.push(childFunc(h, confClone))
    }
    return node
  },
  props: ['conf']
}
