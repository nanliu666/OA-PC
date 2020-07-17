<template>
  <div class="test-form">
    <parser
      :form-conf="formConf"
      @submit="sumbitForm"
    />
  </div>
</template>

<script>
import Parser from '../Parser'

export default {
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      formConf: {
        fields: [
          {
            __config__: {
              name: '单行文本',
              label: '姓名',
              type: 'input',
              layout: 'colFormItem',
              icon: 'icon-basics-textfield-outlined',
              shouldPrint: true,
              required: true,
              formId: 1,
              renderKey: 1594631430990,
              defaultValue: ''
            },
            __slot__: {},
            __pc__: { span: 24, tag: 'el-input', props: {} },
            __mobile__: { tag: 'van-field', renderType: 'input', props: {} },
            placeholder: '请输入',
            maxlength: 20,
            __vModel__: 'field1'
          },
          {
            __config__: {
              name: '多行文本',
              label: '备注',
              type: 'textarea',
              layout: 'colFormItem',
              icon: 'icon-basics-mtext-outlined',
              shouldPrint: true,
              required: true,
              formId: 2,
              renderKey: 1594631431915
            },
            __slot__: {},
            __pc__: { span: 24, tag: 'el-input', props: { type: 'textarea', rows: '2' } },
            __mobile__: {
              renderType: 'textarea',
              tag: 'van-field',
              props: { autosize: true, type: 'textarea' }
            },
            placeholder: '请输入',
            maxlength: 200,
            __vModel__: 'field2'
          },
          {
            __config__: {
              name: '说明',
              type: 'desc',
              layout: 'colFormItem',
              icon: 'icon-basics-explain-outlined',
              shouldPrint: true,
              formId: 3,
              renderKey: 1594631432943
            },
            __slot__: {},
            __pc__: { span: 24, tag: 'div', props: {} },
            __mobile__: { renderType: 'desc', tag: 'tips', props: {} },
            placeholder: 'hello'
          },
          {
            __config__: {
              name: '数字',
              label: '年龄',
              type: 'number',
              layout: 'colFormItem',
              icon: 'icon-basics-digit-outlined',
              shouldPrint: true,
              required: true,
              formId: 4,
              renderKey: 1594631433763
            },
            __slot__: {},
            __pc__: {
              span: 12,
              tag: 'el-input-number',

              props: { 'controls-position': 'right' }
            },
            __mobile__: { renderType: 'input', tag: 'van-field', props: { type: 'number' } },
            placeholder: '请输入',
            __vModel__: 'field4'
          },
          {
            __config__: {
              name: '单选',
              label: '单选',
              type: 'radio',
              icon: 'icon-basics-radio-outlined',
              defaultValue: 2,
              layout: 'colFormItem',
              required: true,
              shouldPrint: true,
              formId: 5,
              renderKey: 1594631434747
            },
            __slot__: {
              options: [
                { label: '选项一', value: 1 },
                { label: '选项二', value: 2 }
              ]
            },
            __pc__: {
              span: 12,
              tag: 'el-radio-group',
              props: { size: 'medium' },
              style: { width: '100%' }
            },
            __mobile__: { renderType: 'select', tag: 'van-field-select-picker', props: {} },
            placeholder: '请选择',
            __vModel__: 'field5'
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
              required: true,
              formId: 6,
              renderKey: 1594631435830
            },
            __slot__: {
              options: [
                { label: '选项一', value: 1 },
                { label: '选项二', value: 2 },
                { label: '选项三', value: '选项三' }
              ]
            },
            __pc__: { span: 12, tag: 'el-checkbox-group', style: { width: '100%' }, props: {} },
            __mobile__: { renderType: 'select', tag: 'multi-picker', props: {} },
            placeholder: '请选择',
            __vModel__: 'field6'
          },
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
              required: true,
              formId: 7,
              renderKey: 1594631437841
            },
            __slot__: {},
            __pc__: {
              span: 12,
              tag: 'el-date-picker',
              props: { type: 'date', format: 'yyyy-MM-dd', 'value-format': 'yyyy-MM-dd' },
              style: { width: '100%' }
            },
            __mobile__: {
              renderType: 'select',
              tag: 'van-field-datetime-picker',
              props: { pickerType: 'date', props: {} }
            },
            placeholder: '请选择',
            __vModel__: 'field7'
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
              required: true,
              formId: 8,
              renderKey: 1594631438922
            },
            __slot__: {},
            __pc__: {
              span: 12,
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
            },
            __vModel__: 'field8'
          }
        ]
      }
    }
  },
  methods: {
    sumbitForm(data) {
      // eslint-disable-next-line no-console
      console.log('sumbitForm1提交数据：', data)
    }
  }
}
</script>

<style lang="stylus" scoped>
.test-form {
  margin: 15px auto;
  width: 800px;
  padding: 15px;
}
</style>
