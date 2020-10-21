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
  'image-upload': 'change',
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
        label-position={formConfCopy.labelPosition ? formConfCopy.labelPosition : 'top'}
        label-width={formConfCopy.labelWidth ? formConfCopy.labelWidth : '100%'}
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

function renderItemList(h, list) {
  if (!Array.isArray(list)) return null
  return renderFormItem.call(this, h, list)
}

const rowTemplates = {
  detail(h, element) {
    const formPrivilege = element.__config__.formPrivilege
    const addPart = (
      <div
        class="parser-item__detail--footer"
        onClick={() => {
          addElementChild.call(this, element)
        }}
      >
        ＋ 添加{element.__config__.label}
      </div>
    )
    const wrapItem = () => {
      return (
        <el-col
          span={element.__pc__.span}
          class={`parser-item parser-item__detail ${
            this.formConfCopy.isDetail ? 'parser-item-detail' : ''
          }`}
        >
          {element.children.map((child, index) => (
            <div class="parser-item__detail--item">
              <div class="parser-item__detail--header">
                <span class="parser-item__detail--title">
                  {element.__config__.label}
                  {element.children.length > 1 ? index + 1 : ''}
                </span>
                {index > 0 && formPrivilege === 0 ? (
                  <i
                    class="icon-basics-delete-outlined iconfont"
                    onClick={() => {
                      element.children.splice(index, 1)
                    }}
                  ></i>
                ) : null}
              </div>
              <el-row class="parser-item__detail--content">
                {renderItemList.call(this, h, child)}
              </el-row>
            </div>
          ))}
          {formPrivilege === 0 ? addPart : ''}
        </el-col>
      )
    }
    let renderItem = ''
    // formPrivilege表单权限验证，0可编辑，1只读，2隐藏
    switch (formPrivilege) {
      case 1:
        // 是否在详情页，详情页与发起审批页展示不一
        if (this.formConfCopy.isDetail) {
          // 详情页，有默认值显示默认值，无默认值不显示这个标签
          let defaultValueList = []
          element.children.forEach((item) => {
            item.map((deepItem) => {
              defaultValueList.push(deepItem.__config__.defaultValue)
            })
          })
          renderItem = _.some(defaultValueList, Boolean) ? wrapItem() : ''
        } else {
          // 审批发起页面，只读权限表现为置灰处理
          renderItem = wrapItem()
        }
        break
      case 2:
        renderItem = ''
        break
      default:
        // 兼容旧版本
        renderItem = wrapItem()
        break
    }
    return renderItem
  }
}
// formId最大值
function getMaxId(fieldList) {
  if (fieldList.length) {
    return fieldList.reduce((maxId, cmp) => {
      cmp.__config__.formId > maxId && (maxId = cmp.__config__.formId)
      if (Array.isArray(cmp.children)) {
        let children = _.flatten(cmp.children)
        maxId = children.reduce((max, child) => Math.max(max, child.__config__.formId), maxId)
      }
      return maxId
    }, 0)
  }
  return 0
}
function addElementChild(element) {
  const childCopy = _.cloneDeep(element.__config__.children)
  const nextId = getMaxId(this.formConfCopy.fields) + 1
  childCopy.forEach((item, index) => {
    let formId = nextId + index
    item.__vModel__ = 'field' + formId
    item.__config__.formId = formId
  })
  element.children.push(childCopy)
  this.rules = this.buildRules(this.formConfCopy.fields, this.rules)
}
const layouts = {
  // 单个元素渲染
  colFormItem(h, scheme) {
    const config = scheme.__config__
    const MONEY_LABEL =
      config.type === 'money'
        ? ` ${((currency) => {
            switch (currency) {
              case 'CNY':
                return '（人民币/元）'
              case 'USD':
                return '（美元/元）'
              default:
                return ''
            }
          })(config.currency)}`
        : ''
    const formPrivilege = config.formPrivilege
    const defaultRender = (
      <render
        conf={scheme}
        onInput={(event) => {
          this.$set(config, 'defaultValue', event)
          this.$set(this.form, scheme.__vModel__, event)
        }}
      />
    )
    const valueRender = <span>{this.getFieldContent(scheme)}</span>
    const wrapItem = function(isDefault) {
      return (
        <el-col span={scheme.__pc__.span} class="parser-item">
          <el-form-item
            prop={scheme.__vModel__}
            label={`${_.get(config, 'label', '')}${MONEY_LABEL}`}
            style={config.type === 'desc' ? 'margin-bottom:0' : ''}
          >
            {getRender(isDefault)}
          </el-form-item>
        </el-col>
      )
    }
    const getRender = function(isDefault) {
      if (!isDefault) {
        if (scheme.__config__.type === 'image') {
          return uploadImageRender()
        } else if (scheme.__config__.type === 'file') {
          return uploadFileRender()
        } else {
          return valueRender
        }
      } else {
        return defaultRender
      }
    }
    const uploadImageRender = function() {
      const fileList = scheme.__config__.defaultValue
      return fileList.map((item) => {
        return (
          <el-image
            class="thumbnail-image"
            fit="fill"
            src={item.url}
            previewSrcList={_.map(fileList, ({ url }) => url)}
          />
        )
      })
    }
    const uploadFileRender = function() {
      const fileList = scheme.__config__.defaultValue
      return fileList.map((item) => {
        return (
          <li>
            <i class="el-icon-document" style="margin-right: 4px;" />
            <span>{item.localName}</span>
          </li>
        )
      })
    }
    const descRender = (
      <el-col span={scheme.__pc__.span} class="parser-item">
        <el-form-item
          prop={scheme.__vModel__}
          label={`${config.label ? `${config.label}:` : ''}`}
          style={config.type === 'desc' ? 'margin-bottom:0' : ''}
        >
          {defaultRender}
        </el-form-item>
      </el-col>
    )
    let renderItem = ''
    // formPrivilege表单权限验证，0可编辑(默认)，1只读，2隐藏
    switch (formPrivilege) {
      case 1:
        // 是否在详情页，详情页与发起审批页展示不一
        if (this.formConfCopy.isDetail) {
          // 详情页，有默认值显示默认值，无默认值不显示这个标签
          if (scheme.__config__.type === 'desc') {
            renderItem = descRender
          } else {
            scheme.__mobile__.props.disabled = true
            renderItem = scheme.__config__.defaultValue ? wrapItem(false) : ''
          }
        } else {
          // 审批发起页面，只读权限表现为置灰处理
          scheme.__pc__.props.disabled = true
          renderItem = wrapItem(true)
        }
        break
      case 2:
        renderItem = ''
        break
      default:
        // 兼容旧版本与权限为0--可编辑
        scheme.__pc__.props.disabled = false
        renderItem = wrapItem(true)
        break
    }
    return renderItem
  },
  rowFormItem(h, scheme) {
    let child = renderItemList.apply(this, h, scheme.__config__.children)
    if (rowTemplates[scheme.__config__.type]) {
      return rowTemplates[scheme.__config__.type].call(this, h, scheme)
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
      if (_.isEmpty(conf)) {
        return
      }
      const form = {},
        rules = {}
      this.formConfCopy = deepClone(conf)
      this.initFormData(conf.fields, form)
      this.buildRules(conf.fields, rules)
      this.form = form
      this.rules = rules
      this.resolveField(this.formConfCopy.fields)
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    // 构建data属性
    initFormData(componentList = [], formData) {
      componentList.forEach((cur) => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (cur.children) this.initFormData(cur.children, formData)
      })
    },
    resolveField(fields) {
      fields.forEach((field) => {
        if (field.__config__.type === 'detail' && !this.formConfCopy.isDetail) {
          addElementChild.call(this, field)
        }
      })
    },
    buildRule(field, rules) {
      const config = field.__config__

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
        required.trigger = ruleTrigger[field.__pc__.tag] || 'input'
        if (!required.message) {
          required.message = (required.trigger === 'change' ? '请选择' : '请输入') + config.label
        }
        rules[field.__vModel__] = required
      }
    },
    // 构建校验规则
    buildRules(componentList = [], rules = {}) {
      componentList.forEach((cur) => {
        if (cur.__config__.type !== 'detail') {
          this.buildRule(cur, rules)
        }
        if (cur.children) {
          _.flatten(cur.children).forEach((item) => this.buildRule(item, rules))
        }
      })
      return rules
    },
    // 重置方法
    resetForm() {
      // this.formConfCopy = deepClone(this.formConf)
      this.$refs.form.resetFields()
    },
    getFieldContent(field) {
      let options = field.__slot__.options
      let content
      if (options && Array.isArray(field.__config__.defaultValue)) {
        content = options
          .filter((option) => field.__config__.defaultValue.includes(option.value))
          .map((option) => option.label)
          .join(',')
      } else if (options) {
        content = options
          .filter((option) => field.__config__.defaultValue === option.value)
          .map((option) => option.label)
          .join(',')
      } else if (field.__config__.type === 'daterange') {
        content = field.__config__.defaultValue.join(' 至 ')
      } else {
        content = field.__config__.defaultValue
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
            content: this.getFieldContent(item),
            span: item.__pc__.span || 12
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
<style lang="scss" scoped>
@import '~@/styles/variables';
.thumbnail-image {
  width: 80px;
  height: 80px;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  margin: 0 8px 8px 0;
}
.parser-form {
  background: #fff;
  .el-checkbox-group {
    height: 34px;
  }
}
.parser-item .placeholder {
  color: #757c85;
}
.parser-item {
  &__detail {
    margin-bottom: 20px;
    &--item {
      border: 1px solid #ccc;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    &--header {
      display: flex;
      line-height: 32px;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      align-items: center;
      justify-content: space-between;
      i {
        cursor: pointer;
        color: #999;
      }
    }
    &--content {
      padding: 6px 10px;
    }
    &--footer {
      margin-top: 10px;
      text-align: center;
      border: 1px dashed #ccc;
      line-height: 32px;
      cursor: pointer;
      &:hover {
        color: $primaryColor;
      }
    }
  }
}
.parser-item-detail {
  .parser-item__detail {
    &--item {
      border: 0px solid #ccc;
      border-bottom: 1px dashed #ccc;
      padding-bottom: 10px;
      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
    &--header {
      border-bottom: 0px solid #ccc;
      font-size: 16px;
      font-weight: 550;
    }
    &--content {
      padding: 0;
    }
  }
}
</style>
