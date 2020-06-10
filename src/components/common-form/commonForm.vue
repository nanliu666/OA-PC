<template>
  <el-form
    ref="form"
    :model="model"
    v-bind="elFormAttrs"
  >
    <el-row>
      <el-col
        v-for="column in columns"
        :key="column.prop"
        :span="column.span ? column.span : 10"
        :offset="column.offset ? column.offset : 0"
      >
        <el-form-item
          :label="`${column.label}${column.props && column.props.hideColon ? '' : '：'}`"
          v-bind="elFormItemAttrs(column)"
          :rules="getRules(column)"
        >
          <el-input
            v-if="column.itemType == 'input'"
            v-model="model[column.prop]"
            v-bind="itemAttrs(column)"
            :placeholder="column.placeholder ? column.placeholder : `请输入${column.label}`"
            @input="column.props && column.props.onlyNumber && inputNumber($event, column)"
          />
          <el-select
            v-if="column.itemType == 'select'"
            v-model="model[column.prop]"
            v-bind="itemAttrs(column)"
            :placeholder="column.placeholder ? column.placeholder : `请选择${column.label}`"
          >
            <el-option
              v-for="item in column.options"
              :key="item[(column.props && column.props.value) || 'value']"
              :label="
                column.props
                  ? (column.props.formatter && item.formatter(item)) ||
                    item[column.props.label || 'label']
                  : item.label
              "
              :value="item[(column.props && column.props.value) || 'value']"
            />
          </el-select>
          <el-radio-group
            v-if="column.itemType == 'radio'"
            v-model="model[column.prop]"
            v-bind="itemAttrs(column)"
            :placeholder="column.placeholder ? column.placeholder : `请选择${column.label}`"
          >
            <el-radio
              v-for="item in column.options"
              :key="item[(column.props && column.props.value) || 'value']"
              :label="item[(column.props && column.props.value) || 'value']"
            >
              {{
                column.props
                  ? (column.props.formatter && item.formatter(item)) ||
                    item[column.props.label || 'label']
                  : item.label
              }}
            </el-radio>
          </el-radio-group>
          <el-checkbox-group
            v-if="column.itemType == 'checkbox'"
            v-model="model[column.prop]"
            v-bind="itemAttrs(column)"
            :placeholder="column.placeholder ? column.placeholder : `请选择${column.label}`"
          >
            <el-checkbox
              v-for="item in column.options"
              :key="item[(column.props && column.props.value) || 'value']"
              :value="item[(column.props && column.props.value) || 'value']"
            >
              {{
                column.props
                  ? (column.props.formatter && item.formatter(item)) ||
                    item[column.props.label || 'label']
                  : item.label
              }}
            </el-checkbox>
          </el-checkbox-group>
          <el-cascader
            v-if="column.itemType == 'cascader'"
            v-model="model[column.prop]"
            :options="column.options"
            v-bind="itemAttrs(column)"
            :placeholder="column.placeholder ? column.placeholder : `请选择${column.label}`"
          />

          <el-date-picker
            v-if="column.itemType == 'datePicker'"
            v-model="model[column.prop]"
            v-bind="itemAttrs(column)"
            :placeholder="column.placeholder ? column.placeholder : `请选择${column.label}`"
          />

          <el-tree-select
            v-if="column.itemType == 'treeSelect'"
            v-model="model[column.prop]"
            :select-params="column.props && column.props.selectParams"
            :tree-params="column.props && column.props.treeParams"
            v-bind="itemAttrs(column)"
            :placeholder="column.placeholder ? column.placeholder : `请选择${column.label}`"
          />
          <slot
            v-if="column.itemType == 'slot'"
            v-bind="itemAttrs(column)"
            :name="column.prop"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { elFormAttrs, elFormItemAttrs, noneItemAttrs, defaultAttrs } from './config'

export default {
  name: 'CommonForm',
  components: {
    elTreeSelect: () => import('@/components/elTreeSelect/elTreeSelect')
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed: {
    _config() {
      return Object.assign(
        {
          labelPosition: 'top',
          size: 'medium'
        },
        this.config
      )
    },
    // el-table组件属性
    elFormAttrs() {
      const copy = {}
      for (const key in this._config) {
        if (elFormAttrs.includes(key)) {
          copy[key] = this._config[key]
        }
      }
      return copy
    }
  },
  mounted() {},
  methods: {
    elFormItemAttrs(column) {
      const copy = {}
      for (const key in column) {
        if (elFormItemAttrs.includes(key)) {
          copy[key] = column[key]
        }
      }
      return copy
    },
    itemAttrs(column) {
      const copy = { ...defaultAttrs[column.itemType] }
      for (const key in column) {
        if (!noneItemAttrs.includes(key)) {
          copy[key] = column[key]
        }
      }

      return copy
    },
    inputNumber(value, column) {
      this.model[column.prop] = value.replace(/[^\d]/g, '')
    },
    getRules(column) {
      if (column.required) {
        let rules = [
          {
            required: true,
            message: `请${column.itemType == 'input' ? '输入' : '选择'}${column.label}`,
            trigger: `${column.itemType == 'input' ? ['blur', 'input'] : 'change'}`
          },
          ...(column.rules ? column.rules : [])
        ]
        return rules
      } else {
        return column.rules
      }
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((pass, error) => {
          this.$emit('update:model', this.model)
          if (pass) {
            resolve(this.model)
            return
          } else {
            reject(error)
          }
        })
      })
    },
    clearValidate() {
      return this.$refs['form'].clearValidate(...arguments)
    },
    resetField() {
      return this.$refs['form'].resetField(...arguments)
    },
    validateField() {
      return this.$refs['form'].validateField(...arguments)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input,
.el-cascader {
  width: 100%;
}
/deep/ .el-select {
  width: 100%;
}
.el-form-item .el-input__inner {
  width: 100%;
}
/deep/ .el-form-item__content {
  min-height: 35px;
}
</style>
