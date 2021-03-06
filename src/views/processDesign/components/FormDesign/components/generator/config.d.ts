declare class FieldItem {
  __config__: Config
  // 子属性，一般指选项数据
  __slot__: { options?: object[] }
  __pc__: PCConfig
  __mobile__: MobileConfig
}

interface Config {
  // 控件名
  name: '单行文本' | '多行文本' | '说明' | '数字' | '单选' | '多选' | '日期' | '日期区间'
  // 控件标签，初始值是控件名
  label: string
  //  '单行文本'| '多行文本' | '说明' |  '数字'  | '单选'  |   '多选'   | '日期' | '日期区间'
  type: 'input' | 'textarea' | 'desc' | 'number' | 'radio' | 'checkbox' | 'date' | 'daterange'
  //       单组件布局 | 复合组件布局（暂时不做）
  layout: 'colFormItem' | 'rowFormItem'
  // 图标
  icon: string
  // 默认值, 除不可填的选项外defaultValue不能为undefined
  defaultValue?: string | string[]
  // 该字段是否打印
  shouldPrint: boolean
  // 该字段是否必填
  required: boolean
  // 该字段是否可作为流程条件
  proCondition: boolean
}
interface PCConfig {
  // 渲染组件时使用的tag
  tag: string
  // 该选项占用的行数
  span: number
  // 渲染组件时传递的props
  props?: object
  // 渲染组件时传递的style
  style?: object
}
interface MobileConfig {
  // 渲染组件时使用的tag
  tag: string
  // 表单设计器里移动端控件渲染类型,各自对应 src\views\processDesign\components\FormDesign\components\renderMobile\slots 下的渲染函数的文件名
  renderType: 'input' | 'textarea' | 'desc' | 'select' | 'daterange'
  // 没有标签
  noLabel?: boolean
  // 渲染组件时传递的props
  props?: object
  // 渲染组件时传递的style
  style?: object
}
