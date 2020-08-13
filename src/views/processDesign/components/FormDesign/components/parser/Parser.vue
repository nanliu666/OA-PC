<script>
/**
 * Copyright: Copyright (c) 2020
 * Author:JakHuang
 * Version 1.0
 * Title: form-generator/ElementUI表单设计及代码生成器
 * GitHub: https://github.com/JakHuang/form-generator
 */
import { deepClone } from '../../utils/index'
import render from '../render/render.js'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}

function renderFrom(h) {
  const { formConfCopy } = this

  return (
    <el-row gutter={16} class="parser-form">
      <el-form
        size="medium"
        label-position="top"
        disabled={formConfCopy.disabled}
        ref="form"
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this.form }}
        rules={this.rules}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}

        {// 控制按钮是否渲染
        formConfCopy.showBtn ? formBtns.call(this, h) : null}
      </el-form>
    </el-row>
  )
}

// eslint-disable-next-line no-unused-vars
function formBtns(h) {
  return (
    <el-col>
      <el-form-item size="large">
        <el-button type="primary" onClick={this._submitForm}>
          提交
        </el-button>
        <el-button onClick={this.resetForm}>重置</el-button>
      </el-form-item>
    </el-col>
  )
}

function renderFormItem(h, elementList = []) {
  return elementList.map((scheme) => {
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.__config__
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

const layouts = {
  // 单个元素渲染
  colFormItem(h, scheme) {
    const config = scheme.__config__
    return (
      <el-col span={scheme.__pc__.span} class="parser-item">
        <el-form-item
          prop={scheme.__vModel__}
          label={config.label}
          style={typeof config.defaultValue === 'undefined' ? 'margin-bottom:0' : ''}
        >
          <render
            conf={scheme}
            onInput={(event) => {
              this.$set(config, 'defaultValue', event)
              this.$set(this.form, scheme.__vModel__, event)
            }}
          />
        </el-form-item>
      </el-col>
    )
  },
  // 父元素渲染，暂时不做
  rowFormItem(h, scheme) {
    let child = renderChildren.apply(this, arguments)
    if (scheme.type === 'flex') {
      child = (
        <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
          {child}
        </el-row>
      )
    }
    return (
      <el-col span={scheme.__pc__.span}>
        <el-row gutter={scheme.gutter}>{child}</el-row>
      </el-col>
    )
  }
}

export default {
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formConfCopy: {},
      form: {},
      rules: {}
    }
  },
  computed: {},
  watch: {
    form: {
      handler(val) {
        this.$emit('update:formData', val)
      },
      deep: true
    }
  },
  mounted() {
    this.init(this.formConf)
  },
  methods: {
    init(conf) {
      if (this._.isEmpty(conf)) {
        return
      }
      const form = {},
        rules = {}
      this.formConfCopy = deepClone(conf)
      this.initFormData(conf.fields, form)
      this.buildRules(conf.fields, rules)
      this.form = form
      this.rules = rules
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 构建data属性
    initFormData(componentList = [], formData) {
      componentList.forEach((cur) => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    // 构建校验规则
    buildRules(componentList = [], rules = {}) {
      componentList.forEach((cur) => {
        const config = cur.__config__

        if (config.required) {
          const required = {
            required: config.required,
            message: null,
            trigger: null
          }
          if (Array.isArray(config.defaultValue) && config.type !== 'daterange') {
            required.type = 'array'
            required.message = `请至少选择一个${config.label}`
          }
          required.trigger = ruleTrigger[cur.__pc__.tag] || 'input'
          if (!required.message) {
            required.message = (required.trigger === 'change' ? '请选择' : '请输入') + config.label
          }
          rules[cur.__vModel__] = required
        }
      })
    },
    // 重置方法
    resetForm() {
      // this.formConfCopy = deepClone(this.formConf)
      this.$refs.form.resetFields()
    },
    getFieldContent(field) {
      let options = field.__slot__.options
      let content
      const form = this.form
      if (options && Array.isArray(form[field.__vModel__])) {
        content = options
          .filter((option) => form[field.__vModel__].includes(option.value))
          .map((option) => option.label)
          .join(',')
      } else if (options) {
        content = options
          .filter((option) => form[field.__vModel__] === option.value)
          .map((option) => option.label)
          .join(',')
      } else if (field.__config__.type === 'daterange') {
        content = form[field.__vModel__].join(' 至 ')
      } else {
        content = form[field.__vModel__]
      }
      return content
    },
    // 将form对象封装成包含字段信息的对象数组
    genFormFields(form) {
      const formFields = []
      this.formConfCopy.fields.forEach((item) => {
        if (typeof item.__vModel__ !== 'undefined') {
          formFields.push({
            label: item.__config__.label,
            prop: item.__vModel__,
            value: form[item.__vModel__],
            content: this.getFieldContent(item)
          })
        }
      })
      return formFields
    },
    // 内部按钮调用的提交方法
    _submitForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        // 触发sumit事件
        this.$emit('submit', { formData: this.form, formFields: this.genFormFields(this.form) })
        return true
      })
    },
    // 外部调用的提交方法
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate((valid) => {
          if (!valid) {
            reject()
            return
          }
          resolve({ formData: this.form, formFields: this.genFormFields(this.form) })
        })
      })
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>
<style lang="stylus">
.parser-form {
  background: #fff;
  .el-checkbox-group {
    height: 34px;
  }
}
.parser-item .placeholder {
  color: #757c85;
}
</style>
