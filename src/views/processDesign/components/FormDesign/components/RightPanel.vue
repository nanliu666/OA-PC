<template>
  <div :class="['right-board', visible ? 'show' : '']">
    <el-scrollbar class="right-scrollbar">
      <!-- 组件属性 -->
      <div
        v-if="activeData.__config__.name !== undefined"
        class="title"
      >
        {{ activeData.__config__.name }}
      </div>
      <el-form
        v-show="currentTab === 'field'"
        ref="form"
        :model="activeData"
        class="right-inner"
        size="small"
        label-position="top"
        @validate="onValidate"
      >
        <el-form-item
          v-if="
            !(!isPC && activeData.__mobile__.noLabel) && activeData.__config__.label !== undefined
          "
          prop="__config__.label"
          :rules="getRules('__config__.label', '标题')"
          label="标题"
        >
          <el-input
            v-model="activeData.__config__.label"
            placeholder="请输入标题"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          v-if="!isPC && activeData.__mobile__.props.startLabel !== undefined"
          prop="__mobile__.props.startLabel"
          :rules="getRules('__mobile__.props.startLabel', '开始标题')"
          label="开始标题"
        >
          <el-input
            v-model="activeData.__mobile__.props.startLabel"
            placeholder="请输入"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          v-if="!isPC && activeData.__mobile__.props.endLabel !== undefined"
          prop="__mobile__.props.endLabel"
          :rules="getRules('__mobile__.props.endLabel', '结束标题')"
          label="结束标题"
        >
          <el-input
            v-model="activeData.__mobile__.props.endLabel"
            placeholder="请输入"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          v-if="!isPC && activeData.__mobile__.props.placeholder !== undefined"
          label="提示文字"
        >
          <el-input
            v-model="activeData.__mobile__.props.placeholder"
            placeholder="请输入提示文字"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          v-if="isPC && activeData.__pc__.props['start-placeholder'] !== undefined"
          label="开始提示文字"
        >
          <el-input
            v-model="activeData.__pc__.props['start-placeholder']"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          v-if="isPC && activeData.__pc__.props['end-placeholder']"
          label="结束提示文字"
        >
          <el-input
            v-model="activeData.__pc__.props['end-placeholder']"
            placeholder="请输入"
          />
        </el-form-item>

        <el-form-item
          v-if="activeData.placeholder !== undefined"
          label="提示文字"
        >
          <el-input
            v-model="activeData.placeholder"
            placeholder="请输入提示文字"
            maxlength="20"
          />
        </el-form-item>
        <el-form-item
          v-if="
            ['el-checkbox-group', 'el-radio-group', 'el-select'].indexOf(activeData.__pc__.tag) > -1
          "
          prop="__slot__.options"
          :rules="getOptionRules('__slot__.options', '选项')"
          label="选项"
        >
          <draggable
            :list="activeData.__slot__.options"
            :animation="340"
            group="selectItem"
            handle=".option-drag"
          >
            <div
              v-for="(item, index) in activeData.__slot__.options"
              :key="index"
              class="select-item"
            >
              <div class="select-line-icon option-drag">
                <i class="el-icon-s-operation" />
              </div>
              <el-input
                :value="item.label"
                placeholder="选项名"
                size="small"
                @input="setOptionValue(item, $event)"
              />
              <div
                class="close-btn select-line-icon"
                @click="() => removeOption(item, index)"
              >
                <i class="el-icon-circle-close" />
              </div>
            </div>
          </draggable>
          <div>
            <el-button
              style="padding-bottom: 0"
              type="text"
              @click="addSelectItem"
            >
              添加选项
            </el-button>
          </div>
        </el-form-item>
        <el-form-item
          v-if="['date', 'daterange'].includes(activeData.__config__.type)"
          label="日期类型"
        >
          <el-radio-group
            v-model="activeData.__pc__.props.format"
            @change="handleDateFormatChange"
          >
            <el-radio label="yyyy-MM-dd">
              年-月-日
            </el-radio>
            <el-radio label="yyyy-MM-dd HH:mm">
              年-月-日 时:分
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="activeData.__config__.actionText !== undefined"
          label="动作文字"
        >
          <el-input
            v-model="activeData.__config__.actionText"
            placeholder="请输入动作文字"
          />
        </el-form-item>
        <el-form-item label="其他">
          <el-checkbox
            v-if="activeData.__mobile__.props.autoCalc !== undefined"
            v-model="activeData.__mobile__.props.autoCalc"
          >
            自动计算时长
          </el-checkbox>
          <el-checkbox
            v-if="activeData.__config__.required !== undefined"
            v-model="activeData.__config__.required"
            :class="{
              'required-checked__condition': activeData.__config__.proCondition
            }"
            :disabled="usedAsCondition"
            @change="requireChange"
          >
            必填
          </el-checkbox>
          <div
            v-if="activeData.__config__.proCondition"
            class="condition"
          >
            &nbsp;(勾选后可作为
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                流程条件：在流程设计里用于区分流程走向。
              </div>
              <span class="condition-text">流程条件</span>
            </el-tooltip>
            )
          </div>
          <el-checkbox
            v-if="activeData.__config__.shouldPrint !== undefined"
            v-model="activeData.__config__.shouldPrint"
          >
            打印
          </el-checkbox>
        </el-form-item>
        <el-form-item
          v-if="isPC && activeData.__pc__.span !== undefined"
          label="字段占比"
        >
          <el-radio
            v-model="activeData.__pc__.span"
            :label="12"
          >
            50%
          </el-radio>
          <el-radio
            v-model="activeData.__pc__.span"
            :label="24"
          >
            100%
          </el-radio>
        </el-form-item>
        <el-form-item
          v-if="isPC && ['checkbox', 'radio'].includes(activeData.__config__.type)"
          label="选择模式"
        >
          <el-radio
            v-if="activeData.__config__.type == 'radio'"
            v-model="activeData.__pc__.tag"
            label="el-radio-group"
          >
            平铺模式
          </el-radio>
          <el-radio
            v-if="activeData.__config__.type == 'checkbox'"
            v-model="activeData.__pc__.tag"
            label="el-checkbox-group"
          >
            平铺模式
          </el-radio>
          <el-radio
            v-model="activeData.__pc__.tag"
            label="el-select"
          >
            下拉模式
          </el-radio>
        </el-form-item>
        <!-- <el-form-item
          v-if="activeData.__vModel__ !== undefined"
          label="默认值"
        >
          <el-input
            :value="setDefaultValue(activeData.__config__.defaultValue)"
            placeholder="请输入默认值"
            @input="onDefaultValueInput"
          />
        </el-form-item> -->
      </el-form>
    </el-scrollbar>
  </div>
