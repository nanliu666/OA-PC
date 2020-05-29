/*
  注释掉的字段将从其他位置传入
*/
export const elFormAttrs = [
  // "model",
  // "rules",
  'labelPosition',
  'labelWidth',
  'labelSuffix',
  'inline',
  'inlineMessage',
  'statusIcon',
  'showMessage',
  'size',
  'disabled',
  'validateOnRuleChange',
  'hideRequiredAsterisk'
]

export const elFormItemAttrs = [
  // 'label',
  'labelWidth',
  'prop',
  // 'required',
  // 'rules',
  'error',
  'validateStatus',
  'inlineMessage',
  'showMessage',
  'size'
]

export const itemTypes = [
  'input',
  'select',
  'radio',
  'checkbox',
  'cascader',
  // 'switch',
  // 'slider',
  // 'timePicker',
  'datePicker', // 日期选择器
  // 'dateTimePicker', // 日期时间选择器
  // 'rate', // 评分
  'slot'
]

export const noneItemAttrs = [
  ...elFormItemAttrs,
  'span',
  'offset',
  'options',
  'itemType',
  'placeholder',
  'onlyNumber',
  'rules'
]

// 表单组件默认属性
export const defaultAttrs = {
  datePicker: {
    valueFormat: 'yyyy-MM-dd'
  }
}
