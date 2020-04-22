<template>
  <div>
    <el-form :inline="true" :model="requireForm" class="demo-form-inline">
      <el-form-item v-for="item in requireOptions" :key="item.field" :label="item.label">
        <el-input
          v-if="item.type === 'input'"
          v-model="requireForm[item.field]"
          :type="item.config && item.config.type ? item.config.type : 'text'"
          :placeholder="item.config && item.config.placeholder"
        />
        <el-select
          v-if="item.type === 'select'"
          v-model="requireForm[item.field]"
          :placeholder="item.config && item.config.placeholder"
          :multiple="item.config && item.config.multiple"
        >
          <template v-if="item.config && item.config.group">
            <el-option-group v-for="group in item.options" :key="group.label" :label="group.label">
              <el-option v-for="it in group.options" :key="it.value" :label="it.label" :value="it.value" />
            </el-option-group>
          </template>
          <template v-else>
            <el-option v-for="it in item.options" :key="it.value" :label="it.label" :value="it.value" />
          </template>
        </el-select>
        <el-time-select v-if="item.type === 'timeSelect'" v-model="requireForm[item.field]" placeholder="选择时间" />
        <el-time-picker v-if="item.type === 'timePicker'" v-model="requireForm[item.field]" placeholder="选择时间" />
        <el-cascader v-if="item.type === 'cascader'" v-model="requireForm[item.field]" :options="item.options" />
        <el-date-picker
          v-if="item.type === 'dataPicker'"
          v-model="requireForm[item.field]"
          :type="item.config && item.config.type ? item.config.type : 'data'"
          placeholder="结束时间"
          value-format="yyyy-MM-dd"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="change"
        />
        <num-interval v-if="item.type === 'numInterval'" v-model="requireForm[item.field]" />
        <tree-select v-if="item.type === 'treeSelect'" v-model="requireForm[item.field]" :option="item.options" />
      </el-form-item>
      <el-form-item v-if="popoverOptions.length === 0">
        <el-button type="primary" size="small" @click="submitSearch">
          搜索
        </el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-popover placement="bottom" trigger="click" popper-class="popover-class">
          <div>
            <el-form :inline="true" :model="popoverForm" class="demo-form-inline">
              <el-form-item v-for="item in popoverOptions" :key="item.field" :label="item.label">
                <el-input
                  v-if="item.type === 'input'"
                  v-model="popoverForm[item.field]"
                  :type="item.config && item.config.type ? item.config.type : 'text'"
                  :placeholder="'请输入' + item.label"
                />
                <el-select
                  v-if="item.type === 'select'"
                  v-model="popoverForm[item.field]"
                  :placeholder="'请输入' + item.label"
                  :multiple="item.config && item.config.multiple"
                >
                  <template v-if="item.config && item.config.group">
                    <el-option-group v-for="group in item.options" :key="group.label" :label="group.label">
                      <el-option v-for="it in group.options" :key="it.value" :label="it.label" :value="it.value" />
                    </el-option-group>
                  </template>
                  <template v-else>
                    <el-option v-for="it in item.options" :key="it.value" :label="it.label" :value="it.value" />
                  </template>
                </el-select>
                <el-time-select
                  v-if="item.type === 'timeSelect'"
                  v-model="popoverForm[item.field]"
                  placeholder="选择时间"
                />
                <el-time-picker
                  v-if="item.type === 'timePicker'"
                  v-model="popoverForm[item.field]"
                  placeholder="选择时间"
                />
                <el-cascader
                  v-if="item.type === 'cascader'"
                  v-model="popoverForm[item.field]"
                  :options="item.options"
                />
                <el-date-picker
                  v-if="item.type === 'dataPicker'"
                  v-model="popoverForm[item.field]"
                  :type="item.config && item.config.type ? item.config.type : 'data'"
                  placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
                <num-interval v-if="item.type === 'numInterval'" v-model="popoverForm[item.field]" />
                <tree-select
                  v-if="item.type === 'treeSelect'"
                  v-model="popoverForm[item.field]"
                  :option="item.options"
                />
              </el-form-item>
            </el-form>
            <div class="popOver-footer">
              <el-button type="primary" size="small" @click="submitSearch">
                搜索
              </el-button>
              <el-button size="small" @click="initForm">
                重置
              </el-button>
            </div>
          </div>
          <el-button slot="reference" type="primary" size="small">
            筛选
          </el-button>
        </el-popover>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import NumInterval from '../numInterval/numInterval'