</template>

<script>
/**
 * Copyright: Copyright (c) 2020
 * Author:JakHuang
 * Version 1.0
 * Title: form-generator/ElementUI表单设计及代码生成器
 * GitHub: https://github.com/JakHuang/form-generator
 */
import Draggable from 'vuedraggable'

import { isArray } from 'util'
import { isNumberStr, get } from '../utils/index'

export default {
  name: 'RightPanel',
  components: {
    Draggable
  },
  props: ['visible', 'activeData', 'activeId', 'isPC', 'usedAsCondition'],
  data() {
    return {
      currentTab: 'field',
      dialogVisible: false
    }
  },
  watch: {
    activeId() {
      setTimeout(() => {
        this.validate()
      })
    }
  },
  methods: {
    validate() {
      this.$refs.form && this.$refs.form.validate()
    },
    requireChange(required) {
      // 下拉 单选 计数 日期区间 时间区间 需要写进流程条件中
      if (!this.activeData.__config__.proCondition) return
      if (required) {
        this.$store.commit('addPCondition', this.activeData)
      } else {
        this.$store.commit('delPCondition', this.activeData.__config__.formId)
      }
    },
    handleDateFormatChange(format) {
      this.activeData.__pc__.props['value-format'] = format
      if (format === 'yyyy-MM-dd') {
        if (this.activeData.__config__.type === 'date') {
          this.activeData.__pc__.props.type = 'date'
        } else {
          this.activeData.__pc__.props.type = 'daterange'
        }
        this.activeData.__mobile__.props.pickerType = 'date'
      } else {
        if (this.activeData.__config__.type === 'date') {
          this.activeData.__pc__.props.type = 'datetime'
        } else {
          this.activeData.__pc__.props.type = 'datetimerange'
        }
        this.activeData.__mobile__.props.pickerType = 'datetime'
      }
    },
    getRules(path, label) {
      if (get(this.activeData, path) !== undefined) {
        return [
          {
            required: true,
            message: `请输入${label}`,
            trigger: 'blur'
          }
        ]
      } else {
        return []
      }
    },
    getOptionRules(path) {
      if (get(this.activeData, path) !== undefined) {
        return [
          {
            validator: (rule, value = [], callback) => {
              if (!value.length) {
                callback(new Error('请至少添加一个选项'))
              } else if (value.some((item) => item.label === '')) {
                callback(new Error('不能有空的选项'))
              } else if (new Set(value.map(JSON.stringify)).size < value.length) {
                callback(new Error('不能有相同的选项'))
              }
            },
            trigger: 'blur'
          }
        ]
      } else {
        return []
      }
    },
    onValidate(prop, valid, message) {
      this.$set(this.activeData.__config__, 'error', !valid)
      this.$set(this.activeData.__config__, 'errorMsg', message)
    },
    addSelectItem() {
      const options = this.activeData.__slot__.options
      options.push({
        label: '',
        value: ''
      })
    },
    setOptionValue(item, val) {
      item.label = val
      this.activeData.__slot__.options.forEach((option, index) => {
        if (!option.label) {
          option.value = ''
        } else {
          option.value = index
        }
      })
      this.$refs.form.validateField('__slot__.options')
    },
    removeOption(item, index) {
      this.activeData.__slot__.options.splice(index, 1)
      // 重新计算option.value属性
      this.setOptionValue({})
      // 删除的时候清空表单校验
      this.$refs.form.clearValidate()
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    remove(node, data) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map((val) => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(this.activeData.__config__, 'defaultValue', isNumberStr(str) ? +str : str)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.right-board {
  width: 350px;
  height: 100%;
  position: absolute;
  right: -350px;
  top: 0;
  padding-top: 3px;
  transition: right 500ms;
  background-color: #f8fafb;
  &.show {
    right: 0;
  }
  .title {
    padding: 22px 0 5px 24px;
    line-height: 25px;
    color: #202940;
    background-color: #fefefe;
  }
  .el-scrollbar {
    height: 100%;
  }
  .right-inner {
    padding: 18px 24px 0 24px;
  }
  /deep/.el-form-item__label {
    color: #718199;
    line-height: 20px;
    padding-bottom: 8px;
  }
  .el-radio__inner {
    width: 16px;
    height: 16px;
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    &::after {
      left: 5px;
    }
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.condition {
  display: inline;
  margin-right: 30px;
}
.condition-text {
  color: #409eff;
}
.required-checked__condition {
  margin-right: 0;
}
</style>
