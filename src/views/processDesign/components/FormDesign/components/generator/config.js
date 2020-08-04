/**
 *Copyright: Copyright (c) 2020
 *Author:JakHuang
 *Version 1.0
 *Title: form-generator/Element UI表单设计及代码生成器
 *GitHub: https://github.com/JakHuang/form-generator
 */
export const componentGroups = [
  {
    label: '文字',
    prop: 'text',
    list: [
      {
        __config__: {
          name: '单行文本',
          label: '单行文本',
          type: 'input',
          layout: 'colFormItem',
          icon: 'icon-basics-textfield-outlined',
          defaultValue: null,
          shouldPrint: true,
          required: false
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-input',
          props: {}
        },
        __mobile__: {
          tag: 'van-field',
          renderType: 'input',
          props: {}
        },
        placeholder: '请输入',
        maxlength: 20
      },
      {
        __config__: {
          name: '多行文本',
          label: '多行文本',
          type: 'textarea',
          layout: 'colFormItem',
          icon: 'icon-basics-mtext-outlined',
          defaultValue: null,
          shouldPrint: true,
          required: false
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-input',
          props: {
            type: 'textarea',
            rows: '2'
          }
        },
        __mobile__: {
          renderType: 'textarea',
          tag: 'van-field',
          props: {
            autosize: true,
            type: 'textarea'
          }
        },
        placeholder: '请输入',
        maxlength: 200
      },
      {
        __config__: {
          name: '说明',
          type: 'desc',
          layout: 'colFormItem',
          icon: 'icon-basics-explain-outlined',
          shouldPrint: true
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'div',
          props: {}
        },
        __mobile__: { renderType: 'desc', tag: 'tips', props: {} },
        placeholder: '请输入说明文字'
      }
    ]
  },
  {
    label: '数值',
    prop: 'number',
    list: [
      {
        __config__: {
          name: '数字',
          label: '数字',
          type: 'number',
          layout: 'colFormItem',
          icon: 'icon-basics-digit-outlined',
          defaultValue: null,
          shouldPrint: true,
          required: false
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-input-number',
          style: { width: '100%' },
          props: {
            'controls-position': 'right'
          }
        },
        __mobile__: {
          renderType: 'input',
          tag: 'van-field',
          props: {
            type: 'number'
          }
        },
        placeholder: '请输入'
      }
    ]
  },
  {
    label: '选项',
    prop: 'select',
    list: [
      {
        __config__: {
          name: '单选',
          label: '单选',
          type: 'radio',
          icon: 'icon-basics-radio-outlined',
          defaultValue: null,
          layout: 'colFormItem',
          required: false,
          shouldPrint: true,
          proCondition: true
        },
        __slot__: {
          options: [
            {
              label: '选项一',
              value: '1'
            },
            {
              label: '选项二',
              value: '2'
            }
          ]
        },
        __pc__: {
          span: 24,
          tag: 'el-radio-group',
          props: { size: 'medium' },
          style: {
            width: '100%'
          }
        },
        __mobile__: {
          renderType: 'select',
          tag: 'van-field-select-picker',
          props: {}
        },
        placeholder: '请选择'
      },
      {
        __config__: {
          name: '多选',
          label: '多选',
          type: 'checkbox',
          icon: 'icon-basics-checkbox-outlined',
          defaultValue: [],
          layout: 'colFormItem',
          shouldPrint: true,
          required: false,
          proCondition: true
        },
        __slot__: {
          options: [
            {
              label: '选项一',
              value: 1
            },
            {
              label: '选项二',
              value: 2
            }
          ]
        },
        __pc__: {
          span: 24,
          tag: 'el-checkbox-group',
          style: {
            width: '100%'
          },
          props: {}
        },
        __mobile__: {
          renderType: 'select',
          tag: 'multi-picker',
          props: {}
        },
        placeholder: '请选择'
      }
    ]
  },
  {
    label: '日期',
    prop: 'date',
    list: [
      {
        __config__: {
          name: '日期',
          label: '日期',
          type: 'date',
          icon: 'icon-basics-date-outlined',
          defaultValue: null,
          span: 24,
          layout: 'colFormItem',
          shouldPrint: true,
          required: false
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-date-picker',
          props: {
            type: 'date',
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd'
          },
          style: { width: '100%' }
        },
        __mobile__: {
          renderType: 'select',
          tag: 'van-field-datetime-picker',
          props: {
            pickerType: 'date',
            props: {}
          }
        },
        placeholder: '请选择'
      },
      {
        __config__: {
          name: '日期区间',
          label: '日期区间',
          type: 'daterange',
          icon: 'icon-basics-daterange-outlined',
          layout: 'colFormItem',
          defaultValue: [],
          shouldPrint: true,
          required: false
        },
        __slot__: {},
        __pc__: {
          span: 24,
          tag: 'el-date-picker',
          props: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
            format: 'yyyy-MM-dd',
            'value-format': 'yyyy-MM-dd'
          },
          style: { width: '100%' }
        },
        __mobile__: {
          renderType: 'daterange',
          noLabel: true,
          tag: 'date-range-picker',
          props: {
            pickerType: 'date',
            startLabel: '开始时间',
            endLabel: '结束时间',
            placeholder: '请选择',
            autoCalc: true
          }
        }
      }
    ]
  }
]