import TreeSelect from '../treeSelect/treeSelect'

export default {
  name: 'SearchPopOver',
  components: { NumInterval, TreeSelect },
  props: {
    // 筛选弹窗外部
    requireOptions: {
      type: Array,
      default: () => {
        return [
          // {
          //   // 搜索组件
          //   type: 'input',
          //   // 搜索字段
          //   field: 'input',
          //   // 组件label
          //   label: '输入框',
          //   // 若有下属选择数据, 由此传入
          //   options: {},
          //   // 组件属性，请自行添加，注意筛选内外部一起添加，必须设置默认值
          //   config: {}
          // }
        ]
      }
    },
    // 筛选内部
    popoverOptions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      requireForm: {},
      popoverForm: {}
    }
  },
  created() {
    this.initForm()
  },
  methods: {
    // 初始化绑定数据
    initForm() {
      this.requireOptions.forEach((item) => {
        if (item.field.indexOf(',') > -1) {
          if (item.type === 'cascader') {
            this.$set(this.requireForm, item.field, { min: '', max: '' })
          } else {
            this.$set(this.requireForm, item.field, [])
          }
        } else {
          this.$set(this.requireForm, item.field, '')
        }
      })
      this.popoverOptions.forEach((item) => {
        if (item.field.indexOf(',') > -1) {
          if (item.type === 'cascader') {
            this.$set(this.popoverForm, item.field, { min: '', max: '' })
          } else {
            this.$set(this.popoverForm, item.field, [])
          }
        } else {
          this.$set(this.popoverForm, item.field, '')
        }
      })
    },
    submitSearch() {
      let params = {}
      for (let key in this.requireForm) {
        if (key.indexOf(',') > -1 && Array.isArray(this.requireForm[key])) {
          let keyArr = key.split(',')
          keyArr.forEach((item, index) => {
            params[item] = this.requireForm[key][index]
          })
        } else if (
          key.indexOf(',') > -1 &&
          Object.prototype.toString.call(this.requireForm[key]) === '[object Object]'
        ) {
          params[key.split(',')[0]] = this.requireForm[key].min
          params[key.split(',')[1]] = this.requireForm[key].max
        } else {
          params[key] = this.requireForm[key]
        }
      }
      for (let key in this.popoverForm) {
        if (key.indexOf(',') > -1 && Array.isArray(this.popoverForm[key])) {
          let keyArr = key.split(',')
          keyArr.forEach((item, index) => {
            params[item] = this.popoverForm[key][index]
          })
        } else if (
          key.indexOf(',') > -1 &&
          Object.prototype.toString.call(this.popoverForm[key]) === '[object Object]'
        ) {
          params[key.split(',')[0]] = this.popoverForm[key].min
          params[key.split(',')[1]] = this.popoverForm[key].max
        } else {
          params[key] = this.popoverForm[key]
        }
      }
      this.$emit('submit', params)
    },
    change() {
      this.submitSearch()
    }
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 990px) {
  .popOver-footer {
    left: 20px !important;
    right: 26px;
  }
}
@media screen and (min-width: 991px) {
  .popover-class {
    left: 266px !important;
    right: 26px;
  }
}
</style>

<style lang="scss" scoped>
.popOver-footer {
  margin: 0 auto;
  text-align: right;
}
.el-form-item {
  margin-right: 30px;
}
</style>
